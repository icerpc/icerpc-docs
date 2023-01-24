// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType, SLICE_BASE_URL } from './types';

export const slice2Data: SideBarSourceType[] = [
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
    title: 'Constructs',
    kind: 'category',
    links: [
      {
        title: 'Structs',
        path: `${SLICE_BASE_URL}/slice2/constructs/structs/`,
        kind: 'link'
      },
      {
        title: 'Enums',
        path: `${SLICE_BASE_URL}/slice2/constructs/enums/`,
        kind: 'link'
      },
      {
        title: 'Custom',
        path: `${SLICE_BASE_URL}/slice2/constructs/custom/`,
        kind: 'link'
      },
      {
        title: 'Interfaces',
        path: `${SLICE_BASE_URL}/slice2/constructs/interfaces/`,
        kind: 'link'
      }
    ]
  },
  {
    title: 'Primitive Types',
    kind: 'category',
    links: [
      {
        title: 'Integer Types',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/integer/`,
        kind: 'link'
      },
      {
        title: 'Strings',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/strings/`,
        kind: 'link'
      },
      {
        title: 'Boolean',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/boolean/`,
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
