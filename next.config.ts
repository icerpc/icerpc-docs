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
      { source: '/md/:path+', destination: '/:path+.md', permanent: true },
      // Old URLs of the Slice guide and the C# API reference, which other
      // sites still link to.
      {
        source: '/slice1/:path*',
        destination: '/slice/:path*',
        permanent: true
      },
      {
        source: '/slice2/:path*',
        destination: '/slice/:path*',
        permanent: true
      },
      {
        source: '/api/csharp/api/:path+',
        destination:
          'https://code.icerpc.dev/csharp/0.6.x/api/reference/:path+',
        permanent: true
      },
      {
        source: '/api/csharp/:path*',
        destination: 'https://code.icerpc.dev/csharp/0.6.x/api/index.html',
        permanent: true
      }
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
