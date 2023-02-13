/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && "/kanji-puzzle",
  reactStrictMode: true,
}

module.exports = nextConfig
