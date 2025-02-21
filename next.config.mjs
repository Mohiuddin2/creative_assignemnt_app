/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;
