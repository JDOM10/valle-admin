import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pinimg.com", "www.google.com", "via.placeholder.com"], // Añade aquí los dominios permitidos para las imágenes
  },
  /* otras opciones de configuración */
};

export default nextConfig;
