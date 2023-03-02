// Copyright (c) ZeroC, Inc.

import { useVersionContext } from 'context/state';
import React, { useEffect, ReactNode } from 'react';
import { SliceVersion } from 'types';

interface Props {
  version: SliceVersion;
  children: ReactNode;
}

export const VersionSection = ({ version: sliceVersion, children }: Props) => {
  if (!Object.values(SliceVersion).includes(sliceVersion)) {
    throw new Error(
      `Invalid slice version '${sliceVersion}'. The version must be one of the following options: ${Object.values(
        SliceVersion
      )}`
    );
  }

  const { version } = useVersionContext();
  const [currentTab, setCurrentTab] = React.useState(version);

  useEffect(() => {
    switch (version) {
      case SliceVersion.Slice1:
        setCurrentTab(version);
        break;
      case SliceVersion.Slice2:
        setCurrentTab(version);
        break;
    }
  }, [version]);

  return sliceVersion == currentTab ? children : null;
};
