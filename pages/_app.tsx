// Copyright (c) ZeroC, Inc.

import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import App, { AppContext } from 'next/app';
import clsx from 'clsx';
import ErrorPage from 'next/error';
import Head from 'next/head';

import '/public/globals.css';
import 'components/prism-coldark.css';

import { AppWrapper } from 'context/state';
import { SideNav, TopNav } from 'components';
import { Footer } from 'components/Shell';

const inter = Inter({ subsets: ['latin'] });
const TITLE = 'IceRPC Docs';
const DESCRIPTION = 'Explore our guides and examples to integrate IceRPC.';

export async function getInitialProps(appContext: AppContext) {
  const { res } = appContext.ctx;
  const appProps = await App.getInitialProps(appContext);
  if (appProps.pageProps?.errorStatus && res) {
    res.statusCode = appProps.pageProps.errorStatus;
  }
  return {
    ...appProps
  };
}

export default function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;
  const { markdoc } = pageProps;
  const router = useRouter();
  const isDocs = router.asPath.startsWith('/docs');

  if (pageProps.statusCode == 404) {
    return (
      <div className="h-screen w-screen">
        <ErrorPage statusCode={404} withDarkMode={false} />;
      </div>
    );
  }

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

  if (pageProps?.errorStatus) {
    return <ErrorPage statusCode={pageProps.errorStatus} />;
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
          <div className="mt-[6.5rem] flex flex-row justify-center lg:mt-[3.75rem] ">
            <div className="flex max-w-[98rem] grow flex-row justify-center">
              {isDocs && <SideNav path={router.pathname} />}
              <main className={clsx(inter.className, 'grow')} id="main">
                <div id="skip-nav" />
                <Component {...pageProps} />
              </main>
            </div>
          </div>
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    </div>
  );
}
