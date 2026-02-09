import https from 'https';
import { AppError } from '../middlewares/errorHandler';

const DEFAULT_SCRAPE_URL = 'https://www.axis.co.id/';
const AXIS_HOST = 'axis.co.id';

const decodeHtmlEntities = (input: string) => input
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ')
  .trim();

const stripTags = (input: string) => decodeHtmlEntities(input.replace(/<[^>]*>/g, ' ').trim());

const getAbsoluteUrl = (href: string, baseUrl: string) => {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
};

const ensureAllowedAxisDomain = (url: string) => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new AppError('URL tidak valid', 400);
  }

  if (parsed.protocol !== 'https:') {
    throw new AppError('Hanya URL HTTPS yang diizinkan', 400);
  }

  const isAxisDomain = parsed.hostname === AXIS_HOST || parsed.hostname.endsWith(`.${AXIS_HOST}`);
  if (!isAxisDomain) {
    throw new AppError('Hanya domain axis.co.id yang diizinkan untuk scraping', 400);
  }

  return parsed.toString();
};

const fetchHtml = (url: string): Promise<string> => new Promise((resolve, reject) => {
  const request = https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AxisScraper/1.0)',
      Accept: 'text/html,application/xhtml+xml',
    },
  }, (response) => {
    const statusCode = response.statusCode || 0;

    if (statusCode >= 300 && statusCode < 400 && response.headers.location) {
      response.resume();
      const redirectedUrl = getAbsoluteUrl(response.headers.location, url);
      if (!redirectedUrl) {
        reject(new AppError('URL redirect tidak valid', 502));
        return;
      }

      fetchHtml(redirectedUrl).then(resolve).catch(reject);
      return;
    }

    if (statusCode < 200 || statusCode >= 300) {
      response.resume();
      reject(new AppError(`Gagal mengambil data realtime dari ${url} (HTTP ${statusCode})`, 502));
      return;
    }

    let raw = '';
    response.setEncoding('utf8');
    response.on('data', (chunk) => { raw += chunk; });
    response.on('end', () => resolve(raw));
  });

  request.on('error', () => {
    reject(new AppError(`Tidak dapat terhubung ke ${url}`, 502));
  });

  request.setTimeout(15000, () => {
    request.destroy();
    reject(new AppError('Permintaan scraping timeout', 504));
  });
});

export const scrapeAxisPage = async (targetUrl?: string) => {
  const url = ensureAllowedAxisDomain(targetUrl || DEFAULT_SCRAPE_URL);
  const html = await fetchHtml(url);

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i);

  const headingMatches = Array.from(html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi))
    .map((match) => stripTags(match[1]))
    .filter(Boolean)
    .slice(0, 12);

  const linkMatches = Array.from(html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi))
    .map((match) => {
      const absoluteUrl = getAbsoluteUrl(match[1], url);
      if (!absoluteUrl) return null;

      return {
        text: stripTags(match[2]),
        href: absoluteUrl,
      };
    })
    .filter((item): item is { text: string; href: string } => Boolean(item && item.text && item.href))
    .slice(0, 20);

  return {
    source: url,
    fetchedAt: new Date().toISOString(),
    title: titleMatch ? decodeHtmlEntities(titleMatch[1]) : null,
    description: descriptionMatch ? decodeHtmlEntities(descriptionMatch[1]) : null,
    headings: headingMatches,
    links: linkMatches,
  };
};
