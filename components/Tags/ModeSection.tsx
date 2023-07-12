// Copyright (c) ZeroC, Inc.

import { useMode } from 'context/state';
import React, { useEffect, ReactNode } from 'react';
import { Mode } from 'types';

type Props = {
  mode: Mode;
  children: ReactNode;
};

export const ModeSection = ({ mode, children }: Props) => {
  if (!Object.values(Mode).includes(mode)) {
    throw new Error(
      `Invalid slice mode '${mode}'. The mode must be one of the following options: ${Object.values(
        Mode
      )}`
    );
  }

  const { mode: currentMode } = useMode();
  const [currentTab, setCurrentTab] = React.useState(currentMode);

  useEffect(() => {
    switch (currentMode) {
      case Mode.Slice1:
        setCurrentTab(currentMode);
        break;
      case Mode.Slice2:
        setCurrentTab(currentMode);
        break;
    }
  }, [currentMode]);

  return mode == currentTab ? <>{children}</> : null;
};
