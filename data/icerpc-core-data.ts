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
        title: 'How to create a connection',
        path: `${RPC_CORE_BASE_URL}/connection/how-to-create-a-connection`
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
    title: 'Dependency Injection',
    links: [
      {
        title: 'Dependency Injection and IceRPC for C#',
        path: `${RPC_CORE_BASE_URL}/dependency-injection/di-and-icerpc-for-csharp`
      },
      {
        title: 'Dispatch pipeline with DI',
        path: `${RPC_CORE_BASE_URL}/dependency-injection/dispatch-pipeline-with-di`
      },
      {
        title: 'Invocation pipeline with DI',
        path: `${RPC_CORE_BASE_URL}/dependency-injection/invocation-pipeline-with-di`
      }
    ]
  },
  {
    title: 'Advanced topics'
  },
  {
    title: 'Customization',
    links: [
      {
        title: 'Protocol connection',
        path: `${RPC_CORE_BASE_URL}/customization/protocol-connection`
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
  },
  {
    title: 'The ice protocol',
    links: [
      {
        title: 'Protocol frames',
        path: `${RPC_CORE_BASE_URL}/ice-protocol/protocol-frames`
      },
      {
        title: 'Connection establishment',
        path: `${RPC_CORE_BASE_URL}/ice-protocol/connection-establishment`
      },
      {
        title: 'Connection shutdown',
        path: `${RPC_CORE_BASE_URL}/ice-protocol/connection-shutdown`
      }
    ]
  },
  {
    title: 'The Slic protocol',
    links: [
      {
        title: 'Overview',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/`
      },
      {
        title: 'Connection establishment',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/connection-establishment`
      },
      {
        title: 'Connection closure',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/connection-closure`
      },
      {
        title: 'Connection idle timeout',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/connection-idle-timeout`
      },
      {
        title: 'Streams',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/streams`
      },
      {
        title: 'Flow control',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/flow-control`
      },
      {
        title: 'Protocol frames',
        path: `${RPC_CORE_BASE_URL}/slic-protocol/protocol-frames`
      }
    ]
  }];
