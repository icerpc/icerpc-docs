// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, GETTING_STARTED_BASE_URL } from 'types';

export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
  },
  {
    title: 'Quickstart',
    path: GETTING_STARTED_BASE_URL + '/quickstart/'
  },
  {
    title: 'Installation',
    links: [
      {
        title: 'Using the IceRPC .NET Project Templates',
        path: GETTING_STARTED_BASE_URL + '/installation/template/'
      },
      {
        title: 'Adding IceRPC to an existing project',
        path: GETTING_STARTED_BASE_URL + '/installation/existing-project/'
      },
      {
        title: 'NuGet packages',
        path: GETTING_STARTED_BASE_URL + '/installation/nuget-packages/'
      }
    ]
  },
  {
    title: 'Tutorial',
    links: [
      {
        title: 'Writing your first server application',
        path: GETTING_STARTED_BASE_URL + '/tutorial/server-tutorial/'
      },
      {
        title: 'Writing your first client application',
        path: GETTING_STARTED_BASE_URL + '/tutorial/client-tutorial/'
      }
    ]
  },
  {
    title: 'Supported platforms',
    links: [
      {
        title: 'IceRPC for C#',
        path: GETTING_STARTED_BASE_URL + '/supported-platforms/icerpc-csharp-0_1_0'
      }
    ]
  }
];
