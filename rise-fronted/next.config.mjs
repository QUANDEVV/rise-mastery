/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  turbopack: {
    root: './',
  },
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
};

export default withPWA(pwaConfig)(nextConfig);
