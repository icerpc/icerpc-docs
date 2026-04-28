// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode } from 'react';
import { Platform } from '@/types';
import { usePlatform } from '@/context/state';

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
  const { platform } = usePlatform();
  const currentTab = [Platform.csharp, Platform.rust].includes(platform)
    ? platform
    : Platform.csharp;

  return language == currentTab ? children : null;
};
