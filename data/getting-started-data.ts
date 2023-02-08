// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, GETTING_STARTED_BASE_URL } from 'types';

export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
  },
  {
    title: 'Getting started',
    links: [
      {
        title: 'What is IceRPC?',
        path: GETTING_STARTED_BASE_URL + '/what-is-icerpc/'
      },
      {
        title: 'Installation',
        path: GETTING_STARTED_BASE_URL + '/installation/'
      },
      {
        title: 'Creating an Application',
        path: GETTING_STARTED_BASE_URL + '/writing-an-application/'
      }
    ]
  }
];
