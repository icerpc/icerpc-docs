// Copyright (c) ZeroC, Inc.

import { Encoding, SideBarSourceType, isCategory, isLink } from 'types';
import {
  slice1Data,
  slice2Data,
  rpcCoreData,
  gettingStartedData,
  iceRpcForIceUsersData
} from './index';

const SLICE_BASE_URL = '/docs/slice';
const RPC_CORE_BASE_URL = '/docs/icerpc-core';
const GETTING_STARTED_BASE_URL = '/docs/getting-started';
const RPC_FOR_ICE_BASE_URL = '/docs/icerpc-for-ice-users';

export const baseUrls = [
  SLICE_BASE_URL,
  RPC_CORE_BASE_URL,
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
    case SLICE_BASE_URL:
      return 'Slice';
    case RPC_CORE_BASE_URL:
      return 'IceRPC Core';
    case RPC_FOR_ICE_BASE_URL:
      return 'IceRPC for Ice Users';
    default:
      return '';
  }
};

export const sideBarData = (
  baseUrl: string,
  encoding: Encoding
): SideBarSourceType[] => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return gettingStartedData;
    case SLICE_BASE_URL:
      switch (encoding) {
        case Encoding.Slice1:
          return slice1Data;
        case Encoding.Slice2:
          return slice2Data;
        default:
          return [];
      }
    case RPC_CORE_BASE_URL:
      return rpcCoreData;
    case RPC_FOR_ICE_BASE_URL:
      return iceRpcForIceUsersData;
    default:
      return [];
  }
};
