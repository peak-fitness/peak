/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cfbogjupbnvkonljmcuq.supabase.co",
        port: "",
        pathname: "storage/v1/object/public/profile-pics/**",
      },
    ],
  },
};
// cfbogjupbnvkonljmcuq.supabase.co/storage/v1/object/public/profile-pics/1676059411080_squidward.jpeg
// cfbogjupbnvkonljmcuq.supabase.co/storage/v1/object/public/profile-pics
module.exports = nextConfig;
