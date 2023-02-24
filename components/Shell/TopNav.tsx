// Copyright (c) ZeroC, Inc.

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SearchButton } from 'components/Shell/SearchButton';
import { ThemeToggle } from 'components/ThemeToggle';
import { clsx } from 'clsx';

export const TopNav = () => {
  const pathname = useRouter().pathname;
  return (
    <nav
      className={clsx(
        'sticky top-0 z-10 flex h-16 w-full border-b border-l border-lightBorder dark:backdrop-blur',
        'bg-[#FCFCFC] text-sm font-medium  dark:border-darkBorder dark:bg-transparent'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 items-start">
          <SearchButton />
        </div>
        <div className="mr-0 flex h-1/2 items-center justify-end gap-10 pr-8 hover:[&>a]:text-primary">
          <Link
            href="/"
            className={
              pathname == '/'
                ? 'text-primary underline decoration-2 underline-offset-[1.5rem] opacity-100'
                : 'dark:text-[rgba(255,255,255,0.8)]'
            }
          >
            Home
          </Link>
          <Link
            href="/docs/getting-started"
            className={
              pathname.startsWith('/docs/getting-started')
                ? 'text-primary underline decoration-2 underline-offset-[1.5rem] opacity-100'
                : 'dark:text-[rgba(255,255,255,0.8)]'
            }
          >
            Getting Started
          </Link>
          <Link
            href="/docs/slice"
            className={
              pathname.startsWith('/docs/slice')
                ? 'text-primary underline decoration-2 underline-offset-[1.5rem] opacity-100'
                : 'dark:text-[rgba(255,255,255,0.8)]'
            }
          >
            Slice
          </Link>
          <Link
            href="/docs/icerpc-core"
            className={
              pathname.startsWith('/docs/icerpc-core')
                ? 'text-primary underline decoration-2 underline-offset-[1.5rem] opacity-100'
                : 'dark:text-[rgba(255,255,255,0.8)]'
            }
          >
            IceRPC Core
          </Link>
          <div className="flex items-center gap-5 pl-4">
            <div className="left-1/2 h-[calc(65px-40px)] border-l-[1.5px] border-lightBorder dark:border-darkBorder" />
            <ThemeToggle />
            <a
              className="hover:text-primary dark:text-[rgba(255,255,255,0.8)]"
              href="https://github.com/zeroc-ice"
              aria-label="Github"
            >
              <FaGithub size={20} />
            </a>
            <a
              className="hover:text-primary dark:text-[rgba(255,255,255,0.8)]"
              href="https://twitter.com/zeroc"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
