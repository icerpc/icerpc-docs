// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { SliceVersion, Platform } from 'types';

type VersionContextType = {
  version: SliceVersion;
  setVersion: (version: SliceVersion) => void;
};
type PlatformContextType = {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
};

const VersionContext = createContext<VersionContextType>({
  version: SliceVersion.Slice2,
  setVersion: () => {}
});
const PlatformContext = createContext<PlatformContextType>({
  platform: Platform.csharp,
  setPlatform: () => {}
});

type Props = {
  children: ReactNode;
};

export function AppWrapper({ children }: Props) {
  const [version, setVersion] = useState<SliceVersion>(SliceVersion.Slice2);
  const [platform, setPlatform] = useState<Platform>(Platform.csharp);

  useEffect(() => {
    // Get the platform and version from local storage if it exists
    const localPlatform = localStorage.getItem('platform');
    const localVersion = localStorage.getItem('slice-version');

    // If the platform and version exist in local storage, parse them and set them as the current platform and version
    const platform: Platform | null = localPlatform
      ? JSON.parse(localPlatform)
      : null;
    const version: SliceVersion | null = localVersion
      ? JSON.parse(localVersion)
      : null;

    platform && setPlatform(platform);
    version && setVersion(version);
  }, []);

  useEffect(() => {
    // Set the platform and version in local storage when they change
    localStorage.setItem('slice-version', JSON.stringify(version));
    localStorage.setItem('platform', JSON.stringify(platform));
  }, [version, platform]);

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      <PlatformContext.Provider value={{ platform, setPlatform }}>
        {children}
      </PlatformContext.Provider>
    </VersionContext.Provider>
  );
}

export const useVersionContext = (): VersionContextType => {
  return useContext(VersionContext);
};

export const usePlatformContext = (): PlatformContextType => {
  return useContext(PlatformContext);
};
