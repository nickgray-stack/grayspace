/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Native <video> is served from a CDN in production (not committed to the repo).
  // Images are served from /public for V1; swap to a CDN/loader when assets grow.
};

export default nextConfig;
