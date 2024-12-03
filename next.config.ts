import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        pathname: '/kcc-invite/**',
      },
    ],
  },
};

export default nextConfig;
