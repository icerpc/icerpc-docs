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
        title: 'Compilation mode',
        path: `${SLICE_BASE_URL}/language-guide/compilation-mode`
      },
      {
        title: 'Module',
        path: `${SLICE_BASE_URL}/language-guide/module`
      },
      {
        title: 'Interface',
        path: `${SLICE_BASE_URL}/language-guide/interface`
      },
      {
        title: 'Operation',
        path: `${SLICE_BASE_URL}/language-guide/operation`
      },
      {
        title: 'Parameters and fields',
        path: `${SLICE_BASE_URL}/language-guide/parameters-and-fields`
      },
      {
        title: 'Primitive types',
        path: `${SLICE_BASE_URL}/language-guide/primitive-types`
      },
      {
        title: 'Enum types',
        path: `${SLICE_BASE_URL}/language-guide/enum-types`
      },
      {
        title: 'Struct types',
        path: `${SLICE_BASE_URL}/language-guide/struct-types`
      },
      {
        title: 'Exception',
        path: `${SLICE_BASE_URL}/language-guide/exception`
      },
      {
        title: 'Proxy types',
        path: `${SLICE_BASE_URL}/language-guide/proxy-types`
      },
      {
        title: 'Sequence types',
        path: `${SLICE_BASE_URL}/language-guide/sequence-types`
      },
      {
        title: 'Dictionary types',
        path: `${SLICE_BASE_URL}/language-guide/dictionary-types`
      },
      {
        title: 'Custom types',
        path: `${SLICE_BASE_URL}/language-guide/custom-types`
      },
      {
        title: 'Well-known types',
        path: `${SLICE_BASE_URL}/language-guide/well-known-types`
      },
      {
        title: 'Type alias',
        path: `${SLICE_BASE_URL}/language-guide/type-alias`
      },
      {
        title: 'Attributes',
        path: `${SLICE_BASE_URL}/language-guide/attributes`
      },
      {
        title: 'Doc comments',
        path: `${SLICE_BASE_URL}/language-guide/doc-comments`
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
        title: 'Preprocessor directives',
        path: `${SLICE_BASE_URL}/language-reference/preprocessor-directives`
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
        title: 'Overview',
        path: `${SLICE_BASE_URL}/encoding`
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
  }
];
