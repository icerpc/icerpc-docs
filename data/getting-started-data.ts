// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType, GETTING_STARTED_BASE_URL } from './types';

export const gettingStartedData: SideBarSourceType[] = [
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
];
