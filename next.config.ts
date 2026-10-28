import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/about", destination: "/info", permanent: false },
      { source: "/contact", destination: "/info", permanent: false },
      { source: "/work", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
