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
    title: 'Invocation',
    links: [
    {
      title: 'Invocation pipeline',
      path: `${RPC_CORE_BASE_URL}/invocation/invocation-pipeline`
    },
    {
      title: 'Outgoing request',
      path: `${RPC_CORE_BASE_URL}/invocation/outgoing-request`
    },
    {
      title: 'Incoming response',
      path: `${RPC_CORE_BASE_URL}/invocation/incoming-response`
    },
    {
      title: 'Interceptor',
      path: `${RPC_CORE_BASE_URL}/invocation/interceptor`
    },
    {
      title: 'Service address',
      path: `${RPC_CORE_BASE_URL}/invocation/service-address`
    }
    ]
  },
  {
    title: 'Dispatch',
    links: [
    {
      title: 'Dispatch pipeline',
      path: `${RPC_CORE_BASE_URL}/dispatch/dispatch-pipeline`
    },
    {
      title: 'Incoming request',
      path: `${RPC_CORE_BASE_URL}/dispatch/incoming-request`
    },
    {
      title: 'Outgoing response',
      path: `${RPC_CORE_BASE_URL}/dispatch/outgoing-response`
    },
    {
      title: 'Middleware',
      path: `${RPC_CORE_BASE_URL}/dispatch/middleware`
    },
    {
      title: 'Router',
      path: `${RPC_CORE_BASE_URL}/dispatch/router`
    }
    ]
  },
  {
    title: 'Protocols and transports',
    links: [
    {
      title: 'icerpc and multiplexed transports',
      path: `${RPC_CORE_BASE_URL}/protocols-and-transports/icerpc-multiplexed-transports`
    },
    {
      title: 'ice and duplex transports',
      path: `${RPC_CORE_BASE_URL}/protocols-and-transports/ice-duplex-transports`
    },
    {
      title: 'Protocol compatibility',
      path: `${RPC_CORE_BASE_URL}/protocols-and-transports/protocol-compatibility`
    }
  ]
  },
  {
    title: 'The icerpc protocol',
    links: [
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
      }
    ]
  }
];
