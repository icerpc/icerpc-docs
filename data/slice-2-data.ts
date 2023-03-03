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
      },
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
        title: 'Primitive types',
        path: `${SLICE_BASE_URL}/encoding/primitive-types`
      },
      {
        title: 'Enum',
        path: `${SLICE_BASE_URL}/encoding/enum-slice2`
      },
      {
        title: 'Bit sequence',
        path: `${SLICE_BASE_URL}/encoding/bit-sequence`
      },
      {
        title: 'Struct',
        path: `${SLICE_BASE_URL}/encoding/struct-slice2`
      },
      {
        title: 'Exception',
        path: `${SLICE_BASE_URL}/encoding/exception-slice2`
      },
      {
        title: 'Sequence',
        path: `${SLICE_BASE_URL}/encoding/sequence-slice2`
      },
      {
        title: 'Dictionary',
        path: `${SLICE_BASE_URL}/encoding/dictionary-slice2`
      },
      {
        title: 'Operation',
        path: `${SLICE_BASE_URL}/encoding/operation-slice2`
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
