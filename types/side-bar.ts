// Copyright (c) ZeroC, Inc.

export const SLICE_BASE_URL = '/slice';
export const GETTING_STARTED_BASE_URL = '/getting-started';
export const RPC_CORE_BASE_URL = '/icerpc-core';
export const ICERPC_FOR_ICE = '/icerpc-for-ice-users';

export interface SideBarLink {
  title: string;
  path: string;
}

export interface SideBarCategory {
  title: string;
  links: (SideBarLink | SideBarDivider)[];
}

export interface SideBarDivider {
  title: string;
}

export function isCategory(
  source: SideBarSourceType
): source is SideBarCategory {
  return (<SideBarCategory>source).links !== undefined;
}

export function isLink(source: SideBarSourceType): source is SideBarLink {
  return (<SideBarLink>source).path !== undefined;
}

export function isDivider(source: SideBarSourceType): source is SideBarDivider {
  return (<SideBarDivider>source).title !== undefined;
}

export type SideBarSourceType = SideBarCategory | SideBarLink | SideBarDivider;
