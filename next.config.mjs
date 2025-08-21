/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'media.gucci.com' },
      { protocol: 'https', hostname: 'assets.modaoperandi.com' },
    ],
  },
};

export default nextConfig;
