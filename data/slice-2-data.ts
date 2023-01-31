// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType, SLICE_BASE_URL } from 'types';

export const slice2Data: SideBarSourceType[] = [
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
    title: 'Constructs',
    links: [
      {
        title: 'Structs',
        path: `${SLICE_BASE_URL}/slice2/constructs/structs/`
      },
      {
        title: 'Enums',
        path: `${SLICE_BASE_URL}/slice2/constructs/enums/`
      },
      {
        title: 'Custom',
        path: `${SLICE_BASE_URL}/slice2/constructs/custom/`
      },
      {
        title: 'Interfaces',
        path: `${SLICE_BASE_URL}/slice2/constructs/interfaces/`
      }
    ]
  },
  {
    title: 'Primitive Types',
    links: [
      {
        title: 'Integer Types',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/integer/`
      },
      {
        title: 'Floating-point Types',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/float/`
      },
      {
        title: 'Strings',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/strings/`
      },
      {
        title: 'Boolean',
        path: `${SLICE_BASE_URL}/slice2/primitive-types/boolean/`
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
