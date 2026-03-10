'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // XSS Koruması: Girdileri frontend tarafında temizleme örneği
  const sanitizeInput = (input: string) => {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // XSS Temizliği (Validasyon/Sanitizasyon)
    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanMessage = sanitizeInput(formData.message);

    console.log("Gönderilen Güvenli Veri:", { name: cleanName, email: cleanEmail, message: cleanMessage });
    alert("Mesajınız güvenli bir şekilde gönderildi.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='max-w-3xl mx-auto p-12'>
      <h1 className='text-3xl font-bold mb-6'>İletişim</h1>
      <p className='mb-8 text-slate-500'>Soru, görüş veya B2B toptan satış talepleriniz için bize ulaşın.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad (XSS Korumalı)</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Adınız"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">E-posta</label>
          <input 
            type="email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="ornek@sirket.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Mesajınız (XSS Korumalı)</label>
          <textarea 
            required 
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Mesajınızı buraya yazın..."
          />
          {/* XSS Notu: Kullanıcıdan alınan bu veri backend'de de validator kütüphanesi ile sanitize edilmelidir. */}
        </div>

        <button 
          type="submit" 
          className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition shadow-md"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}