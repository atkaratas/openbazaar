/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Vercel'de dinamik server-side rendering (SSR) ve API'ler için bu KALKMALIDIR.
  // basePath: '/openbazaar', // Vercel kendi domainini vereceği için bu da KALKMALIDIR.
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};
export default nextConfig;
