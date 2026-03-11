'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Building, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SellerRegisterPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Lütfen hukuki yükümlülük sözleşmesini onaylayınız.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Satıcı başvurunuz başarıyla alındı! Belgeleriniz incelendikten sonra bilgilendirileceksiniz.");
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            OpenBazaar Satıcı Başvurusu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Kayıt olmak ve dünyaya açılmak için lütfen aşağıdaki bilgileri eksiksiz doldurun.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-600" /> Şirket Bilgileri
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Firma Adı</label>
                <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="Örn: Anadolu Gıda A.Ş." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vergi Numarası / TCKN</label>
                <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="10 Haneli VN / 11 Haneli TCKN" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" /> Yasal Belgeler
            </h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* KYC Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors cursor-pointer bg-gray-50">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">KYC Belgeleri</span>
                <span className="text-xs text-gray-500 mt-1">Kimlik Fotokopisi, İmza Sirküleri</span>
                <input required type="file" className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 w-full" />
              </div>

              {/* Tax Plate Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors cursor-pointer bg-gray-50">
                <FileText className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">Vergi Levhası</span>
                <span className="text-xs text-gray-500 mt-1">Güncel Yıla Ait Vergi Levhası (PDF/JPG)</span>
                <input required type="file" className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 w-full" />
              </div>
            </div>
          </div>

          {/* Liability Agreement */}
          <div className="border border-red-200 bg-red-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Gıda İhracatı Yükümlülük Sözleşmesi (Liability Agreement)
            </h3>
            <div className="text-sm text-red-900 space-y-3 bg-white p-4 rounded-lg border border-red-100 h-48 overflow-y-auto">
              <p className="font-semibold uppercase">1. Kapsam ve Geçerlilik</p>
              <p>Bu sözleşme, OpenBazaar platformu üzerinden yurt dışına gerçekleştirilecek olan tüm gıda, tarım ve hayvansal ürün satışlarında satıcının yasal sorumluluklarını beyan eder.</p>
              
              <p className="font-semibold uppercase mt-4">2. Gümrük Beyannameleri ve Evrak Sorumluluğu</p>
              <p>Gümrük çıkış ve varış işlemlerinde talep edilen menşei şahadetnameleri, fito-saniter sertifikalar, sağlık sertifikaları ve gümrük beyannamelerindeki eksik, hatalı veya yanıltıcı bilgilerden doğacak tüm gümrük cezaları, el koyma işlemleri ve imha bedelleri <strong>tamamen SATICIYA aittir.</strong></p>
              
              <p className="font-semibold uppercase mt-4">3. Alerjen Uyarıları ve Sağlık Riskleri (Zehirlenme Riski)</p>
              <p>Ürün ambalajlarında uluslararası ve hedef ülke standartlarına uygun alerjen uyarılarının (fındık, fıstık, gluten, laktoz vb.) bulunmamasından kaynaklı tüketici zehirlenmeleri, alerjik reaksiyonlar ve can kayıpları durumlarında doğacak her türlü hukuki, cezai ve ağır tazminat yükümlülükleri <strong>bütünüyle ve şartsız olarak SATICIYA aittir.</strong></p>

              <p className="font-semibold uppercase mt-4">4. Ürün Güvenliği ve Soğuk Zincir</p>
              <p>Bozuk, son kullanma tarihi geçmiş, standart dışı ürün gönderimi yapılması veya ürünün gerektirdiği saklama/taşıma koşullarına (soğuk zincir) satıcı tarafından veya satıcının belirlediği lojistik süreçte uyulmaması (soğuk zincirin kırılması) sebebiyle oluşacak halk sağlığı tehditleri, ürün iadeleri ve tazminatlar <strong>SATICI sorumluluğundadır.</strong></p>

              <p className="font-semibold uppercase mt-4">5. Kabul ve Taahhüt</p>
              <p>Satıcı, yukarıda belirtilen tüm maddeleri eksiksiz okuduğunu, anladığını, ihracat kurallarına uyacağını ve aksi durumlarda doğacak tüm mali ve yasal sorumluluğun bizzat kendi kurumuna ait olduğunu kabul, beyan ve taahhüt eder.</p>
            </div>

            <div className="flex items-start mt-4 bg-white p-4 rounded-lg border border-red-200">
              <div className="flex items-center h-5">
                <input
                  id="liability-agreement"
                  name="liability-agreement"
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="focus:ring-red-500 h-5 w-5 text-red-600 border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="liability-agreement" className="font-bold text-red-800 cursor-pointer select-none">
                  Hukuki Yükümlülük Sözleşmesini Okudum, Anladım ve Kabul Ediyorum
                </label>
                <p className="text-red-600 text-xs mt-1">Bu alanı işaretlemek yasal olarak bağlayıcıdır.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  İşleniyor...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Başvuruyu Tamamla
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
