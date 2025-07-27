import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['img.icons8.com', 'live.staticflickr.com', 'svgl.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'svgl.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
