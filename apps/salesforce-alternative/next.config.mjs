/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/landing-sections', '@repo/config', '@repo/database', '@repo/email'],
};

export default nextConfig;
