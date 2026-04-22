// Copyright (c) ZeroC, Inc.

'use client';

import React from 'react';
import { Platform, Platforms } from '@/types';
import { usePlatform } from '@/context/state';
import { clsx } from 'clsx';

export const LanguageContext = React.createContext<Platform | null>(null);

export const LanguageSelector = () => {
  const { platform, setPlatform } = usePlatform();
  const currentTab = [Platform.csharp, Platform.rust].includes(platform)
    ? platform
    : Platform.csharp;

  return (
    <LanguageContext.Provider value={currentTab}>
      <ul className="flex flex-row items-center">
        {Platforms.map((label) => (
          <li key={label}>
            <button
              className={clsx(
                'my-0 block rounded-xl border-[1.5px] bg-white px-2 py-1 font-medium uppercase',
                'text-sm leading-tight focus:ring-0 focus:outline-hidden md:mr-2',
                currentTab === label
                  ? 'border-primary text-primary bg-white'
                  : 'hover:text-primary bg-slate-50 text-slate-500 hover:bg-white/80'
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
