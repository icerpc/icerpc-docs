// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Encoding, Platform } from 'types';

type EncodingContextType = {
  encoding: Encoding;
  setEncoding: (encoding: Encoding) => void;
};
type PlatformContextType = {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
};

const EncodingContext = createContext<EncodingContextType>({
  encoding: Encoding.Slice2,
  setEncoding: () => {}
});
const PlatformContext = createContext<PlatformContextType>({
  platform: Platform.csharp,
  setPlatform: () => {}
});

type Props = {
  children: ReactNode;
}

export function AppWrapper({ children }: Props) {
  const [encoding, setEncoding] = useState<Encoding>(Encoding.Slice2);
  const [platform, setPlatform] = useState<Platform>(Platform.csharp);

  useEffect(() => {
    // Get the platform and encoding from local storage if it exists
    const localPlatform = localStorage.getItem('platform');
    const localEncoding = localStorage.getItem('encoding');

    // If the platform and encoding exist in local storage, parse them and set them as the current platform and encoding
    const platform: Platform | null = localPlatform
      ? JSON.parse(localPlatform)
      : null;
    const encoding: Encoding | null = localEncoding
      ? JSON.parse(localEncoding)
      : null;

    platform && setPlatform(platform);
    encoding && setEncoding(encoding);
  }, []);

  useEffect(() => {
    // Set the platform and encoding in local storage when they change
    localStorage.setItem('encoding', JSON.stringify(encoding));
    localStorage.setItem('platform', JSON.stringify(platform));
  }, [encoding, platform]);

  return (
    <EncodingContext.Provider
      value={{ encoding: encoding, setEncoding: setEncoding }}
    >
      <PlatformContext.Provider value={{ platform, setPlatform }}>
        {children}
      </PlatformContext.Provider>
    </EncodingContext.Provider>
  );
}

export const useEncoding = (): EncodingContextType => {
  return useContext(EncodingContext);
};

export const usePlatform = (): PlatformContextType => {
  return useContext(PlatformContext);
};
