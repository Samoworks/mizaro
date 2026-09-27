import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // الصفحات القديمة أصبحت صفحات مستقلة ضمن إعادة الهيكلة متعددة الصفحات
  async redirects() {
    return [
      { source: "/packages", destination: "/pricing", permanent: true },
      { source: "/accounting", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
