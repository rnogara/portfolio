import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
