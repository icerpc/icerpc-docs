// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBarSourceType, RPC_CORE_BASE_URL } from 'types';

export const rpcCoreData: SideBarSourceType[] = [
  {
    title: 'Overview',
    path: `${RPC_CORE_BASE_URL}`
  },
  {
    title: 'Foo',
    links: [
      {
        title: 'Bar ',
        path: `${RPC_CORE_BASE_URL}/foo/bar/`
      }
    ]
  }
];
