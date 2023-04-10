// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, SLICE_BASE_URL } from 'types';

export const slice2Data: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${SLICE_BASE_URL}`
  },
  {
    title: 'Basics',
    links: [
      {
        title: 'Why use Slice?',
        path: `${SLICE_BASE_URL}/basics/why-use-slice`
      },
      {
        title: 'Slice components',
        path: `${SLICE_BASE_URL}/basics/slice-components`
      },
      {
        title: 'Contract first model',
        path: `${SLICE_BASE_URL}/basics/contract-first`
      },
      {
        title: 'Slice files',
        path: `${SLICE_BASE_URL}/basics/slice-files`
      },
      {
        title: 'Examples',
        path: `${SLICE_BASE_URL}/basics/examples`
      }
    ]
  },
  {
    title: 'Language guide',
    links: [
      {
        title: 'Slice1 or Slice2',
        path: `${SLICE_BASE_URL}/language-guide/slice1-or-slice2`
      },
      {
        title: 'Primitive types',
        path: `${SLICE_BASE_URL}/language-guide/primitive-types`
      }
    ]
  },
  {
    title: 'Language reference',
    links: [
      {
        title: 'Lexical rules',
        path: `${SLICE_BASE_URL}/language-reference/lexical-rules`
      },
      {
        title: 'Slice source files',
        path: `${SLICE_BASE_URL}/language-reference/source-files`
      },
      {
        title: 'Keywords',
        path: `${SLICE_BASE_URL}/language-reference/keywords`
      }
    ]
  },
  {
    title: 'Encoding reference',
    links: [
      {
        title: 'Main features',
        path: `${SLICE_BASE_URL}/encoding/main-features`
      },
      {
        title: 'Encoding-only constructs',
        path: `${SLICE_BASE_URL}/encoding/encoding-only-constructs`
      },
      {
        title: 'Primitive types',
        path: `${SLICE_BASE_URL}/encoding/primitive-types`
      },
      {
        title: 'Constructed types',
        path: `${SLICE_BASE_URL}/encoding/constructed-types`
      },
      {
        title: 'Collection types',
        path: `${SLICE_BASE_URL}/encoding/collection-types`
      },
      {
        title: 'Operation arguments',
        path: `${SLICE_BASE_URL}/encoding/operation-arguments`
      },
      {
        title: 'Operation return value and exception',
        path: `${SLICE_BASE_URL}/encoding/operation-return-value-exception`
      }
    ]
  },
  {
    title: 'Compiler diagnostics',
    links: [
      {
        title: 'Errors',
        path: `${SLICE_BASE_URL}/compiler-diagnostics/errors`
      },
      {
        title: 'Warnings',
        path: `${SLICE_BASE_URL}/compiler-diagnostics/warnings`
      }
    ]
  }
];
