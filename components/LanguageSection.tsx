// Copyright (c) ZeroC, Inc.

import React, { useEffect, ReactNode } from 'react';
import { Platform } from 'types';
import { usePlatformContext } from 'context/state';

type Props = {
  language: Platform;
  children: ReactNode;
};

export const LanguageSection = ({ language, children }: Props) => {
  if (!Object.values(Platform).includes(language)) {
    throw new Error(
      `Invalid language '${language}'. The language must be one of the following options: ${Object.values(
        Platform
      )}`
    );
  }
  const { platform } = usePlatformContext();
  const [currentTab, setCurrentTab] = React.useState(platform);
  useEffect(() => {
    switch (platform) {
      case Platform.csharp:
        setCurrentTab(platform);
        break;
      case Platform.rust:
        setCurrentTab(platform);
        break;
      default:
        setCurrentTab(Platform.csharp);
        break;
    }
  }, [platform]);

  return language == currentTab ? children : null;
};
