// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, ICERPC_FOR_ICE } from 'types';

export const iceRpcForIceUsersData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${ICERPC_FOR_ICE}`
  },
  {
    title: 'High-level comparison',
    links: [
      {
        title: 'Ice reinvented',
        path: `${ICERPC_FOR_ICE}/high-level-comparison/ice-reinvented`
      },
      {
        title: 'New features',
        path: `${ICERPC_FOR_ICE}/high-level-comparison/new-features`
      },
      {
        title: 'Using IceRPC with Ice',
        path: `${ICERPC_FOR_ICE}/high-level-comparison/using-icerpc-with-ice`
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
        title: 'Proxy string',
        path: `${ICERPC_FOR_ICE}/rpc-core/proxy-string`
      }
    ]
  },
  {
    title: 'Slice',
    links: [
      {
        title: 'New Slice',
        path: `${ICERPC_FOR_ICE}/slice/new-slice`
      },
      {
        title: 'Converting .ice into .slice',
        path: `${ICERPC_FOR_ICE}/slice/converting-ice-into-slice`
      }
    ]
  }
];
