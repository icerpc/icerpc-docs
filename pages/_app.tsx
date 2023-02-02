// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';
import { SideNav, TopNav } from 'components';
import { AppWrapper } from 'context/state';
import '/public/globals.css';
import 'reactflow/dist/style.css';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';
import { NextComponentType, NextPageContext } from 'next/types';

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
      <ThemeProvider attribute="class">
        <AppWrapper>
          <div className="lg:ml-60 xl:ml-72">
            <header className="z-10 contents lg:fixed lg:inset-0 lg:flex">
              <SideNav path={router.pathname} />
              <TopNav />
            </header>
            <Body Component={Component} pageProps={pageProps} />
          </div>
        </AppWrapper>
      </ThemeProvider>
    </div>
  );
}

type BodyProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: MarkdocNextJsPageProps;
};

const Body = ({ Component, pageProps }: BodyProps) => {
  return (
    <div
      className={`relative max-w-[1200px] px-6 pt-[var(--nav-height)] lg:px-0`}
    >
      <main className={inter.className + 'px-5'} id="main">
        <div id="skip-nav" />
        <Component {...pageProps} />
      </main>
    </div>
  );
};
