import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['via.placeholder.com', 'cdn.tobistore.com', 'your-supabase-bucket-url.com', 'images.pexels.com', 'illustrations.popsy.co', 'images.unsplash.com', 'ouch-cdn2.icons8.com'],
  },
}

export default nextConfig