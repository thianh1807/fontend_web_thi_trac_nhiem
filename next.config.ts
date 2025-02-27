import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eaut.edu.vn",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "louisville.edu",
      },
      {
        protocol: "https",
        hostname: "backend-strapi-thi-trac-nhiem.onrender.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
