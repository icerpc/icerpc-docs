// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, SLICE1_BASE_URL } from 'types';

export const slice1Data: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${SLICE1_BASE_URL}`
  },
  {
    title: 'Basics',
    links: [
      {
        title: 'Slice components',
        path: `${SLICE1_BASE_URL}/basics/slice-components`
      },
      {
        title: 'Contract first model',
        path: `${SLICE1_BASE_URL}/basics/contract-first`
      },
      {
        title: 'Slice files',
        path: `${SLICE1_BASE_URL}/basics/slice-files`
      },
      {
        title: 'Examples',
        path: `${SLICE1_BASE_URL}/basics/examples`
      }
    ]
  },
  {
    title: 'Language guide',
    links: [
      {
        title: 'Compilation mode',
        path: `${SLICE1_BASE_URL}/language-guide/compilation-mode`
      },
      {
        title: 'Module',
        path: `${SLICE1_BASE_URL}/language-guide/module`
      },
      {
        title: 'Interface',
        path: `${SLICE1_BASE_URL}/language-guide/interface`
      },
      {
        title: 'Operation',
        path: `${SLICE1_BASE_URL}/language-guide/operation`
      },
      {
        title: 'Fields',
        path: `${SLICE1_BASE_URL}/language-guide/fields`
      },
      {
        title: 'Parameters',
        path: `${SLICE1_BASE_URL}/language-guide/parameters`
      },
      {
        title: 'Primitive types',
        path: `${SLICE1_BASE_URL}/language-guide/primitive-types`
      },
      {
        title: 'Enum types',
        path: `${SLICE1_BASE_URL}/language-guide/enum-types`
      },
      {
        title: 'Struct types',
        path: `${SLICE1_BASE_URL}/language-guide/struct-types`
      },
      {
        title: 'Class types',
        path: `${SLICE1_BASE_URL}/language-guide/class-types`
      },
      {
        title: 'Exception',
        path: `${SLICE1_BASE_URL}/language-guide/exception`
      },
      {
        title: 'Proxy types',
        path: `${SLICE1_BASE_URL}/language-guide/proxy-types`
      },
      {
        title: 'Sequence types',
        path: `${SLICE1_BASE_URL}/language-guide/sequence-types`
      },
      {
        title: 'Dictionary types',
        path: `${SLICE1_BASE_URL}/language-guide/dictionary-types`
      },
      {
        title: 'Custom types',
        path: `${SLICE1_BASE_URL}/language-guide/custom-types`
      },
      {
        title: 'Well-known types',
        path: `${SLICE1_BASE_URL}/language-guide/well-known-types`
      },
      {
        title: 'Type alias',
        path: `${SLICE1_BASE_URL}/language-guide/type-alias`
      },
      {
        title: 'Attributes',
        path: `${SLICE1_BASE_URL}/language-guide/attributes`
      },
      {
        title: 'Doc comments',
        path: `${SLICE1_BASE_URL}/language-guide/doc-comments`
      }
    ]
  },
  {
    title: 'Language reference',
    links: [
      {
        title: 'Lexical rules',
        path: `${SLICE1_BASE_URL}/language-reference/lexical-rules`
      },
      {
        title: 'Preprocessor directives',
        path: `${SLICE1_BASE_URL}/language-reference/preprocessor-directives`
      },
      {
        title: 'Keywords',
        path: `${SLICE1_BASE_URL}/language-reference/keywords`
      }
    ]
  },
  {
    title: 'Encoding reference',
    links: [
      {
        title: 'Overview',
        path: `${SLICE1_BASE_URL}/encoding/`
      },
      {
        title: 'Encoding-only constructs',
        path: `${SLICE1_BASE_URL}/encoding/encoding-only-constructs`
      },
      {
        title: 'Primitive types',
        path: `${SLICE1_BASE_URL}/encoding/primitive-types`
      },
      {
        title: 'Constructed types',
        path: `${SLICE1_BASE_URL}/encoding/constructed-types`
      },
      {
        title: 'Collection types',
        path: `${SLICE1_BASE_URL}/encoding/collection-types`
      },
      {
        title: 'Proxy types',
        path: `${SLICE1_BASE_URL}/encoding/proxy-types`
      },
      {
        title: 'Operation arguments',
        path: `${SLICE1_BASE_URL}/encoding/operation-arguments`
      },
      {
        title: 'Operation return value and exception',
        path: `${SLICE1_BASE_URL}/encoding/operation-return-value-exception`
      }
    ]
  }
];
