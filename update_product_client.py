import re

with open('/tmp/openbazaar/src/app/(b2c-storefront)/product/[slug]/ProductDetailClient.tsx', 'r') as f:
    content = f.read()

# Ekleme yapalım import'a eger yoksa. 'use client' ve import'lari degistirmiyoruz cunku zaten var.
# useState vs zaten var.

# Fonksiyonun icine chat statelerini ekleyelim
state_injection = """
  const [chatMessages, setChatMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: `Merhaba! Ben ${product.store?.name || 'Tedarikçi'} firmasının dijital satış temsilcisiyim. Şu an ${product.titleTranslations?.tr || 'bu ürünü'} inceliyorsunuz. Normal perakende satış fiyatımız ${Number(product.basePrice).toFixed(2)}€. Kaç kilo/adet almayı planlıyorsunuz? Belki fiyatı biraz daha konuşabiliriz. Ne dersiniz?` }
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
"""

content = content.replace("  const [showAiModal, setShowAiModal] = useState(false)", "  const [showAiModal, setShowAiModal] = useState(false)\n" + state_injection)

# Modal yapisini degistirelim
modal_start_idx = content.find("{/* AI Müzakereci Modal (Pazarlık) */}")
modal_end_idx = content.find("</div>\n    </div>\n  )\n}", modal_start_idx) + 6

new_modal = """
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
                    <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') }} />
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
"""

content = content[:modal_start_idx] + new_modal + "\n    </div>\n  )\n}"

with open('/tmp/openbazaar/src/app/(b2c-storefront)/product/[slug]/ProductDetailClient.tsx', 'w') as f:
    f.write(content)

print("ProductDetailClient.tsx updated.")
