/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for art gallery
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // For Vercel deployment - keep this commented until ready to deploy
  // output: 'export', // Only enable for static export if needed
}

module.exports = nextConfig