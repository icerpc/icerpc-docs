// Copyright (c) ZeroC, Inc.

import { AppWrapper, PathProvider } from 'context/state';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, TopNav } from 'components';
import { Analytics } from '@/components/analytics';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { Metadata } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: {
    default: 'IceRPC Docs',
    template: '%s | IceRPC Docs'
  },
  description: 'Welcome to the IceRPC Docs.',
  keywords: [
    'IceRPC',
    'RPC',
    'Ice',
    'ZeroC',
    'networking',
    'documentation',
    'docs',
    'guide'
  ],
  robots: {
    index: true,
    follow: true
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IceRPC Docs',
    description: 'Welcome to the IceRPC Docs.',
    creator: '@zeroc'
  },
  openGraph: {
    type: 'website',
    title: 'IceRPC Docs',
    description: 'Welcome to the IceRPC Docs.',
    url: 'https://docs.icerpc.dev/',
    locale: 'en_US',
    images: {
      url: `https://docs.icerpc.dev/api/og?title=${'IceRPC Docs'}&description=${'Welcome to the IceRPC Docs.'}&path=${encodeURIComponent(
        '/'
      )}`
    }
  },
  category: 'Software',
  metadataBase: new URL('https://docs.icerpc.dev')
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const schema = {
  '@context': 'http://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Home',
      description: 'Welcome to the IceRPC Docs.',
      url: new URL('/', baseUrl).href
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Getting Started',
      description: 'Quickly get up and running with IceRPC.',
      url: new URL('/getting-started', baseUrl).href
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'IceRPC',
      description: 'A modular RPC framework built for QUIC.',
      url: new URL('/icerpc', baseUrl).href
    },
    {
      '@type': 'SiteNavigationElement',
      position: 4,
      name: 'Slice',
      description: 'A modern IDL and serialization format.',
      url: new URL('/slice2', baseUrl).href
    },
    {
      '@type': 'SiteNavigationElement',
      position: 5,
      name: 'Protobuf',
      description: 'Using Protocol Buffers with IceRPC.',
      url: new URL('/protobuf', baseUrl).href
    },
    {
      '@type': 'SiteNavigationElement',
      position: 6,
      name: 'IceRPC for Ice users',
      description:
        'How IceRPC relates to Ice, and how to use IceRPC and Ice together.',
      url: new URL('/icerpc-for-ice-users', baseUrl).href
    }
  ]
};

export default function RootLayout(props: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PathProvider path="/">
            <AppWrapper>
              <div className="flex min-h-screen flex-col">
                <TopNav />
                <main className={clsx(inter.className)} id="main">
                  {props.children}
                </main>
                <Footer />
              </div>
            </AppWrapper>
            <Analytics />
          </PathProvider>
        </ThemeProvider>
        <Script
          id="navigation-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Fix for issue #368 - see discussion at https://github.com/algolia/docsearch/issues/1260 */}
        <div className="fixed">
          <input type="text" />
        </div>
      </body>
    </html>
  );
}
