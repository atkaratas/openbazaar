'use client'

import { useState } from 'react'
import { Shield, Truck, PackageCheck, Bot, X, Send } from 'lucide-react'
import { useCart } from '@/store/useCart'

export default function ProductDetailClient({ product }: { product: any }) {
  const [qty, setQty] = useState(1)
  const [showAiModal, setShowAiModal] = useState(false)

  const [chatMessages, setChatMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: `Merhaba! Ben ${product.store?.name || 'Tedarikçi'} firmasının dijital satış temsilcisiyim. Şu an ${product.titleTranslations?.tr || 'bu ürünü'} inceliyorsunuz. Normal perakende satış fiyatımız ${Number(product.price).toFixed(2)}€. Kaç kilo/adet almayı planlıyorsunuz? Belki fiyatı biraz daha konuşabiliriz. Ne dersiniz?` }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [dealCode, setDealCode] = useState<string|null>(null)

  const handleSendMessage = () => {
    if(!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      // Basit bir if/else tabanli simulasyon: eger musteri bir miktar veya fiyat teklif ederse anlasalim
      setChatMessages(prev => [
        ...prev, 
        { role: 'ai', text: `Harika bir teklif! Satış müdürüyle anlık teyitleştim, bu miktar için fiyatı sizin için özel olarak revize edebiliriz. Anlaştık! Kasanızda kullanmanız için size özel indirim kodu oluşturdum: **AI-DEAL-30**. Bu kodu sepette kullandığınızda faturanıza anında %30 indirim yansıyacaktır.` }
      ]);
      setDealCode('AI-DEAL-30');
    }, 1500);
  }

  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.titleTranslations,
      price: Number(product.price),
      currency: product.baseCurrency,
      quantity: qty,
      image: (product.images && product.images.length > 0) ? product.images[0] : '/placeholder-food.jpg',
      storeId: product.storeId,
      storeName: product.store?.name || 'Tedarikçi',
      isColdChain: product.isColdChain || false
    })
    alert('✅ Sepete eklendi!')
  }

  const isB2bEligible = product.moq && product.moq > 1
  const b2bDiscount = 0.25 
  const b2bPrice = Number(product.price) * (1 - b2bDiscount)
  const totalPrice = (Number(product.price) * qty).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-2xl bg-white border border-gray-100 overflow-hidden relative shadow-sm">
            {product.isColdChain && (
              <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                ❄️ Soğuk Zincir
              </span>
            )}
            <img 
              src={(product.images && product.images.length > 0) ? product.images[0] : '/placeholder-food.jpg'}
              alt={product.titleTranslations?.tr || 'Ürün'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              {product.titleTranslations?.tr}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Satıcı: <span className="font-bold text-emerald-700">{product.store?.name || 'OpenBazaar Tedarikçisi'}</span>
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 space-y-4 shadow-sm">
            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">B2C (Perakende)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">€ {Number(product.price).toFixed(2)}</span>
                  <span className="text-slate-500 font-medium">/ Adet</span>
                </div>
              </div>
            </div>

            {isB2bEligible && (
              <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl border border-purple-200 relative overflow-hidden group">
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-purple-100 transform skew-x-12 translate-x-10 group-hover:translate-x-0 transition-transform"></div>
                <div className="relative z-10">
                  <p className="text-sm font-bold text-purple-900 mb-1 flex items-center gap-1">
                    <PackageCheck size={16} /> B2B (Toptan - Min {product.moq} Adet)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-purple-700 line-through opacity-70">€ {Number(product.price).toFixed(2)}</span>
                    <span className="text-2xl font-black text-purple-700">€ ??.??</span>
                    <span className="text-purple-600 font-medium">/ Adet</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAiModal(true)}
                  className="relative z-10 bg-purple-600 hover:bg-purple-700 text-white font-black py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2 animate-pulse"
                >
                  <Bot size={20} /> AI ile Pazarlık Yap
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-end">
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-bold text-gray-700 mb-2">Adet Seçiniz</label>
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-white h-14 w-full sm:w-40">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-xl font-bold text-slate-600 hover:bg-slate-50 w-12 h-full flex items-center justify-center transition-colors"
                >-</button>
                <div className="flex-1 text-center font-black text-xl text-slate-900">{qty}</div>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-xl font-bold text-slate-600 hover:bg-slate-50 w-12 h-full flex items-center justify-center transition-colors"
                >+</button>
              </div>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-end">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Toplam Tutar</span>
              <span className="text-3xl font-black text-emerald-600 mb-2">€ {totalPrice}</span>
              
              <button 
                onClick={handleAddToCart}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-lg h-14 rounded-xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>🛒</span> Sepete Ekle
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Stok: <span className="font-bold text-gray-700">{Math.floor(Math.random() * 5000) + 100} Adet</span> mevcut
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-3">
              <Shield className="text-emerald-500 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">OpenBazaar Garantisi</h4>
                <p className="text-xs text-gray-500 mt-1">Ürün teslim edilene kadar paranız havuzda güvende kalır.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="text-blue-500 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Gümrük Dahil (DDP)</h4>
                <p className="text-xs text-gray-500 mt-1">Avrupa kapı teslim fiyatıdır. Sürpriz vergi çıkmaz.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      
      {/* AI Müzakereci Modal (Pazarlık) */}
      {showAiModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-purple-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <Bot size={28} className="text-purple-200" />
                </div>
                <div>
                  <h2 className="text-xl font-black">{product.store?.name} - Otonom Satış Temsilcisi</h2>
                  <p className="text-sm text-purple-200 font-medium">Yapay zeka ile canlı pazarlık yapın. 1000€ üzeri alımlarda %30'a varan gizli iskontolar var.</p>
                </div>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`rounded-2xl p-4 max-w-[80%] shadow-sm ${msg.role === 'ai' ? 'bg-white border border-purple-100 rounded-tl-sm text-slate-700' : 'bg-emerald-600 text-white rounded-tr-sm'}`}>
                    <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    <span className={`text-[10px] mt-2 block font-bold ${msg.role === 'ai' ? 'text-slate-400' : 'text-emerald-200 text-right'}`}>
                      {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')} - {msg.role === 'ai' ? 'Otonom AI Agent' : 'Siz'}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-purple-100 rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Örn: 100 KG almak istiyorum, fiyatınız nedir?" 
                disabled={dealCode !== null}
                className="flex-1 bg-slate-100 border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none text-slate-700 placeholder-slate-400 disabled:opacity-50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={dealCode !== null}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 text-white p-4 rounded-xl shadow-md transition-colors flex items-center justify-center">
                <Send size={20} />
              </button>
            </div>
            
            {dealCode && (
              <div className="bg-emerald-50 border-t border-emerald-100 p-4 text-center">
                <p className="text-sm font-bold text-emerald-800 mb-2">Pazarlık başarıyla tamamlandı!</p>
                <div className="flex gap-2 justify-center">
                  <div className="bg-white border-2 border-dashed border-emerald-400 text-emerald-700 font-black px-4 py-2 rounded-lg">
                    {dealCode}
                  </div>
                  <button onClick={() => { handleAddToCart(); window.location.href='/checkout'; }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors">
                    Hemen Sepete Ekle ve Koda Git
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}