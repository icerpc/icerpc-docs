// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';
import { SideNav, TOCItem, TableOfContents, TopNav } from 'components';
import { AppWrapper } from 'context/state';
import '/public/globals.css';
import 'reactflow/dist/style.css';
require('components/prism-coldark.css');

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';
import { NextComponentType, NextPageContext } from 'next/types';
import { RenderableTreeNodes } from '@markdoc/markdoc';

const inter = Inter({ subsets: ['latin'] });
const TITLE = 'TODO';
const DESCRIPTION = 'TODO';

export type MyAppProps = MarkdocNextJsPageProps;

function collectHeadings(node: any, sections: TOCItem[] = []) {
  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0];

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title
        });
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections);
      }
    }
  }

  return sections;
}

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
  const toc: TOCItem[] = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : [];

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
            <div className="mt-16 flex flex-row">
              {isDocs && <SideNav path={router.pathname} />}
              <div className="flex grow flex-row justify-center">
                <main className={inter.className} id="main">
                  <div id="skip-nav" />
                  <Component {...pageProps} />
                </main>
                {isDocs && toc.length > 1 && TableOfContents(toc)}
              </div>
            </div>
          </div>
        </AppWrapper>
      </ThemeProvider>
    </div>
  );
}
