import Link from 'next/link';
import { Settings, Users, Truck, DollarSign, BarChart3, ShieldCheck } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white border-r border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800">
          <ShieldCheck className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin HQ</h1>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
            <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
            Dashboard
          </Link>
          <Link href="/admin/sellers" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-800">
            <Users className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
            Satıcılar (KYC)
          </Link>
          <Link href="/admin/customs" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-800">
            <Truck className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
            Gümrük & ETGB
          </Link>
          <Link href="/admin/commissions" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-800">
            <DollarSign className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
            Komisyon Ayarları
          </Link>
          <Link href="/admin/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-800">
            <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
            Platform Ayarları
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
