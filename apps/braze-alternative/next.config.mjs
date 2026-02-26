/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/landing-sections', '@repo/config'],
  output: 'standalone',
};

export default nextConfig;
