/** @type {import('next').NextConfig} */
const nextConfig = {
  // Em desenvolvimento, mostra no terminal cada fetch feito no servidor
  // (ex.: a chamada à API do TabNews no rodapé), com a URL completa.
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
