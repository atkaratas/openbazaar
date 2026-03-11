
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false, // Şimdilik geçici, sonra kalıcı yapılabilir
      },
    ]
  },
};

export default nextConfig;
