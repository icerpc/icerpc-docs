// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType, SLICE_BASE_URL } from './types';

export const slice1Data: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${SLICE_BASE_URL}`,
    kind: 'link'
  },
  {
    title: 'Syntax',
    kind: 'category',
    links: [
      {
        title: 'Lexical Rules',
        path: `${SLICE_BASE_URL}/syntax/lexical-rules/`,
        kind: 'link'
      },
      {
        title: 'Slice Source Files',
        path: `${SLICE_BASE_URL}/syntax/source-files/`,
        kind: 'link'
      },
      {
        title: 'Keywords',
        path: `${SLICE_BASE_URL}/syntax/keywords/`,
        kind: 'link'
      }
    ]
  },
  {
    title: 'Slice1 Only',
    kind: 'category',
    links: [
      {
        title: 'Lexical Rules',
        path: `${SLICE_BASE_URL}/slice1/foo/`,
        kind: 'link'
      },
      {
        title: 'Slice Source Files',
        path: `${SLICE_BASE_URL}/slice1/foo/`,
        kind: 'link'
      },
      {
        title: 'Keywords',
        path: `${SLICE_BASE_URL}/slice1/foo/`,
        kind: 'link'
      }
    ]
  },
  {
    title: 'Error Code Reference',
    kind: 'category',
    links: [
      {
        title: 'Errors',
        path: `${SLICE_BASE_URL}/error-codes/errors/`,
        kind: 'link'
      },
      {
        title: 'Warnings',
        path: `${SLICE_BASE_URL}/error-codes/warnings/`,
        kind: 'link'
      }
    ]
  }
];
