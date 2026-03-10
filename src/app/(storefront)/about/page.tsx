export default function AboutPage() {
  return (
    <div className='max-w-4xl mx-auto p-12'>
      <h1 className='text-4xl font-extrabold text-slate-900 tracking-tight mb-8'>Hakkımızda</h1>
      
      <div className="prose prose-lg text-slate-600 space-y-6">
        <p className="lead text-xl text-slate-800 font-medium">
          Türkiye&apos;nin önde gelen B2B/B2C Gıda Pazar Yeri platformu olan OpenBazaar, global ihracatçılarla alıcıları dijitalde güvenle buluşturuyor.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Vizyonumuz</h2>
        <p>
          Türk gıda üreticilerini uluslararası tedarik zincirine entegre etmek ve global ticaretin dijital dönüşümüne öncülük etmektir. KOBİ&apos;lere global pazar kapılarını açarak güvenli, sürdürülebilir ve ölçeklenebilir bir ticaret ekosistemi yaratmayı hedefliyoruz.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Ne Yapıyoruz?</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Güvenli Ödeme Altyapısı:</strong> Stripe altyapısı ile global para transferlerini güvence altına alıyoruz.</li>
          <li><strong>Gelişmiş Lojistik Ağı:</strong> DHL, UPS gibi global partnerlerle B2B lojistik operasyonlarını kolaylaştırıyoruz.</li>
          <li><strong>Toptan Satış Seçenekleri:</strong> Palet veya konteyner bazında toptan fiyatlandırma avantajı sağlıyoruz.</li>
        </ul>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-12">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Shadow & Monkey Otonom Ekibi</h3>
          <p className="text-sm text-slate-500">
            Platformumuz "Shadow & Monkey" otonom geliştirme metodolojileri ile sürekli gelişmekte ve güncellenmektedir. Sektördeki yenilikleri anlık olarak ekosisteme dahil ediyoruz.
          </p>
        </div>
      </div>
    </div>
  );
}