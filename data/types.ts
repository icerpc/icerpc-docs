// Copyright (c) ZeroC, Inc. All rights reserved.

export const SLICE_BASE_URL = '/docs/slice';
export const GETTING_STARTED_BASE_URL = '/docs/getting-started';

export type SideBarLink = {
  kind: 'link';
  title: string;
  path: string;
};

export type SideBarCategory = {
  kind: 'category';
  title: string;
  links: SideBarLink[];
};

export type SideBarSourceType = SideBarCategory | SideBarLink;
