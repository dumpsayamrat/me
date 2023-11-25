const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [200, 400, 1050],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${
          process.env.AWS_BUCKET || 'me-blog'
        }.s3.ap-southeast-1.wasabisys.com`,
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 31536000,
  },
}

module.exports = withContentlayer(nextConfig)
