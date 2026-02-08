import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.package.deleteMany();
  await prisma.coverage.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.otpRequest.deleteMany();

  const packages = [
    {
      slug: 'axis-super-30',
      name: 'Axis Super 30',
      price: 49000,
      speed_mbps: 30,
      quota: 'Unlimited (FUP 50GB)',
      category: 'super',
      tag: 'Hemat',
      description: 'Paket internet hemat untuk kebutuhan harian.',
      features: ['Speed up to 30Mbps', 'Free Installation'],
    },
    {
      slug: 'axis-super-50',
      name: 'Axis Super 50',
      price: 89000,
      speed_mbps: 50,
      quota: 'Unlimited (FUP 100GB)',
      category: 'super',
      tag: 'Populer',
      description: 'Streaming lancar tanpa gangguan.',
      features: ['Speed up to 50Mbps', 'Free Installation'],
    },
    {
      slug: 'axis-home-100',
      name: 'Axis Home 100',
      price: 149000,
      speed_mbps: 100,
      quota: 'Unlimited',
      category: 'home',
      tag: 'Terlaris',
      description: 'Pilihan terbaik untuk keluarga Anda.',
      features: ['Speed up to 100Mbps', 'Free WiFi Router'],
    },
    {
      slug: 'axis-home-200',
      name: 'Axis Home 200',
      price: 249000,
      speed_mbps: 200,
      quota: 'Unlimited',
      category: 'home',
      tag: 'Gaming',
      description: 'Koneksi super cepat untuk gaming dan WFH.',
      features: ['Speed up to 200Mbps', 'Free Router & Extender'],
    },
    {
      slug: 'axis-unlimited-pro',
      name: 'Axis Unlimited Pro',
      price: 349000,
      speed_mbps: 300,
      quota: 'Truly Unlimited',
      category: 'unlimited',
      tag: 'Premium',
      description: 'Tanpa batas, tanpa kompromi.',
      features: ['Speed up to 300Mbps', 'VIP Support 24/7'],
    },
    {
      slug: 'axis-lite-10',
      name: 'Axis Lite 10',
      price: 29000,
      speed_mbps: 10,
      quota: '30GB',
      category: 'super',
      tag: 'Pelajar',
      description: 'Paket paling terjangkau.',
      features: ['Speed up to 10Mbps'],
    },
  ];

  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }

  const coverages = [
    { postcode: '12345', city: 'Jakarta Selatan', supported: true, expected_speed_mbps: 100 },
    { postcode: '11111', city: 'Jakarta Barat', supported: true, expected_speed_mbps: 50 },
    { postcode: '60111', city: 'Surabaya', supported: true, expected_speed_mbps: 100 },
    { postcode: '40111', city: 'Bandung', supported: true, expected_speed_mbps: 30 },
  ];

  for (const cov of coverages) {
    await prisma.coverage.create({ data: cov });
  }

  const faqs = [
    { category: 'Umum', question: 'Bagaimana cara mendaftar?', answer: 'Daftar langsung melalui website atau hubungi CS kami.' },
    { category: 'Teknis', question: 'Berapa lama instalasi?', answer: 'Instalasi biasanya dilakukan dalam 1-3 hari kerja.' },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }

  await prisma.blogPost.create({
    data: {
      slug: 'internet-cepat',
      title: 'Tips Internet Cepat',
      content: 'Gunakan koneksi fiber optic dari Axis...',
      author: 'Admin',
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
