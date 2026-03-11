'use client';

import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  RefreshCw, 
  Globe, 
  Save, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function ApiSettingsPage() {
  const [apiKey, setApiKey] = useState('OB_LIVE_sk_948a2f7c1b8e4d3a9f0c2d1b8e4d3a9f');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhooks, setWebhooks] = useState([
    { id: 1, url: 'https://api.saticifirmam.com/openbazaar/webhook', active: true }
  ]);
  const [copied, setCopied] = useState(false);

  const logs = [
    { id: 101, method: 'POST', endpoint: '/api/v1/orders/webhook', status: 200, time: '2 dakika önce' },
    { id: 102, method: 'GET', endpoint: '/api/v1/products', status: 200, time: '15 dakika önce' },
    { id: 103, method: 'POST', endpoint: '/api/v1/products/sync', status: 401, time: '1 saat önce' },
    { id: 104, method: 'GET', endpoint: '/api/v1/orders', status: 200, time: '3 saat önce' },
    { id: 105, method: 'POST', endpoint: '/api/v1/orders/webhook', status: 500, time: '5 saat önce' },
  ];

  const generateNewKey = () => {
    const randomString = Array.from(Array(32), () => Math.floor(Math.random() * 36).toString(36)).join('');
    setApiKey(`OB_LIVE_sk_${randomString}`);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl) return;
    const newWebhook = { id: Date.now(), url: webhookUrl, active: true };
    setWebhooks([...webhooks, newWebhook]);
    setWebhookUrl('');
  };

  const removeWebhook = (id: number) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">API &amp; Entegrasyon</h1>
        <p className="text-slate-500 mt-2">
          Kendi sistemlerinizi OpenBazaar'a bağlayın, ürün ve siparişlerinizi otomatik yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Keys & Webhooks */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* API Key Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Key size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">API Kimlik Bilgileri</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 flex gap-3 text-sm">
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <p>
                  Secret Key tüm hesap yetkilerine sahiptir. Bu anahtarı asla açık kaynak kodlu projelerde veya istemci tarafında paylaşmayın.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Secret Key</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={apiKey}
                      className="w-full font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Kopyala"
                    >
                      {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                  </div>
                  <button
                    onClick={generateNewKey}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <RefreshCw size={16} /> Yenile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Webhooks Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Globe size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Webhook URL'leri</h2>
                <p className="text-sm text-slate-500">Sipariş düştüğünde sistemlerinize bildirim gönderin.</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <form onSubmit={addWebhook} className="flex gap-3">
                <input
                  type="url"
                  required
                  placeholder="https://api.siteniz.com/webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <Save size={16} /> Kaydet
                </button>
              </form>

              {webhooks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700">Kayıtlı Uç Noktalar</h3>
                  <ul className="space-y-2">
                    {webhooks.map((hook) => (
                      <li key={hook.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                          <span className="font-mono text-sm text-slate-600 truncate">{hook.url}</span>
                        </div>
                        <button
                          onClick={() => removeWebhook(hook.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors shrink-0"
                          title="Sil"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column - Logs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Activity size={20} />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Son İstekler</h2>
              </div>
            </div>
            
            <div className="p-0">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                  <tr>
                    <th className="px-6 py-3">Durum</th>
                    <th className="px-6 py-3">İstek</th>
                    <th className="px-6 py-3 text-right">Zaman</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        {log.status === 200 ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                            <CheckCircle2 size={14} />
                            <span>{log.status}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-600 font-medium">
                            <XCircle size={14} />
                            <span>{log.status}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            log.method === 'GET' ? 'bg-blue-100 text-blue-700' : 
                            log.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : 
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {log.method}
                          </span>
                          <span className="font-mono text-slate-600 truncate max-w-[100px]" title={log.endpoint}>
                            {log.endpoint}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400">
                        {log.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Tüm Logları Görüntüle &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
