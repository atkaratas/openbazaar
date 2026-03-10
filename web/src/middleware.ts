import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname
      
      // 1. VİTRİN VE KATALOG (HERKESE AÇIK)
      // Kullanıcılar giriş yapmadan anasayfada, kategorilerde ve ürünlerde serbestçe dolaşabilir.
      if (!path.startsWith("/admin") && !path.startsWith("/seller") && !path.startsWith("/checkout")) {
        return true
      }
      
      // 2. KORUMALI ALANLAR (Giriş Zorunlu)
      // Admin Paneli: Sadece ADMIN girebilir
      if (path.startsWith("/admin")) return token?.role === "ADMIN"
      
      // Satıcı Paneli: Sadece SELLER veya ADMIN girebilir
      if (path.startsWith("/seller")) return token?.role === "SELLER" || token?.role === "ADMIN"
      
      // Ödeme Ekranı (Checkout): Giriş yapmış HERHANGİ bir kullanıcı (BUYER) girebilir
      if (path.startsWith("/checkout")) return !!token

      return false
    }
  }
})

// Middleware'in sadece bu rotalarda çalışmasını sağla (Performans için)
export const config = {
  matcher: ["/admin/:path*", "/seller/:path*", "/checkout"]
}
