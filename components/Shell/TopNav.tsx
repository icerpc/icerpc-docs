// Copyright (c) ZeroC, Inc.

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SearchButton } from 'components/Shell/SearchButton';
import { ThemeToggle } from 'components/ThemeToggle';
import { clsx } from 'clsx';
import Image from 'next/image';

import lightIcon from 'public/images/Light-Icon.svg';
import darkIcon from 'public/images/Dark-Icon.svg';
import { useTheme } from 'next-themes';

interface LogoProps {
  resolvedTheme?: string;
}

const Logo = ({ resolvedTheme }: LogoProps) => {
  return (
    <div className="ml-6 mr-0 mt-4 mb-3 flex items-center justify-start gap-1 pb-4">
      <Image
        src={resolvedTheme === 'dark' ? darkIcon : lightIcon}
        height={30}
        alt="ZeroC Logo"
      />
      <div className="pt-[8px] text-xl font-bold text-black dark:text-white">
        Docs
      </div>
    </div>
  );
};

export const TopNav = () => {
  const pathname = useRouter().pathname;
  const { resolvedTheme } = useTheme();

  return (
    <nav
      className={clsx(
        'fixed top-0 z-10 flex h-[3.75rem] w-full justify-center border border-t-0 border-lightBorder dark:backdrop-blur',
        'bg-[#FCFCFC] text-sm font-medium  dark:border-darkBorder dark:bg-transparent'
      )}
    >
      <div className="flex w-full max-w-[98rem] items-center justify-between">
        <Logo resolvedTheme={resolvedTheme} />
        <div className=" hidden flex-1 items-start sm:flex">
          <SearchButton />
        </div>
        <div className="mr-0 hidden h-1/2 items-center justify-end gap-2 space-x-8 sm:flex hover:[&>a]:text-primary">
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
            href="/docs/icerpc-core"
            className={
              pathname.startsWith('/docs/icerpc-core')
                ? 'text-primary underline decoration-2 underline-offset-[1.5rem] opacity-100'
                : 'dark:text-[rgba(255,255,255,0.8)]'
            }
          >
            IceRPC Core
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

          <div className="flex items-center gap-5 pr-8 pl-0">
            <div className="left-1/2 h-[calc(65px-40px)] border-l-[1.5px] border-lightBorder dark:border-darkBorder" />
            <ThemeToggle />
            <a
              className="hover:text-primary dark:text-[rgba(255,255,255,0.8)]"
              href="https://github.com/zeroc-ice"
              aria-label="Github"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
