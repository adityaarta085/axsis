import prisma from '../utils/prisma';
import { scrapeAndSaveAllPackages } from '../services/scrapingService';

async function main() {
  console.log('Starting Axis web scraping...');

  try {
    const count = await scrapeAndSaveAllPackages();
    console.log(`Scraped and saved ${count} packages from Axis.`);
  } catch (error) {
    console.error('Error during scraping or database update:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
