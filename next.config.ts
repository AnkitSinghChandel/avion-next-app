import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      "*.pdf": {
        type: "asset",
      },
      "*.mp3": { type: "asset" },
      "*.wav": { type: "asset" },
      "*.mp4": { type: "asset" },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "s3.spire-solutions-1.res.trans-ix.whitesky.cloud",
      },
    ],
  },
};

export default nextConfig;
