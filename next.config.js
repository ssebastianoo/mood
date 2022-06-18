/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_KEY: process.env.FIREBASE_KEY,
  }
}

module.exports = nextConfig
