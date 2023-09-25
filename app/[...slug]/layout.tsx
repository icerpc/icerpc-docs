// Copyright (c) ZeroC, Inc.

import { Inter } from 'next/font/google';
import clsx from 'clsx';

import { AppWrapper, PathProvider } from 'context/state';
import { TopNav } from 'components';
import { Footer } from 'components/Shell';
import { Analytics } from 'components/Analytics';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export default function DocsLayout(props: any) {
  const path = '/' + props.params.slug?.join('/') ?? '';
  return (
    <PathProvider path={path}>
      <AppWrapper path={path}>
        <div className="flex min-h-screen flex-col">
          <TopNav />
          <main className={clsx(inter.className)} id="main">
            {props.children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </AppWrapper>
    </PathProvider>
  );
}
