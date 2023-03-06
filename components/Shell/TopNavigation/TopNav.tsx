// Copyright (c) ZeroC, Inc.

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import lightIcon from 'public/images/Light-Icon.svg';
import darkIcon from 'public/images/Dark-Icon.svg';
import Image from 'next/image';

import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SearchButton } from 'components/Shell/SearchButton';
import { ThemeToggle } from 'components/ThemeToggle';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';
import { MobileSideNav } from '../SideNav';
import { MobileMenu } from './MobileMenu';

export const navigationItems = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Getting Started',
    href: '/docs/getting-started'
  },
  {
    name: 'IceRPC Core',
    href: '/docs/icerpc-core'
  },
  {
    name: 'Slice',
    href: '/docs/slice'
  }
];

const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Link href="/">
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
    </Link>
  );
};

export const TopNav = () => {
  const pathname = useRouter().pathname;

  return (
    <div
      className={clsx(
        'fixed top-0 z-10 flex w-full flex-col justify-center border border-t-0 border-lightBorder bg-[#FCFCFC]',
        'dark:border-darkBorder dark:bg-transparent dark:backdrop-blur'
      )}
    >
      <div id="main-nav" className="flex w-full justify-center">
        <div className="flex h-[3.75rem] w-full max-w-[98rem] items-center justify-between text-sm font-medium">
          <Logo />
          <SearchButton className="hidden flex-1 items-start lg:flex" />
          <div className="hidden items-center lg:flex">
            <nav>
              <ul className="flex gap-x-8">
                {navigationItems.map((item) => (
                  <TopNavigationItem
                    key={item.href}
                    name={item.name}
                    href={item.href}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </nav>
            <div className="ml-6 flex h-[30px] items-center border-l border-slate-200 pl-6 dark:border-slate-800">
              <ThemeToggle />
              <a
                className="p-4 hover:text-primary dark:text-[rgba(255,255,255,0.8)]"
                href="https://github.com/zeroc-ice"
                aria-label="Github"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          <MobileMenu />
        </div>
      </div>
      <MobileSideNav pathname={pathname} />
    </div>
  );
};

interface TopNavigationItemProps {
  name: string;
  href: string;
  pathname: string;
}

const TopNavigationItem = ({
  name,
  href,
  pathname
}: TopNavigationItemProps) => {
  // TODO: Add comments
  function linkStyle(pathname: string, href: string) {
    if (
      (href === '/' && pathname === '/') ||
      (href !== '/' && pathname.startsWith(href))
    ) {
      return 'text-primary underline decoration-2 underline-offset-[1.5rem] opacity-100';
    } else {
      return 'dark:text-[rgba(255,255,255,0.8)]';
    }
  }

  return (
    <li key={href}>
      <Link
        href={href}
        className={clsx(
          'overflow-hidden whitespace-nowrap px-2',
          linkStyle(pathname, href)
        )}
      >
        {name}
      </Link>
    </li>
  );
};
