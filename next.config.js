import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**", // Consider narrowing this for security
      },
    ],
  },
};

export default withNextIntl(nextConfig);
