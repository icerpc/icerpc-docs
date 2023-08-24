// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, GETTING_STARTED_BASE_URL } from 'types';

export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
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
    title: 'Key features',
    links: [
      {
        title: 'A modular RPC framework built for QUIC',
        path: GETTING_STARTED_BASE_URL + '/key-features/modular-rpc-for-quic/'
      }
    ]
  },
  {
    title: 'Getting started with IceRPC for C#',
    links: [
      {
        title: 'Tutorial: Writing your first IceRPC application in C#',
        path: GETTING_STARTED_BASE_URL + '/icerpc-csharp/tutorial/'
      },
      {
        title: 'How to add IceRPC to an existing C# project?',
        path: GETTING_STARTED_BASE_URL + '/icerpc-csharp/how-to/'
      },
      {
        title: 'NuGet packages',
        path: GETTING_STARTED_BASE_URL + '/icerpc-csharp/nuget-packages/'
      }
    ]
  }
];
