# GÖREV: Kimlik Doğrulama (Auth) Altyapısının Kurulması
**Hedef:** Next.js (App Router) projesinde kullanıcı giriş, kayıt ve oturum yönetimi altyapısını ayağa kaldırmak.
**Teknoloji:** NextAuth.js (v5 / Auth.js) veya Supabase Auth.
**Gereksinimler:**
1. Kullanıcılar (Alıcı, Satıcı, Admin) `Role` enum'ına göre ayrışacak.
2. Credentials (E-posta / Şifre) provider'ı kurulacak.
3. Korumalı rotalar (Protected Routes) için middleware.ts oluşturulacak (Örn: /dashboard sadece giriş yapanlara).
**İstenen Çıktı:** Çalışan, dizin yapısına uygun bir Auth modülü kodu.
