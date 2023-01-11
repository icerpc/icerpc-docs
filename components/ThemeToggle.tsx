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
      className="container"
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
      <style jsx>
        {`
          .container {
            width: 40px;
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
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
