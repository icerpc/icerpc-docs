// Copyright (c) ZeroC, Inc.

import React from 'react';
import Head from 'next/head';
import { AppWrapper, useVersionContext } from 'context/state';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';

import { SideNav, TopNav } from 'components';
import 'components/prism-coldark.css';
import '/public/globals.css';
import clsx from 'clsx';
import { SliceVersion } from 'types';

const inter = Inter({ subsets: ['latin'] });
const TITLE = 'TODO';
const DESCRIPTION = 'TODO';

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const { markdoc } = pageProps;
  const router = useRouter();
  const isDocs = router.asPath.startsWith('/docs');

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
      <ThemeProvider attribute="class" enableSystem={true}>
        <AppWrapper>
          <TopNav />
          <div className="mt-[7.5rem] flex flex-row justify-center lg:mt-[3.75rem]">
            <div className="flex grow flex-row justify-center ">
              {isDocs && <SideNav path={router.pathname} />}
              <main className={clsx(inter.className, 'grow')} id="main">
                <div id="skip-nav" />
                <Component {...pageProps} />
              </main>
            </div>
          </div>
        </AppWrapper>
      </ThemeProvider>
    </div>
  );
}
