// Copyright (c) ZeroC, Inc. All rights reserved.

import React, { useEffect } from 'react';
import { Platform } from '../types';
import { useAppContext } from '../context/state';

export function LanguageSection({ language, children }) {
  if (!Object.values(Platform).includes(language)) {
    throw new Error(
      `Invalid language '${language}'. The language must be one of the following options: ${Object.values(
        Platform
      )}`
    );
  }
  const [, , platform] = useAppContext();
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
        setCurrentTab(platform.csharp);
        break;
    }
  }, [platform]);

  return language == currentTab ? children : null;
}
