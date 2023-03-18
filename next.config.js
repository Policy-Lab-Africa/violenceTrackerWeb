const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  runtimeCaching,
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
