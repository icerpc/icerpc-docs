// Copyright (c) ZeroC, Inc. All rights reserved.

import React, { useEffect } from 'react';
import { Platform, Platforms } from 'types';
import { useAppContext } from 'context/state';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const LanguageContext = React.createContext([]);

// eslint-disable-next-line no-unused-vars
export function LanguageSelector({ languages }) {
  const [, , platform, setPlatform] = useAppContext();
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
        setCurrentTab(platform.csharp);
        break;
    }
  }, [platform]);

  return (
    <LanguageContext.Provider value={currentTab as any}>
      <ul role="tablist" className="flex flex-row items-center">
        {Platforms.map((label) => (
          <li key={label}>
            <button
              className={classNames(
                'nav-link my-0 block rounded border-[1.5px] bg-white px-2 py-1 text-xs font-medium uppercase',
                'text-sm leading-tight focus:outline-none focus:ring-0 md:mr-2',
                currentTab === label
                  ? 'border-2 border-primary bg-slate-100 text-primary'
                  : 'bg-slate-100 text-slate-500 hover:bg-opacity-80 hover:text-primary'
              )}
              role="tab"
              aria-selected={label === currentTab}
              onClick={() => {
                setPlatform(label.toLowerCase());
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </LanguageContext.Provider>
  );
}
