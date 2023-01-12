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

  const isDocs = router.asPath.startsWith('/docs');
  const isLandingPage = router.pathname === '/';

  return (
    <div className={`${isLandingPage ? 'page--landing' : ''}`}>
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

        <div className="page">
          <div className="side-nav">
            {isDocs ? <SideNav path={router.pathname} /> : null}
          </div>
          <div className="content">
            <main className={inter.className} id="main">
              <div id="skip-nav" />
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </ThemeProvider>
      <style jsx global>
        {`
          main {
            flex-grow: 1;
            max-width: 800%;
            /* https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container */
            min-width: 0;
          }

          main article {
            ${isDocs ? 'padding: 0rem 4rem 0rem;' : ''}
          }

          main article h1 {
            font-size: 24pt;
          }

          main article p {
            font-size: 16px;
          }

          .content {
            display: flex;
            flex-direction: col;
            flex-grow: 1;
            padding-top: var(--nav-height);
            min-height: 100vh;
            max-width: 1400px;
            margin: 0 auto;
          }

          .page {
            display: flex;
            position: relative;
          }

          .side-nav {
            flex: none;
          }

          /* Style hero section */

          .page--landing .hero-section {
            padding: 4rem;
          }
        `}
      </style>
    </div>
  );
}
