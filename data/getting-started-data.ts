// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, GETTING_STARTED_BASE_URL } from 'types';

export const gettingStartedData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${GETTING_STARTED_BASE_URL}/`
  },
  {
    title: 'Raising the bar',
    links: [
      {
        title: 'A modular RPC framework for the QUIC era',
        path: GETTING_STARTED_BASE_URL + '/raising-the-bar/modular-rpc-for-quic/'
      },
      {
        title: 'Next-gen IDL: The power of simplicity',
        path: GETTING_STARTED_BASE_URL + '/raising-the-bar/next-gen-idl/'
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
        title: 'How-to add IceRPC to an existing C# project',
        path: GETTING_STARTED_BASE_URL + '/icerpc-csharp/how-to/'
      }
    ]
  }
];
