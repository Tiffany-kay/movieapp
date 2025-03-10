/** @type {import('next').NextConfig} */
const nextPWA = require("next-pwa");

const withPWA = nextPWA({
  dest: "public", // Where the service worker & manifest live
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable in dev to avoid caching issues
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = withPWA(nextConfig);
