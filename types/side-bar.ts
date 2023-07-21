// Copyright (c) ZeroC, Inc.

export const SLICE1_BASE_URL = '/slice1';
export const SLICE2_BASE_URL = '/slice2';
export const GETTING_STARTED_BASE_URL = '/getting-started';
export const ICERPC_BASE_URL = '/icerpc';
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
