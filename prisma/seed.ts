// prisma/seed.ts
// prisma/seed.ts
import { PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Define the list of tags you want to seed
  const tagNames = ['gaming', 'monitor', '4K', 'electronics', 'keyboard', 'mechanical'];

  // Create tags that do not exist yet
  for (const tagName of tagNames) {
    // Check if the tag exists by its unique name


    // If the tag does not exist, create it
    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: tagName },
      });
    }
  }
  // Define default descriptions for different types of products
  const defaultDescriptions = {
    monitor: "A high-quality gaming monitor with 4K resolution.",
    keyboard: "Ergonomic mechanical keyboard with customizable backlit keys.",
    // ... more default descriptions
  };

  // Define some dummy products with their corresponding tags and default description
  const dummyProducts = [
    { title: "Gaming Monitor", tags: ['gaming', 'monitor', '4K', 'electronics'], type: 'monitor' },
    { title: "Mechanical Keyboard", tags: ['keyboard', 'mechanical', 'gaming'], type: 'keyboard' },
    // ... more dummy products
  ];

  // Create QRCode records with tags and default descriptions
  for (const product of dummyProducts) {
    await prisma.qRCode.create({
      data: {
        title: product.title,
        shop: "Oxavion's Emporium",
        productId: "prod_" + Math.random().toString(36).substr(2, 9),
        productHandle: product.title.toLowerCase().replace(/\s+/g, '_'),
        productVariantId: "variant_" + Math.random().toString(36).substr(2, 9),
        destination: "oxavions-emporium.myshopify.com" + product.title.toLowerCase().replace(/\s+/g, '-'),
        description: defaultDescriptions[product.type],
        // If you're using the serialization approach for tags:
        tags: JSON.stringify(product.tags),
        // If you're using the relational approach, you'd set up connections to existing Tag records instead
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
