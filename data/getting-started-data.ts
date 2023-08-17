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
    title: 'Using IceRPC',
    links: [
      {
        title: 'Quickstart',
        path: GETTING_STARTED_BASE_URL + '/using-icerpc/quickstart/'
      },
      {
        title: 'Server project structure',
        path:
          GETTING_STARTED_BASE_URL + '/using-icerpc/server-project-structure/'
      },
      {
        title: 'Client project structure',
        path:
          GETTING_STARTED_BASE_URL + '/using-icerpc/client-project-structure/'
      }
    ]
  },
  {
    title: 'Key features',
    links: [
      {
        title: 'A modular RPC framework built for QUIC',
        path: GETTING_STARTED_BASE_URL + '/key-features/modular-rpc-for-quic/'
      },
      {
        title: 'Slice - a better IDL',
        path: GETTING_STARTED_BASE_URL + '/key-features/slice-better-idl/'
      }
    ]
  }
];
