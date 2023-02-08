// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, SLICE_BASE_URL } from 'types';

export const slice1Data: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${SLICE_BASE_URL}`
  },
  {
    title: 'Syntax',
    links: [
      {
        title: 'Lexical Rules',
        path: `${SLICE_BASE_URL}/syntax/lexical-rules/`
      },
      {
        title: 'Slice Source Files',
        path: `${SLICE_BASE_URL}/syntax/source-files/`
      },
      {
        title: 'Keywords',
        path: `${SLICE_BASE_URL}/syntax/keywords/`
      }
    ]
  },
  {
    title: 'Slice1 Only',
    links: [
      {
        title: 'Foo',
        path: `${SLICE_BASE_URL}/slice1/foo/`
      }
    ]
  },
  {
    title: 'Error Code Reference',
    links: [
      {
        title: 'Errors',
        path: `${SLICE_BASE_URL}/error-codes/errors/`
      },
      {
        title: 'Warnings',
        path: `${SLICE_BASE_URL}/error-codes/warnings/`
      }
    ]
  }
];
