import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.clerk.com" }],
  },
  devIndicators: false,
};

export default nextConfig;
