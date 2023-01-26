// Copyright (c) ZeroC, Inc. All rights reserved.

import { createContext, useContext, useEffect, useState } from 'react';
import { SliceVersion, Platform } from 'types';

const AppContext = createContext([]);

export function AppWrapper({ children }) {
  const [version, setVersion] = useState(SliceVersion.Slice2);
  const [platform, setPlatform] = useState(Platform.csharp);

  useEffect(() => {
    const platform: Platform = JSON.parse(localStorage.getItem('platform'));
    const version: SliceVersion = JSON.parse(
      localStorage.getItem('slice-version')
    );
    platform && setPlatform(platform);
    version && setVersion(version);
  }, []);

  useEffect(() => {
    localStorage.setItem('slice-version', JSON.stringify(version));
    localStorage.setItem('platform', JSON.stringify(platform));
  }, [version, platform]);

  return (
    <AppContext.Provider value={[version, setVersion, platform, setPlatform]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
