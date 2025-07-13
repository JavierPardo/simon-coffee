import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/simon-coffee', // <-- Asegúrate de que esto coincida con el nombre de tu repositorio
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
