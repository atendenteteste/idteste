import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      // Removido o redirecionamento da raiz para permitir geolocalização
      // {
      //   source: '/',
      //   destination: '/pt-br',
      //   permanent: true,
      // },
      {
        source: '/foto-passaporte',
        destination: '/pt-br/foto-passaporte',
        permanent: true,
      },
      {
        source: '/foto-rg',
        destination: '/pt-br/foto-rg',
        permanent: true,
      },
      {
        source: '/foto-passaporte-bebe',
        destination: '/pt-br/foto-passaporte-bebe',
        permanent: true,
      },
      {
        source: '/foto-cnh',
        destination: '/pt-br/foto-cnh',
        permanent: true,
      },
    ];
  }
};

export default config;
