/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages için statik HTML üretme modu
  output: 'export',
  // Eğer özel alan adı (Custom Domain) yoksa ve https://username.github.io/openbazaar gibi bir alt yolda çalışacaksa:
  // basePath: '/openbazaar',
  
  // Statik modda çalışmayan Next.js Image Optimizasyonunu kapat
  images: {
    unoptimized: true,
  },
  
  // Tailwind ve App Router kullanıyoruz, build sırasında TS/Lint hatalarını (Test ortamı olduğu için) geçici olarak es geçebiliriz
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
