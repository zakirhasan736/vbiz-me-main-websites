import type { NextConfig } from 'next';
import { VCARD_EMBED_PERMISSIONS_POLICY } from './src/lib/vcard-mobile-loader';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/examples',
        destination: '/community',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.vbizme.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'app.vbizme.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/partner-logo-optimized/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: VCARD_EMBED_PERMISSIONS_POLICY,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
