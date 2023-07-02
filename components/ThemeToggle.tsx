// Copyright (c) ZeroC, Inc.

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';
import { useMounted } from 'context/state';
import { Theme } from 'types';

export const ThemeToggle = () => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return (
    <button
      className="flex cursor-pointer justify-center p-4"
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
      style={{ background: 'transparent' }}
    >
      <DarkModeSwitch
        checked={theme === Theme.Dark}
        onChange={toggleTheme}
        size={20}
        sunColor="#4D5562"
      />
    </button>
  );
};
