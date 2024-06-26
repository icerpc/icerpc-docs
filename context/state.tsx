// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { getModeFromPath } from 'utils/modeFromPath';
import { Mode, Platform } from 'types';
import { usePathname } from 'next/navigation';

type ModeContextType = {
  mode?: Mode;
  setMode: (mode: Mode) => void;
};
type PlatformContextType = {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
};
type SearchContextType = {
  mode?: Mode;
  setMode: (mode: Mode) => void;
};

type Props = {
  children: ReactNode;
  path: string;
};

// Contexts for the mode, platform, and path
const PathContext = createContext<string | null>(null);

const ModeContext = createContext<ModeContextType>({
  mode: undefined,
  setMode: () => { }
});

const PlatformContext = createContext<PlatformContextType>({
  platform: Platform.csharp,
  setPlatform: () => { }
});

const SearchContext = createContext<ModeContextType>({
  mode: undefined,
  setMode: () => { }
});

export function AppWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode | undefined>(undefined);
  const [platform, setPlatform] = useState<Platform>(Platform.csharp);
  const [searchMode, setSearchMode] = useState<Mode | undefined>(Mode.Slice2);

  const path = usePathname();

  // Update the search mode when the mode changes
  useEffect(() => {
    setSearchMode(mode);
  }, [mode]);

  useEffect(() => {
    // Get the mode from the path
    const pathMode = getModeFromPath(path);

    // Get the platform and mode strings from local storage if it exists
    const localPlatformString = localStorage.getItem('platform') || null;
    const localModeString = localStorage.getItem('mode') || null;

    // If the platform and mode exist in local storage, parse them and set them as the current platform and mode
    const localPlatform: Platform | null = localPlatformString
      ? tryParseJSON(localPlatformString)
      : null;
    const localMode: Mode | null = localModeString
      ? tryParseJSON(localModeString)
      : null;

    localPlatform && setPlatform(localPlatform);

    // If the path mode exists, set the mode to the path mode
    // Otherwise, if the local mode exists, set the mode to the local mode
    pathMode ? setMode(pathMode) : localMode && setMode(localMode);
  }, [path]);

  useEffect(() => {
    // Set the platform and mode in local storage when they change
    localStorage.setItem('mode', JSON.stringify(mode));
    localStorage.setItem('platform', JSON.stringify(platform));
  }, [mode, platform]);

  return (
    <ModeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <PlatformContext.Provider value={{ platform, setPlatform }}>
        <SearchContext.Provider
          value={{ mode: searchMode, setMode: setSearchMode }}
        >
          {children}
        </SearchContext.Provider>
      </PlatformContext.Provider>
    </ModeContext.Provider>
  );
}

export const PathProvider: React.FC<{ path: string; children: ReactNode }> = ({
  children,
  path
}: Props) => {
  return <PathContext.Provider value={path}>{children}</PathContext.Provider>;
};

// Custom hook to handle observing the path
export const usePath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('usePath must be used within a PathProvider');
  }
  return context;
};

// Custom hook to handle setting and observing the mode
export const useMode = (): ModeContextType => {
  return useContext(ModeContext);
};

// Custom hook to handle setting and observing the platform
export const usePlatform = (): PlatformContextType => {
  return useContext(PlatformContext);
};

// Custom hook to handle setting and observing the search mode
export const useSearch = (): SearchContextType => {
  return useContext(SearchContext);
};

// Custom hook to handle component mounting
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}
