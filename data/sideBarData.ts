// Copyright (c) ZeroC, Inc. All rights reserved.

const SLICE_BASE_URL = '/docs/slice';
const RPC_CORE_BASE_URL = '/docs/rpc';
const GETTING_STARTED_BASE_URL = '/docs/getting-started';

export type SideBarLink = {
  kind: 'link';
  title: string;
  path: string;
};

export type SideBarCategory = {
  kind: 'category';
  title: string;
  links: SideBarLink[];
};

export type SideBarSourceType = SideBarCategory | SideBarLink;

export const baseUrls = [
  SLICE_BASE_URL,
  RPC_CORE_BASE_URL,
  GETTING_STARTED_BASE_URL
];

// The order of the data is the order they appear in the sidebar.
export const sideBarData: { [base_url: string]: SideBarSourceType[] } = {
  // Data for "Getting Started" section
  '/docs/getting-started': [
    {
      title: 'Overview',
      kind: 'link',
      path: `${GETTING_STARTED_BASE_URL}/`
    },
    {
      title: 'Getting started',
      kind: 'category',
      links: [
        {
          title: 'What is IceRPC?',
          path: GETTING_STARTED_BASE_URL + '/what-is-icerpc/',
          kind: 'link'
        },
        {
          title: 'Installation',
          path: GETTING_STARTED_BASE_URL + '/installation/',
          kind: 'link'
        },
        {
          title: 'Creating an Application',
          path: GETTING_STARTED_BASE_URL + '/writing-an-application/',
          kind: 'link'
        }
      ]
    }
  ],
  // Data for "Slice" section
  '/docs/slice': [
    {
      title: 'Overview',
      path: `${SLICE_BASE_URL}`,
      kind: 'link'
    },
    {
      title: 'Core Concepts',
      kind: 'category',
      links: [
        {
          title: 'Syntax',
          path: SLICE_BASE_URL + '/core-concepts/syntax/',
          kind: 'link'
        },
        {
          title: 'Built in types',
          path: SLICE_BASE_URL + '/core-concepts/types/',
          kind: 'link'
        },
        {
          title: 'Attributes',
          path: SLICE_BASE_URL + '/core-concepts/attributes/',
          kind: 'link'
        },
        {
          title: 'Doc comments',
          path: SLICE_BASE_URL + '/core-concepts/comments/',
          kind: 'link'
        },
        {
          title: 'Preprocessor',
          path: SLICE_BASE_URL + '/core-concepts/preprocessor/',
          kind: 'link'
        }
      ]
    },
    {
      title: 'Advanced Concepts',
      kind: 'category',
      links: [
        {
          title: 'Custom types',
          path: SLICE_BASE_URL + '/core-concepts/',
          kind: 'link'
        },
        {
          title: 'Slice1 vs. Slice2',
          path: SLICE_BASE_URL + '/core-concepts/',
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
          path: SLICE_BASE_URL + '/core-concepts/',
          kind: 'link'
        },
        {
          title: 'Warnings',
          path: SLICE_BASE_URL + '/core-concepts/',
          kind: 'link'
        }
      ]
    },
    {
      title: 'Integration Guides',
      kind: 'category',
      links: [
        {
          title: 'Common examples',
          path: SLICE_BASE_URL + '/core-concepts/',
          kind: 'link'
        },
        {
          title: 'VSCode Syntax Highlighting',
          path: SLICE_BASE_URL + '/core-concepts/',
          kind: 'link'
        }
      ]
    }
  ],
  // Data for "RPC Core" section
  '/docs/rpc': [
    {
      title: 'Get started',
      kind: 'category',
      links: [
        {
          title: 'What is Slice?',
          path: '/docs/slice/what-is-slice/',
          kind: 'link'
        },
        { title: 'FAQ', path: '/docs/slice/faq/', kind: 'link' }
      ]
    },
    {
      title: 'Core concepts',
      kind: 'category',
      links: [
        { title: 'Installation', path: '/docs/slice/install/', kind: 'link' }
      ]
    },
    {
      title: 'Integration guides',
      kind: 'category',
      links: []
    },
    {
      title: 'Advanced concepts',
      kind: 'category',
      links: []
    }
  ]
};
