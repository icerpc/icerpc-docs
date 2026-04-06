// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'types';
import { usePathname } from 'next/navigation';

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
  const [platform, setPlatform] = useState<Platform>(Platform.csharp);

  const path = usePathname();

  useEffect(() => {
    // Get the platform string from local storage if it exists
    const localPlatformString = localStorage.getItem('platform') || null;

    // If the platform exists in local storage, parse it and set it as the current platform
    const localPlatform: Platform | null = localPlatformString
      ? tryParseJSON(localPlatformString)
      : null;

    if (localPlatform) {
      setPlatform(localPlatform);
    }
  }, [path]);

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
