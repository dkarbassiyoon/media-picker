import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Handle the 'canvas' module issue in pdfjs-dist
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      'worker_threads': false,
      'fs': false,
      'path': false,
    };
    return config;
  },
};

export default nextConfig;
