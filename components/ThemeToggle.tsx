import { DarkModeSwitch } from 'react-toggle-dark-mode';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="container"
      onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
      style={{
        background: theme == 'light' ? 'rgb(235, 236, 240)' : 'rgb(65,71,85)'
      }}
    >
      <DarkModeSwitch
        checked={theme === 'dark'}
        onChange={() => setTheme('light')}
        size={20}
      />
      {resolvedTheme == 'dark' ? 'Dark mode' : 'Light mode'}
      <style jsx>
        {`
          .container {
            width: 110px;
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            padding: 0.4rem;
            margin: 0;
            border-radius: 5px;
            justify-content: center;
            align-items: center;
            border: none;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.2s ease;
          }
        `}
      </style>
    </button>
  );
}
