// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType } from './types';

export const rpcCoreData: SideBarSourceType[] = [
  {
    title: 'Get started',
    kind: 'category',
    links: [
      {
        title: 'What is Slice?',
        path: '/docs/slice/what-is-slice/',
        kind: 'link'
      },
      { title: 'FAQ', path: '/docs/slice/faq/', kind: 'link' }
    ]
  },
  {
    title: 'Core concepts',
    kind: 'category',
    links: [
      {
        title: 'Installation',
        path: '/docs/slice/install/',
        kind: 'link'
      }
    ]
  },
  {
    title: 'Integration guides',
    kind: 'category',
    links: []
  },
  {
    title: 'Advanced concepts',
    kind: 'category',
    links: []
  }
];
