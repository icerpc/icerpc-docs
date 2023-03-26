// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, ICERPC_FOR_ICE } from 'types';

export const iceRpcForIceUsersData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${ICERPC_FOR_ICE}`
  },
  {
    title: 'Get started',
    links: [
      {
        title: 'High-level comparison',
        path: `${ICERPC_FOR_ICE}/get-started/high-level-comparison`
      },
      {
        title: 'New features',
        path: `${ICERPC_FOR_ICE}/get-started/new-features`
      },
      {
        title: 'Using IceRPC with Ice',
        path: `${ICERPC_FOR_ICE}/get-started/using-icerpc-with-ice`
      }
    ]
  },
  {
    title: 'RPC core',
    links: [
      {
        title: 'Communicator',
        path: `${ICERPC_FOR_ICE}/rpc-core/communicator`
      },
      {
        title: 'Object adapter',
        path: `${ICERPC_FOR_ICE}/rpc-core/object-adapter`
      },
      {
        title: 'Endpoint',
        path: `${ICERPC_FOR_ICE}/rpc-core/endpoint`
      },
      {
        title: 'Ice identity',
        path: `${ICERPC_FOR_ICE}/rpc-core/ice-identity`
      },
      {
        title: 'Proxy',
        path: `${ICERPC_FOR_ICE}/rpc-core/proxy`
      }
    ]
  },
  {
    title: 'Slice',
    links: [
      {
        title: 'One syntax, two encodings',
        path: `${ICERPC_FOR_ICE}/slice/one-syntax-two-encodings`
      },
      {
        title: 'Ice to Slice',
        path: `${ICERPC_FOR_ICE}/slice/ice-to-slice`
      }
    ]
  }
];
