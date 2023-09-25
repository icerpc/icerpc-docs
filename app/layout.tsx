// Copyright (c) ZeroC, Inc.

import { AppWrapper, PathProvider } from 'context/state';
import '/public/globals.css';
import { ThemeProvider } from 'components/ThemeProvider';
import { Footer, TopNav } from 'components';
import { Analytics } from 'components/Analytics';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { Metadata } from 'next';

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

export default function RootLayout(props: any) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
