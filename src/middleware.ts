import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth
    const path = req.nextUrl.pathname

    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    if (path.startsWith("/seller")) {
      if (token?.role !== "SELLER" && token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Oturum açılmışsa true döner
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ["/admin/:path*", "/seller/:path*"]
}
