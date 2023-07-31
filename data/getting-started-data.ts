// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, GETTING_STARTED_BASE_URL } from 'types';

export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
  },
  {
    title: 'Key features',
    links: [
      {
        title: 'A modular RPC framework built for QUIC',
        path:
          GETTING_STARTED_BASE_URL + '/key-features/modular-rpc-for-quic/'
      },
      {
        title: 'Slice - a better IDL',
        path: GETTING_STARTED_BASE_URL + '/key-features/slice-better-idl/'
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
