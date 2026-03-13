const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function cleanCategories() {
  console.log('Orchestrator: Bütün eski kategori ağacı çöpe atılıyor (Cascade delete)...');
  // First disconnect products from categories to avoid foreign key constraints failing
  await prisma.product.updateMany({ data: { categoryId: null } });
  await prisma.category.deleteMany({});
  console.log('Orchestrator: Eski kategori veritabanı tamamen temizlendi.');
}

async function insertCategories(tree, parentId = null) {
  for (const node of tree) {
    const category = await prisma.category.create({
      data: {
        slug: node.slug,
        nameTranslations: node.names,
        parentId: parentId
      }
    });
    if (node.children && node.children.length > 0) {
      await insertCategories(node.children, category.id);
    }
  }
}

async function main() {
  await cleanCategories();
  
  // Tüm alt ajanların JSON çıktılarını toplayacağız (simülasyon)
  const agentFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.json'));
  let masterTree = [];
  
  for (const file of agentFiles) {
    const data = JSON.parse(fs.readFileSync(`${__dirname}/${file}`, 'utf-8'));
    masterTree.push(data);
  }
  
  console.log(`Orchestrator: ${agentFiles.length} Ana Dal (Branch) işleniyor...`);
  await insertCategories(masterTree);
  console.log('Orchestrator: Yeni ve derin Kategori Ağacı başarıyla inşa edildi!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
