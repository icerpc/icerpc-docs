// Copyright (c) ZeroC, Inc. All rights reserved.

const slice_base_url = '/docs/slice';
const rpc_base_url = '/docs/rpc';

export const sideBarData = [
  {
    base: slice_base_url,
    categories: [
      {
        title: 'Getting started',
        links: [
          {
            href: slice_base_url + '/getting-started/',
            name: 'Overview'
          },
          {
            href: slice_base_url + '/getting-started/what-is-slice',
            name: 'What is Slice?'
          },
          { href: slice_base_url + '/getting-started/faq', name: 'FAQ' }
        ]
      },
      {
        title: 'Core concepts',
        links: [
          { href: slice_base_url + '/core-concepts', name: 'Installation' }
        ]
      },
      {
        title: 'Integration guides',
        links: []
      },
      {
        title: 'Advanced concepts',
        links: []
      }
    ]
  },
  {
    base: rpc_base_url,
    categories: [
      {
        title: 'Get started',
        links: [
          { href: '/docs/slice/what-is-slice', name: 'What is Slice?' },
          { href: '/docs/slice/faq', name: 'FAQ' }
        ]
      },
      {
        title: 'Core concepts',
        links: [{ href: '/docs/slice/reece', name: 'Installation' }]
      },
      {
        title: 'Integration guides',
        links: []
      },
      {
        title: 'Advanced concepts',
        links: []
      }
    ]
  }
];
