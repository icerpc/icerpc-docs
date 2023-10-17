// Copyright (c) ZeroC, Inc.

import { baseUrls } from 'data';
import { Mode } from 'types';

// Utility function to get the mode from the path

export const getModeFromPath = (path: string) => {
  const pathSegments = path.split('/');
  const modeSegmentWithoutFragment = pathSegments[1].split('#')[0];

  const baseUrl =
    baseUrls.find((item) => item === `/${modeSegmentWithoutFragment}`) ?? '';
  if (baseUrl === '/slice1') {
    return Mode.Slice1;
  } else if (baseUrl === '/slice2') {
    return Mode.Slice2;
  } else {
    return undefined;
  }
};
