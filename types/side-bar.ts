// Copyright (c) ZeroC, Inc. All rights reserved.

export const SLICE_BASE_URL = '/docs/slice';
export const GETTING_STARTED_BASE_URL = '/docs/getting-started';
export const RPC_CORE_BASE_URL = '/docs/icerpc-core';

export interface SideBarLink {
  title: string;
  path: string;
}

export interface SideBarCategory {
  title: string;
  links: SideBarLink[];
}

export function isCategory(
  source: SideBarSourceType
): source is SideBarCategory {
  //magic happens here
  return (<SideBarCategory>source).links !== undefined;
}

export type SideBarSourceType = SideBarCategory | SideBarLink;
