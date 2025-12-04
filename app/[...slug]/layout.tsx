// Copyright (c) ZeroC, Inc.

import { PathProvider } from 'context/state';

export default async function DocsLayout(props: any) {
  const path = '/' + ((await props.params).slug?.join('/') ?? '');
  return <PathProvider path={path}>{props.children}</PathProvider>;
}
