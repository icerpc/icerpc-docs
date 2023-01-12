// Copyright (c) ZeroC, Inc. All rights reserved.

import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="w-10 flex justify-center cursor-pointer"
      onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
      style={{
        background: 'transparent'
      }}
    >
      <DarkModeSwitch
        checked={theme === 'dark'}
        onChange={() => setTheme('light')}
        size={20}
        sunColor="#4D5562"
      />
    </button>
  );
}
