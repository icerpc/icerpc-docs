// Copyright (c) ZeroC, Inc.

'use client';

import { useMode } from '@/context/state';
import { ReactNode, useEffect } from 'react';
import { Mode } from '@/types';

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
  const contentRendered = mode === currentMode;

  useEffect(() => {
    if (contentRendered && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [contentRendered]);

  return mode == currentMode ? <>{children}</> : null;
};
