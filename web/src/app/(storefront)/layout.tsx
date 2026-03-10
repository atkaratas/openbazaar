import Navbar from "@/components/layout/Navbar"

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer Buraya Gelecek */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>© 2026 OpenBazaar. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
