import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ckdshqbrxctjadljjhhy.supabase.co',
      },
    ],
  },
};

export default nextConfig;
