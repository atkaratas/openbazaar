import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // --- DİKKAT: ARAYÜZ (UI) TEST AŞAMASINDA OLDUĞUMUZ İÇİN GÜVENLİK DUVARI GEÇİCİ OLARAK İNDİRİLDİ ---
      // Gerçek production'da burası eski haline (token kontrolüne) dönecek.
      return true
    }
  }
})

export const config = {
  matcher: ["/admin/:path*", "/seller/:path*", "/checkout"]
}
