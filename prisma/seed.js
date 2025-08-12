/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const brandData = [
    { name: 'Apple' },
    { name: 'Samsung' },
    { name: 'Sony' },
    { name: 'HP' },
    { name: 'Anker' },
  ];

  const categoryData = [
    { name: 'Phones', slug: 'phones' },
    { name: 'Laptops', slug: 'laptops' },
    { name: 'Wearables', slug: 'wearables' },
    { name: 'Audio', slug: 'audio' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  const [apple, samsung, sony, hp, anker] = await Promise.all(
    brandData.map((b) => prisma.brand.upsert({ where: { name: b.name }, update: {}, create: b }))
  );

  const [phones, laptops, wearables, audio, accessories] = await Promise.all(
    categoryData.map((c) => prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c }))
  );

  const products = [
    { name: 'iPhone 16', description: 'Flagship iPhone with AI features', price: 99999.99, imageUrl: '/images/phone.jpg', brandId: apple.id, categoryId: phones.id },
    { name: 'HP Spectre x360', description: 'Convertible ultrabook', price: 62000.0, imageUrl: '/images/laptop.jpg', brandId: hp.id, categoryId: laptops.id },
    { name: 'Sony WH-1000XM6', description: 'Top-tier ANC headphones', price: 14500.0, imageUrl: '/images/headphone.jpg', brandId: sony.id, categoryId: audio.id },
    { name: 'Apple Watch Ultra', description: 'Rugged smartwatch', price: 1999.99, imageUrl: '/images/smartwatch.jpg', brandId: apple.id, categoryId: wearables.id },
    { name: 'Anker PowerCore 10000', description: 'Compact fast power bank', price: 3200.0, imageUrl: '/images/powerbank.jpg', brandId: anker.id, categoryId: accessories.id },
    { name: '10" LED Ring Light', description: 'Content creator essential', price: 2200.0, imageUrl: '/images/ringlight.png', brandId: samsung.id, categoryId: accessories.id },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: { ...p, price: new prisma.Prisma.Decimal(p.price) },
    });
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


