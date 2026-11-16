import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 92],
  },
  async redirects() {
    return [
      {
        source: "/work/aegies-now",
        destination: "/work/aegis-now",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
