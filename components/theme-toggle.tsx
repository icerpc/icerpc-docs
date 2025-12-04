// Copyright (c) ZeroC, Inc.

'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Theme } from '@/types';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme as Theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="dark:hover:bg-dark-accent border-none hover:bg-zinc-100 focus-visible:border-0 focus-visible:ring-transparent focus-visible:outline-hidden! dark:outline-hidden! dark:focus-visible:border-0! dark:focus-visible:ring-0!"
        >
          <Sun className="size-[1.2rem] scale-100 rotate-0 ring-0 ring-offset-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-light-border! dark:border-dark-border! dark:bg-dark! bg-white! dark:text-white!"
        align="end"
      >
        <DropdownMenuItem
          className={clsx(
            'dark:hover:bg-dark-accent hover:bg-zinc-100',
            currentTheme == Theme.Light && 'font-bold'
          )}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={clsx(
            'dark:hover:bg-dark-accent hover:bg-zinc-100',
            currentTheme == Theme.Dark && 'font-bold'
          )}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={clsx(
            'dark:hover:bg-dark-accent hover:bg-zinc-100',
            currentTheme == Theme.System && 'font-bold'
          )}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
