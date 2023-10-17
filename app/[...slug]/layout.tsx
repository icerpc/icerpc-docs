// Copyright (c) ZeroC, Inc.

import { PathProvider } from 'context/state';

export default function DocsLayout(props: any) {
  const path = '/' + props.params.slug?.join('/') ?? '';
  return <PathProvider path={path}>{props.children}</PathProvider>;
}
