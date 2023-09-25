// Copyright (c) ZeroC, Inc.

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Theme } from 'types';
import logoIcon from 'public/Icerpc-logo.svg';

export const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [background, setBackground] = useState<any>();

  useEffect(() => {
    if (resolvedTheme === Theme.Dark) {
      setBackground({
        backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)
    `,
        backgroundSize: '16px 16px',
        backgroundRepeat: 'repeat'
      });
    } else {
      setBackground({
        background: `
            radial-gradient(circle at center, rgba(250, 250, 250, 0) 55%, rgba(250, 250, 250, 1) 100%),
            url('/hero-no-grid.png') no-repeat center top
        `,
        backgroundSize: 'cover'
      });
    }
  }, [resolvedTheme]);

  return (
    <div
      className="relative flex w-full max-w-[52rem] flex-col items-center space-y-2 border-b border-b-lightBorder py-10 dark:border-b-darkBorder dark:bg-transparent sm:mx-6 md:mx-10 lg:mx-16"
      style={background}
    >
      <div className="mb-1 flex items-center justify-center rounded-full p-4">
        <Image
          src={logoIcon}
          height={75}
          alt="IceRPC Logo"
          className="aspect-square"
        />
      </div>
      <h2 className="bg-gradient-to-b from-slate-800 to-black bg-clip-text pb-4 text-center text-[40px] font-extrabold dark:bg-none dark:text-white">
        IceRPC Documentation
      </h2>
    </div>
  );
};
