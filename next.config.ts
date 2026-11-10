import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Every page is also served as Markdown at its URL with `.md` appended, by
  // the route under app/md, which keeps no URL of its own (lib/page-markdown.ts).
  async rewrites() {
    return [{ source: '/:path+.md', destination: '/md/:path+' }];
  },
  async redirects() {
    return [
      { source: '/md/:path+', destination: '/:path+.md', permanent: true }
    ];
  },
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
