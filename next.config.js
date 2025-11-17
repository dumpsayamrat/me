/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        imageSizes: [300, 600, 1200],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dumpsayamrat.com',
                port: '',
                pathname: '/**',
            },
        ],
        minimumCacheTTL: 31536000,
    },
    async headers() {
        return [
            {
                source: '/admin/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache',
                    },
                    {
                        key: 'Expires',
                        value: '0',
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
