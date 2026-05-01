import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ckdshqbrxctjadljjhhy.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.thepurplewings.org',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
