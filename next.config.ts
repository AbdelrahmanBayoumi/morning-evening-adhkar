import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // turbopack root is now in the type definition
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
