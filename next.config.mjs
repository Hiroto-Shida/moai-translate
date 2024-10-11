/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // cors error対策
  async headers() {
    const allowedOrigin =
      process.env.NODE_ENV === "production"
        ? "https://moai-translate.vercel.app/"
        : "http://localhost:1722";
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: allowedOrigin,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
