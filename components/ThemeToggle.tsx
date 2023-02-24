// Copyright (c) ZeroC, Inc.

import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
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
      className="flex w-10 cursor-pointer justify-center"
      aria-label="Toggle Dark Mode"
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
};
