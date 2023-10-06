// Copyright (c) ZeroC, Inc.

'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none hover:bg-zinc-100 focus-visible:border-0 focus-visible:!outline-none focus-visible:ring-transparent dark:!outline-none dark:hover:bg-darkAccent dark:focus-visible:!border-0 dark:focus-visible:!ring-0"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 ring-0 ring-offset-0 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="!border-lightBorder !bg-white dark:!border-darkBorder dark:!bg-dark dark:!text-white"
        align="end"
      >
        <DropdownMenuItem
          className="hover:bg-zinc-100 dark:hover:bg-darkAccent"
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-zinc-100 dark:hover:bg-darkAccent"
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-zinc-100 dark:hover:bg-darkAccent"
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
