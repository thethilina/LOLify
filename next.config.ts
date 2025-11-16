import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
    images: {
    domains: ["res.cloudinary.com"],
  },
  
};

export default nextConfig;
