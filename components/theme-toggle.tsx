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
          className="border-none hover:bg-zinc-100 focus-visible:border-0 focus-visible:outline-hidden! focus-visible:ring-transparent dark:outline-hidden! dark:hover:bg-dark-accent dark:focus-visible:border-0! dark:focus-visible:ring-0!"
        >
          <Sun className="size-[1.2rem] rotate-0 scale-100 ring-0 ring-offset-0 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-light-border! bg-white! dark:border-dark-border! dark:bg-dark! dark:text-white!"
        align="end"
      >
        <DropdownMenuItem
          className={clsx(
            'hover:bg-zinc-100 dark:hover:bg-dark-accent',
            currentTheme == Theme.Light && 'font-bold'
          )}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={clsx(
            'hover:bg-zinc-100 dark:hover:bg-dark-accent',
            currentTheme == Theme.Dark && 'font-bold'
          )}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={clsx(
            'hover:bg-zinc-100 dark:hover:bg-dark-accent',
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
