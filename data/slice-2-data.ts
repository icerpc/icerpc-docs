// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, SLICE2_BASE_URL } from 'types';

export const slice2Data: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${SLICE2_BASE_URL}`
  },
  {
    title: 'Basics',
    links: [
      {
        title: 'Slice components',
        path: `${SLICE2_BASE_URL}/basics/slice-components`
      },
      {
        title: 'Contract first model',
        path: `${SLICE2_BASE_URL}/basics/contract-first`
      },
      {
        title: 'Slice files',
        path: `${SLICE2_BASE_URL}/basics/slice-files`
      },
      {
        title: 'Examples',
        path: `${SLICE2_BASE_URL}/basics/examples`
      }
    ]
  },
  {
    title: 'Language guide',
    links: [
      {
        title: 'Compilation mode',
        path: `${SLICE2_BASE_URL}/language-guide/compilation-mode`
      },
      {
        title: 'Module',
        path: `${SLICE2_BASE_URL}/language-guide/module`
      },
      {
        title: 'Interface',
        path: `${SLICE2_BASE_URL}/language-guide/interface`
      },
      {
        title: 'Operation',
        path: `${SLICE2_BASE_URL}/language-guide/operation`
      },
      {
        title: 'Fields',
        path: `${SLICE2_BASE_URL}/language-guide/fields`
      },
      {
        title: 'Parameters',
        path: `${SLICE2_BASE_URL}/language-guide/parameters`
      },
      {
        title: 'Primitive types',
        path: `${SLICE2_BASE_URL}/language-guide/primitive-types`
      },
      {
        title: 'Enum types',
        path: `${SLICE2_BASE_URL}/language-guide/enum-types`
      },
      {
        title: 'Struct types',
        path: `${SLICE2_BASE_URL}/language-guide/struct-types`
      },
      {
        title: 'Proxy types',
        path: `${SLICE2_BASE_URL}/language-guide/proxy-types`
      },
      {
        title: 'Sequence types',
        path: `${SLICE2_BASE_URL}/language-guide/sequence-types`
      },
      {
        title: 'Dictionary types',
        path: `${SLICE2_BASE_URL}/language-guide/dictionary-types`
      },
      {
        title: 'Custom types',
        path: `${SLICE2_BASE_URL}/language-guide/custom-types`
      },
      {
        title: 'Well-known types',
        path: `${SLICE2_BASE_URL}/language-guide/well-known-types`
      },
      {
        title: 'Type alias',
        path: `${SLICE2_BASE_URL}/language-guide/type-alias`
      },
      {
        title: 'Attributes',
        path: `${SLICE2_BASE_URL}/language-guide/attributes`
      },
      {
        title: 'Doc comments',
        path: `${SLICE2_BASE_URL}/language-guide/doc-comments`
      },
      {
        title: 'Preprocessor directives',
        path: `${SLICE2_BASE_URL}/language-guide/preprocessor-directives`
      },
      {
        title: 'Keywords',
        path: `${SLICE2_BASE_URL}/language-guide/keywords`
      }
    ]
  },
  {
    title: 'Language reference',
    links: [
      {
        title: 'Overview',
        path: `${SLICE2_BASE_URL}/language-reference/overview`
      },
      {
        title: 'Core language',
        path: `${SLICE2_BASE_URL}/language-reference/core-language`
      },
      {
        title: 'Doc comments',
        path: `${SLICE2_BASE_URL}/language-reference/doc-comments`
      },
      {
        title: 'Preprocessor directives',
        path: `${SLICE2_BASE_URL}/language-reference/preprocessor-directives`
      }
    ]
  },
  {
    title: 'Encoding reference',
    links: [
      {
        title: 'Overview',
        path: `${SLICE2_BASE_URL}/encoding`
      },
      {
        title: 'Encoding-only constructs',
        path: `${SLICE2_BASE_URL}/encoding/encoding-only-constructs`
      },
      {
        title: 'Primitive types',
        path: `${SLICE2_BASE_URL}/encoding/primitive-types`
      },
      {
        title: 'User-defined types',
        path: `${SLICE2_BASE_URL}/encoding/user-defined-types`
      },
      {
        title: 'Collection types',
        path: `${SLICE2_BASE_URL}/encoding/collection-types`
      },
      {
        title: 'Operation arguments and return values',
        path: `${SLICE2_BASE_URL}/encoding/operation`
      },
      {
        title: 'IceRPC + Slice integration',
        path: `${SLICE2_BASE_URL}/encoding/icerpc`
      }
    ]
  }
];
