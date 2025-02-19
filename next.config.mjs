/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
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
