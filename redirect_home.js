const fs = require('fs');

const nextConfigPath = '/tmp/openbazaar/next.config.mjs';
const code = `
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
`;

fs.writeFileSync(nextConfigPath, code);
console.log("Updated next.config.mjs with redirect");
