// Copyright (c) ZeroC, Inc.

import {
  SideBarSourceType,
  isCategory,
  isLink,
  SLICE1_BASE_URL,
  SLICE2_BASE_URL
} from 'types';
import {
  slice1Data,
  slice2Data,
  rpcCoreData,
  gettingStartedData,
  iceRpcForIceUsersData
} from './index';

const RPC_BASE_URL = '/icerpc';
const GETTING_STARTED_BASE_URL = '/getting-started';
const RPC_FOR_ICE_BASE_URL = '/icerpc-for-ice-users';

export const baseUrls = [
  SLICE1_BASE_URL,
  SLICE2_BASE_URL,
  RPC_BASE_URL,
  GETTING_STARTED_BASE_URL,
  RPC_FOR_ICE_BASE_URL
];

export const flattenSideBarData = (
  sideBarData: SideBarSourceType[]
): SideBarSourceType[] => {
  return sideBarData.flatMap((item) => {
    if (isCategory(item)) {
      return item.links;
    } else if (isLink(item)) {
      return item;
    } else {
      return [];
    }
  });
};

export const currentNavItem = (baseUrl: string) => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return 'Getting Started';
    case SLICE1_BASE_URL:
    case SLICE2_BASE_URL:
      return 'Slice';
    case RPC_BASE_URL:
      return 'IceRPC';
    case RPC_FOR_ICE_BASE_URL:
      return 'IceRPC for Ice Users';
    default:
      return '';
  }
};

export const sideBarData = (baseUrl: string): SideBarSourceType[] => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return gettingStartedData;
    case SLICE1_BASE_URL:
      return slice1Data;
    case SLICE2_BASE_URL:
      return slice2Data;
    case RPC_BASE_URL:
      return rpcCoreData;
    case RPC_FOR_ICE_BASE_URL:
      return iceRpcForIceUsersData;
    default:
      return [];
  }
};
