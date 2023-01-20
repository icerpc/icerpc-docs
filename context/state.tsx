// Copyright (c) ZeroC, Inc. All rights reserved.

import { createContext, useContext, useEffect, useState } from 'react';
import { SliceVersion } from '../types/slice-version.d';

const AppContext = createContext([]);

export function AppWrapper({ children }) {
  const [sliceVersion, setSliceVersion] = useState(SliceVersion.Slice2);

  useEffect(() => {
    const sliceVersion = JSON.parse(localStorage.getItem('slice-version'));
    if (sliceVersion) {
      setSliceVersion(sliceVersion);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('slice-version', JSON.stringify(sliceVersion));
  }, [sliceVersion]);

  return (
    <AppContext.Provider value={[sliceVersion, setSliceVersion]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
