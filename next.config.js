// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Opção simples:
    domains: [
      'storage.googleapis.com',
      'faculdadeunica.com.br', // se em algum momento vier imagem daqui
      'prominaserp.storage.googleapis.com' // (caso use esse subdomínio)
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
        hostname: "www.gstatic.com", // para o logo do google
      },
    ],
  },
    // ou, se preferir ser mais específico, use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'storage.googleapis.com',
    //     pathname: '/prominaserp/**', // ajuste conforme o caminho que vem da API
    //   },
    // ],

};

module.exports = nextConfig;
