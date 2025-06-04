import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'localhost:8000', '127.0.0.1', '127.0.0.1:8000'],
  },
};

export default nextConfig;
