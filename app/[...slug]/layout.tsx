// Copyright (c) ZeroC, Inc.

import { PathProvider } from 'context/state';
import { ReactNode } from 'react';

interface DocsLayoutProps {
  children: ReactNode;
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function DocsLayout(props: DocsLayoutProps) {
  const path = '/' + ((await props.params).slug?.join('/') ?? '');
  return <PathProvider path={path}>{props.children}</PathProvider>;
}
