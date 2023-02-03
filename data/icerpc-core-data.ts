// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType, RPC_CORE_BASE_URL } from 'types';

export const rpcCoreData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${RPC_CORE_BASE_URL}`
  },
  {
    title: 'Connections',
    links:
    [
      {
        title: 'Client vs server connections',
        path: `${RPC_CORE_BASE_URL}/connections/client-vs-server-connections`
      },
      {
        title: 'Server address',
        path: `${RPC_CORE_BASE_URL}/connections/server-address`
      },
      {
        title: 'Security with TLS',
        path: `${RPC_CORE_BASE_URL}/connections/security-with-tls`
      },
    ],
  }
];
