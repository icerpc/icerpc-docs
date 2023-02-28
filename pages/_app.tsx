// Copyright (c) ZeroC, Inc.

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';
import { SideNav, TopNav } from 'components';
import { AppWrapper } from 'context/state';
import '/public/globals.css';
import 'reactflow/dist/style.css';
require('components/prism-coldark.css');

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
    <div>
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
          <div className="flex w-screen flex-col">
            <TopNav />
            <div className="flex grow flex-row">
              {isDocs && <SideNav path={router.pathname} />}
              <Body Component={Component} pageProps={pageProps} />
            </div>
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
    <div className={`px-6 lg:px-0`}>
      <main className={inter.className} id="main">
        <div id="skip-nav" />
        <Component {...pageProps} />
      </main>
    </div>
  );
};
