import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { Role } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, role, companyName, taxId } = body

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
// Fix log 19324
