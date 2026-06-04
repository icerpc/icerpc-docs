// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore
} from 'react';
import { Platform } from '@/types';

type PlatformContextType = {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
};

type Props = {
  children: ReactNode;
  path: string;
};

// Contexts for the platform and path
const PathContext = createContext<string | null>(null);

const PlatformContext = createContext<PlatformContextType>({
  platform: Platform.csharp,
  setPlatform: () => {}
});

export function AppWrapper({ children }: { children: ReactNode }) {
  const [platform, setPlatform] = useState<Platform>(() => {
    if (typeof window === 'undefined') return Platform.csharp;
    const stored = localStorage.getItem('platform');
    return (stored && tryParseJSON(stored)) || Platform.csharp;
  });

  useEffect(() => {
    // Set the platform in local storage when it changes
    localStorage.setItem('platform', JSON.stringify(platform));
  }, [platform]);

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
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

// Custom hook to handle setting and observing the platform
export const usePlatform = (): PlatformContextType => {
  return useContext(PlatformContext);
};

// Custom hook to handle component mounting
export const useMounted = () => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
};

function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
