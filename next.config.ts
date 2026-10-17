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
        hostname: "your-cdn.example.com",
      },
    ],
  },
};

export default nextConfig;
