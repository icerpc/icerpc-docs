// Copyright (c) ZeroC, Inc. All rights reserved.

import { SliceVersion } from '../types/slice-version';
import { SideBarSourceType } from './types';
import {
  slice1Data,
  slice2Data,
  rpcCoreData,
  gettingStartedData
} from './index';

const SLICE_BASE_URL = '/docs/slice';
const RPC_CORE_BASE_URL = '/docs/rpc';
const GETTING_STARTED_BASE_URL = '/docs/getting-started';

export const baseUrls = [
  SLICE_BASE_URL,
  RPC_CORE_BASE_URL,
  GETTING_STARTED_BASE_URL
];

export const sideBarData = (
  baseUrl: string,
  sliceVersion: SliceVersion
): SideBarSourceType[] => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return gettingStartedData;
    case SLICE_BASE_URL:
      if (sliceVersion === 'Slice1') {
        return slice1Data;
      } else {
        return slice2Data;
      }
    case RPC_CORE_BASE_URL:
      return rpcCoreData;
  }
};
