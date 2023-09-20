// Copyright (c) ZeroC, Inc.

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import App, { AppContext } from 'next/app';
import clsx from 'clsx';
import Head from 'next/head';

import '/public/globals.css';

import { AppWrapper, PathProvider } from 'context/state';
import { TopNav } from 'components';
import { Footer } from 'components/Shell';
import { Analytics } from 'components/Analytics';
import { baseUrls } from 'data';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
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

export default function MyApp(props: {
  Component: any;
  pageProps: any;
  notFound: boolean;
}) {
  const { Component, pageProps } = props;

  // Get current hostname and port for og:image
  const hostname = typeof window !== 'undefined' ? window.location.origin : '';

  let title = TITLE;
  let description = DESCRIPTION;
  const { frontmatter = {} } = pageProps;
  const path: string = pageProps.path ?? '/';

  // If the page has a title or description, use that instead
  if (frontmatter.title) title = frontmatter.title;
  if (frontmatter.description) description = frontmatter.description;

  return (
    <div>
      <Head>
        <title>
          {frontmatter && frontmatter.title ? `${title} | IceRPC Docs` : title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="strict-origin" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="IceRPC, RPC, Ice, ZeroC, networking, documentation, docs, guide"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@zeroc" />
        <meta name="twitter:creator" content="@zeroc" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs.icerpc.dev/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content={`${hostname}/api/og?title=${
            baseUrls.includes(path) ? 'Overview' : title
          }&description=${description}&path=${encodeURIComponent(path)}`}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <ThemeProvider attribute="class" enableSystem={true}>
        <PathProvider path={path}>
          <AppWrapper path={path}>
            <div className="flex min-h-screen flex-col">
              <TopNav />
              <main className={clsx(inter.className)} id="main">
                <Component {...pageProps} />
              </main>
              <Footer />
            </div>
            <Analytics />
          </AppWrapper>
        </PathProvider>
      </ThemeProvider>
    </div>
  );
}
