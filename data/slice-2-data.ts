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
        path: `${SLICE_BASE_URL}/basics/examples-slice2`
      }
    ]
  },
  {
    title: 'Language guide',
    links: [
      {
        title: 'Primitive types'
      },
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
      },
      {
        title: 'Constructed types'
      },
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
    title: 'Language reference',
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
    title: 'Encoding reference',
    links: [
      {
        title: 'Main features',
        path: `${SLICE_BASE_URL}/encoding/main-features`
      },
      {
        title: 'Primitive types',
        path: `${SLICE_BASE_URL}/encoding/primitive-types-slice2`
      },
      {
        title: 'Constructed types',
        path: `${SLICE_BASE_URL}/encoding/constructed-types-slice2`
      },
      {
        title: 'Collection types',
        path: `${SLICE_BASE_URL}/encoding/collection-types-slice2`
      },
      {
        title: 'Bit sequence',
        path: `${SLICE_BASE_URL}/encoding/bit-sequence`
      },
      {
        title: 'Operation arguments',
        path: `${SLICE_BASE_URL}/encoding/operation-arguments-slice2`
      },
      {
        title: 'Operation return value and exception',
        path: `${SLICE_BASE_URL}/encoding/operation-return-value-exception-slice2`
      }
    ]
  },
  {
    title: 'Compiler diagnostics',
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
