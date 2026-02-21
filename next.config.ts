import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
      return [
        {
          source: '/',
          destination: '/profile',
          permanent: true,
        },
      ];
    },
};

export default nextConfig;
