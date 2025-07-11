/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true, // required for static export if you use next/image
  },
  basePath: '/tua', // only needed if deploying to a subfolder
}

module.exports = nextConfig
