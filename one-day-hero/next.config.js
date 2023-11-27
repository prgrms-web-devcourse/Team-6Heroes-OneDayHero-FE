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
        hostname: "team-06-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/missions/**"
      }
    ]
  }
};

module.exports = nextConfig;
