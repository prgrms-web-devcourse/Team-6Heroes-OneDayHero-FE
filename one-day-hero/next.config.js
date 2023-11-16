/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/back-end/:path*",
        destination: `${process.env.NEXT_PUBLIC_BE_URL}/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
