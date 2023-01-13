// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';
import { SideNav, TopNav } from '../components';

import '../public/globals.css';
import 'reactflow/dist/style.css';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';

const inter = Inter({ subsets: ['latin'] });
const TITLE = 'TODO';
const DESCRIPTION = 'TODO';

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const { markdoc } = pageProps;
  const router = useRouter();
  const isDocs = router.asPath.startsWith('/docs');
  const isLandingPage = router.pathname === '/';

  let title = TITLE;
  let description = DESCRIPTION;
  if (markdoc) {
    if (markdoc.frontmatter.title) {
      title = markdoc.frontmatter.title;
    }
    if (markdoc.frontmatter.description) {
      description = markdoc.frontmatter.description;
    }
  }

  return (
    <div className={`${isLandingPage ? 'p-16' : ''}`}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="strict-origin" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <TopNav />
        <div className="relative flex justify-center ">
          <div className="fixed top-0 left-0 z-[101] flex-none">
            {isDocs ? <SideNav path={router.pathname} /> : null}
          </div>
          <div
            className={`ml-auto max-w-screen-xl pt-[var(--nav-height)] ${
              isLandingPage ? '' : 'lg:ml-60'
            }`}
          >
            <main
              className={inter.className + 'min-w-0 max-w-screen-2xl flex-grow px-16'}
              id="main"
            >
              <div id="skip-nav" />
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
