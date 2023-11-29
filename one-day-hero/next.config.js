/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/back-end/:path*",
        destination: `${process.env.NEXT_PUBLIC_BE_URL}/:path*`
      }
    ];
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BE_S3_URL,
        port: "",
        pathname: "/**"
      }
    ]
  }
};

module.exports = nextConfig;
