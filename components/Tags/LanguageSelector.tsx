// Copyright (c) ZeroC, Inc.

import React, { useEffect } from 'react';
import { Platform, Platforms } from 'types';
import { usePlatform } from 'context/state';
import { clsx } from 'clsx';

export const LanguageContext = React.createContext<Platform | null>(null);

export const LanguageSelector = () => {
  const { platform, setPlatform } = usePlatform();
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
        setCurrentTab(Platform.csharp);
        break;
    }
  }, [platform]);

  return (
    <LanguageContext.Provider value={currentTab}>
      <ul className="flex flex-row items-center">
        {Platforms.map((label) => (
          <li key={label}>
            <button
              className={clsx(
                'my-0 block rounded-xl border-[1.5px] bg-white px-2 py-1 font-medium uppercase',
                'text-sm leading-tight focus:outline-none focus:ring-0 md:mr-2',
                currentTab === label
                  ? 'border-primary bg-white text-primary'
                  : 'bg-slate-50 text-slate-500 hover:bg-white/80 hover:text-primary'
              )}
              role="tab"
              aria-selected={label === currentTab}
              onClick={() => {
                setPlatform(label);
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </LanguageContext.Provider>
  );
};
