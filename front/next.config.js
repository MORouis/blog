/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx'],
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
    //domains: ["avatars.githubusercontent.com", ]
  },
}

module.exports = nextConfig
