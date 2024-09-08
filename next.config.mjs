/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  images: {
    domains: ["offerado.in", "blob.vercel-storage.com", "vercel-storage.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.offerado.in",
      },
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
