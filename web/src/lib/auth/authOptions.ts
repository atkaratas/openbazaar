// --- KOD ADI: TGM | KİMLİK DOĞRULAMA (AUTH) YAPISI ---
// Google (Tek Tıkla), Apple (Tek Tıkla) ve Geleneksel E-Posta şifreleme modeli.

import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "E-Posta ve Şifre",
      credentials: {
        email: { label: "E-Posta", type: "email" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        // Prisma ile DB'den şifre (Bcrypt) doğrulama mantığı buraya enjekte edilecek
        return null 
      }
    })
  ],
  pages: {
    signIn: '/login', // Özel giriş ekranımız
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Veritabanından gelen rolü (BUYER, SELLER, ADMIN) token'a kazı
        token.role = (user as any).role 
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  }
}
