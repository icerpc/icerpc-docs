// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';
import { SideNav, TopNav } from '../components';
import dynamic from 'next/dynamic';

import '../public/globals.css';
import 'reactflow/dist/style.css';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';

const inter = Inter({ subsets: ['latin'] });
const TITLE = 'TODO';
const DESCRIPTION = 'TODO';
const TableOfContents = dynamic(
  () => import('../components/Shell/TableOfContents'),
  {
    ssr: false
  }
);

export type MyAppProps = MarkdocNextJsPageProps;

function collectHeadings(node, sections = []) {
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
  const toc = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : [];
  const showToc = isDocs && toc.some((header) => header.level > 1);

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
            className={`ml-auto max-w-screen-lg grow pt-[var(--nav-height)] ${
              isLandingPage ? '' : 'lg:ml-60'
            }`}
          >
            <main className={inter.className + 'px-5'} id="main">
              <div id="skip-nav" />
              <Component {...pageProps} />
            </main>
          </div>
          {showToc && <TableOfContents toc={toc} />}
        </div>
      </ThemeProvider>
    </div>
  );
}
