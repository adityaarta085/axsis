import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from '../utils/prisma';

export interface AxisPackage {
  name: string;
  quota: string;
  duration: string;
  price: number;
  details: string;
  category: string;
  slug: string;
}

const AXIS_URLS = {
  bronet: 'https://www.axis.co.id/produk/paket-internet/paket-bronet',
  warnet: 'https://www.axis.co.id/produk/paket-internet/paket-warnet',
  tengGo: 'https://www.axis.co.id/produk/paket-internet/paket-teng-go',
  lifestyle: 'https://www.axis.co.id/produk/paket-internet/paket-lifestyle',
  owsem: 'https://www.axis.co.id/produk/paket-internet/owsem-stream',
  boostr: 'https://www.axis.co.id/produk/paket-internet/paket-boostr',
};

export const scrapeAxisCategory = async (category: keyof typeof AXIS_URLS): Promise<AxisPackage[]> => {
  const url = AXIS_URLS[category];
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const packages: AxisPackage[] = [];

  $('div').each((i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (text.includes('Rp') && (text.includes('Masa Aktif') || text.includes('jam')) && !text.includes('PILIHAN PAKET')) {
      const hasMatchingChild = $el.find('div').toArray().some(child => {
          const childText = $(child).text().trim();
          return childText.includes('Rp') && (childText.includes('Masa Aktif') || childText.includes('jam')) && childText.length < text.length - 10;
      });

      if (!hasMatchingChild && text.length < 300) {
        try {
          let cleanText = text.replace(/\s+/g, ' ');

          const priceMatch = cleanText.match(/Rp([0-9.]+)/);
          const price = priceMatch ? parseInt(priceMatch[1].replace(/\./g, '')) : 0;

          const durationMatch = cleanText.match(/(Masa Aktif [0-9]+ (hari|jam|bulan))/i) || cleanText.match(/(Masa Aktif [^Rp]+)/i);
          const duration = durationMatch ? durationMatch[1].trim() : '';

          const quotaMatch = cleanText.match(/([0-9]+(GB|MB))/i) || cleanText.match(/([0-9]+JAM)/i) || cleanText.match(/(Unlimited)/i);
          const quota = quotaMatch ? quotaMatch[1].toUpperCase() : 'Unknown';

          let name = '';
          if (quotaMatch && durationMatch) {
             const quotaIdx = cleanText.indexOf(quotaMatch[0]);
             const durationIdx = cleanText.indexOf(durationMatch[0]);
             if (durationIdx > quotaIdx + quotaMatch[0].length) {
                name = cleanText.substring(quotaIdx + quotaMatch[0].length, durationIdx).trim();
             } else if (quotaIdx > 0) {
                name = cleanText.substring(0, quotaIdx).trim();
             }
          }

          if (!name) {
              const end = cleanText.indexOf(duration);
              if (end > 0) {
                  name = cleanText.substring(0, end).replace(quota, '').trim();
              }
          }

          if (!name || name.length < 2) name = category.toUpperCase();
          name = name.replace(/BELI$/i, '').trim();

          const details = cleanText.replace(quota, '').replace(name, '').replace(duration, '').replace(/Rp[0-9.]+/g, '').replace(/BELI/g, '').trim();

          const slug = `${category}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${quota.toLowerCase()}-${duration.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.replace(/-+/g, '-');

          if (price > 0 && !packages.find(p => p.slug === slug)) {
            packages.push({ name, quota, duration, price, details, category, slug });
          }
        } catch (e) { }
      }
    }
  });

  return packages;
};

export const scrapeAndSaveAllPackages = async (): Promise<number> => {
  let count = 0;
  for (const category of Object.keys(AXIS_URLS) as (keyof typeof AXIS_URLS)[]) {
    try {
      const categoryPackages = await scrapeAxisCategory(category);
      for (const pkg of categoryPackages) {
        await prisma.package.upsert({
          where: { slug: pkg.slug },
          update: {
            name: pkg.name,
            price: pkg.price,
            quota: pkg.quota,
            description: pkg.duration,
            category: pkg.category,
            tag: pkg.details.includes('Lokal') ? 'Lokal' : null,
          },
          create: {
            slug: pkg.slug,
            name: pkg.name,
            price: pkg.price,
            quota: pkg.quota,
            description: pkg.duration,
            category: pkg.category,
            tag: pkg.details.includes('Lokal') ? 'Lokal' : null,
            speed_mbps: 20,
            features: [pkg.details, pkg.duration].filter(Boolean),
          },
        });
        count++;
      }
    } catch (e) {
      console.error(`Failed to scrape/save category ${category}`, e);
    }
  }
  return count;
};
