// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'faculdadeunica.com.br',
      'prominaserp.storage.googleapis.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
    ],
  },
  env: {
    API_ADDRESS: process.env.API_ADDRESS,
    COOKIE_KEY: process.env.COOKIE_KEY,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
  },
};

module.exports = nextConfig;
