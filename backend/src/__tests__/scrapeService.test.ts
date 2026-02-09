import { EventEmitter } from 'events';
import https from 'https';
import { AppError } from '../middlewares/errorHandler';
import { scrapeAxisPage } from '../services/scrapeService';

describe('scrapeAxisPage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should scrape and normalize title, headings, and links', async () => {
    const html = `
      <html>
        <head>
          <title>AXIS &amp; Promo</title>
          <meta name="description" content="Internet hemat &amp; cepat" />
        </head>
        <body>
          <h1>Paket &amp; Murah</h1>
          <h2>Kuota Besar</h2>
          <a href="/paket">Lihat Paket</a>
        </body>
      </html>
    `;

    jest.spyOn(https, 'get').mockImplementation(((_url: string, _options: unknown, callback: any) => {
      const response = new EventEmitter() as any;
      response.statusCode = 200;
      response.headers = {};
      response.setEncoding = jest.fn();
      response.resume = jest.fn();

      callback(response);
      process.nextTick(() => {
        response.emit('data', html);
        response.emit('end');
      });

      return {
        on: jest.fn(),
        setTimeout: jest.fn(),
        destroy: jest.fn(),
      } as any;
    }) as any);

    const result = await scrapeAxisPage('https://www.axis.co.id/');

    expect(result.title).toBe('AXIS & Promo');
    expect(result.description).toBe('Internet hemat & cepat');
    expect(result.headings).toContain('Paket & Murah');
    expect(result.links[0]).toEqual({
      text: 'Lihat Paket',
      href: 'https://www.axis.co.id/paket',
    });
  });

  it('should reject non-axis domain', async () => {
    await expect(scrapeAxisPage('https://example.com')).rejects.toBeInstanceOf(AppError);
  });
});
