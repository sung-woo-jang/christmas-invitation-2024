const nextConfig = {
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
