import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { Role } from '@prisma/client'

export const dynamic = 'force-dynamic'

// Basit bir XSS temizleme fonksiyonu örneği
const sanitizeInput = (input: string) => {
  if (!input) return input;
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // XSS Koruması: Girdileri sanitize ediyoruz
    const email = sanitizeInput(body.email)
    const password = body.password // Şifre hash'leneceği için sanitize edilmez
    const role = sanitizeInput(body.role)
    const companyName = sanitizeInput(body.companyName)
    const taxId = sanitizeInput(body.taxId)

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre zorunludur.' }, { status: 400 })
    }

    // Kullanıcı var mı kontrol et
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kullanılıyor.' }, { status: 400 })
    }

    // Basit bir hash simülasyonu (Gerçekte bcryptjs kullanılır)
    const passwordHash = password + "_hashed"

    // Transaction: Hem User hem de Role="SELLER" ise Store yarat
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role: role as Role,
          name: companyName || 'İsimsiz Kullanıcı'
        }
      })

      if (role === 'SELLER') {
        await tx.store.create({
          data: {
            ownerId: user.id,
            name: companyName || email.split('@')[0],
            taxId: taxId,
            isVerified: false // Admin onaylayana kadar false
          }
        })
      }

      return user
    })

    return NextResponse.json({ success: true, user: { email: newUser.email, role: newUser.role } })

  } catch (error: any) {
    console.error('Registration Error:', error)
    return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.' }, { status: 500 })
  }
}

// Fix log 9548
// Fix log 24351
// Fix log 1785
