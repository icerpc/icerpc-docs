// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Mode, Platform } from 'types';

type ModeContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};
type PlatformContextType = {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
};

const ModeContext = createContext<ModeContextType>({
  mode: Mode.Slice2,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMode: () => {}
});
const PlatformContext = createContext<PlatformContextType>({
  platform: Platform.csharp,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPlatform: () => {}
});

type Props = {
  children: ReactNode;
};

export function AppWrapper({ children }: Props) {
  const [mode, setMode] = useState<Mode>(Mode.Slice2);
  const [platform, setPlatform] = useState<Platform>(Platform.csharp);

  useEffect(() => {
    // Get the platform and mode from local storage if it exists
    const localPlatform = localStorage.getItem('platform');
    const localMode = localStorage.getItem('mode');

    // If the platform and mode exist in local storage, parse them and set them as the current platform and mode
    const platform: Platform | null = localPlatform
      ? JSON.parse(localPlatform)
      : null;
    const mode: Mode | null = localMode ? JSON.parse(localMode) : null;

    platform && setPlatform(platform);
    mode && setMode(mode);
  }, []);

  useEffect(() => {
    // Set the platform and mode in local storage when they change
    localStorage.setItem('mode', JSON.stringify(mode));
    localStorage.setItem('platform', JSON.stringify(platform));
  }, [mode, platform]);

  return (
    <ModeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <PlatformContext.Provider value={{ platform, setPlatform }}>
        {children}
      </PlatformContext.Provider>
    </ModeContext.Provider>
  );
}

// Custom hook to handle setting and observing the mode
export const useMode = (): ModeContextType => {
  return useContext(ModeContext);
};

// Custom hook to handle setting and observing the platform
export const usePlatform = (): PlatformContextType => {
  return useContext(PlatformContext);
};

// Custom hook to handle component mounting
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
