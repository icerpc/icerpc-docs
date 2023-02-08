// Copyright (c) ZeroC, Inc.

import { SideBarSourceType, RPC_CORE_BASE_URL } from 'types';

export const rpcCoreData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${RPC_CORE_BASE_URL}`
  },
  {
    title: 'Connection',
    links: [
      {
        title: 'Client vs server connections',
        path: `${RPC_CORE_BASE_URL}/connection/client-vs-server-connections`
      },
      {
        title: 'Server address',
        path: `${RPC_CORE_BASE_URL}/connection/server-address`
      },
      {
        title: 'Security with TLS',
        path: `${RPC_CORE_BASE_URL}/connection/security-with-tls`
      }
    ]
  },
  {
    title: 'The icerpc protocol',
    links: [
      {
        title: 'icerpc vs http3',
        path: `${RPC_CORE_BASE_URL}/icerpc-protocol/icerpc-vs-http3`
      },
      {
        title: 'Mapping RPCs to streams',
        path: `${RPC_CORE_BASE_URL}/icerpc-protocol/mapping-rpcs-to-streams`
      },
      {
        title: 'Connection establishment',
        path: `${RPC_CORE_BASE_URL}/icerpc-protocol/connection-establishment`
      },
      {
        title: 'Connection shutdown',
        path: `${RPC_CORE_BASE_URL}/icerpc-protocol/connection-shutdown`
      },
      {
        title: 'Slic',
        path: `${RPC_CORE_BASE_URL}/icerpc-protocol/slic`
      }
    ]
  }
];
