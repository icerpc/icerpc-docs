import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // A build with SITE_NOINDEX=true is for the dev site, which must not compete
  // with docs.icerpc.dev in search results.
  async headers() {
    return process.env.SITE_NOINDEX === 'true'
      ? [
          {
            source: '/:path*',
            headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
          }
        ]
      : [];
  }
};

export default nextConfig;
