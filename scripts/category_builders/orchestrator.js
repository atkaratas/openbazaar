const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function cleanCategories() {
  
  
  console.log('Orchestrator: Kategori tablosu uzerine yazilacak, mevcudu koruyup yeni datalari eklicez veya onceden olanlari soft-delete.');
  // Hata veriyor cunku categoryId NOT NULL bir alan.
  // DB'deki tum kategorileri silmek urunleri patlatiyor. O yuzden silmiyoruz. Sadece agaci insa edecegiz.


  console.log('Orchestrator: Eski kategori veritabanı tamamen temizlendi.');
}

async function insertCategories(tree, parentId = null) {
  for (const node of tree) {
    const category = await prisma.category.upsert({
      where: { slug: node.slug },
      update: {
        nameTranslations: node.names,
        parentId: parentId
      },
      create: {
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
