// Copyright (c) ZeroC, Inc.

import { clsx } from 'clsx';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import darkIcon from 'public/Icerpc-dark-logo.svg';
import Image from 'next/image';
import lightIcon from 'public/Icerpc-logo.svg';
import Link from 'next/link';

import { MobileMenu } from './MobileMenu';
import { MobileSideNav } from '../SideNav';
import { ThemeToggle } from 'components/ThemeToggle';
import { useMounted } from 'context/state';

export const navigationItems = [
  {
    name: 'Getting Started',
    href: '/getting-started'
  },
  {
    name: 'IceRPC Core',
    href: '/icerpc-core'
  },
  {
    name: 'Slice',
    href: '/slice'
  },
  {
    name: 'IceRPC for Ice users',
    href: '/icerpc-for-ice-users'
  },
  {
    name: 'API Reference',
    href: 'https://docs.testing.zeroc.com/api/csharp/api/IceRpc.html'
  }
];

export const TopNav = () => {
  const pathname = useRouter().pathname;
  return (
    <div
      className={clsx(
        'fixed top-0 z-10 flex w-full flex-col justify-center border-b border-lightBorder bg-[#FCFCFC]',
        'dark:border-darkBorder dark:bg-black'
      )}
    >
      <div id="main-nav" className="flex w-full justify-center">
        <div className="flex h-[3.75rem] w-full max-w-[100rem] items-center justify-between text-sm font-medium">
          <Logo />
          <div className="hidden items-center lg:flex">
            <nav>
              <ul className="flex gap-x-4">
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
            <div className="mx-6 flex h-[30px] items-center border-l border-lightBorder pl-6 dark:border-darkBorder">
              <ThemeToggle />
              <a
                className="p-4 hover:text-primary dark:text-[rgba(255,255,255,0.8)]"
                href="https://github.com/zeroc-ice"
                target="_blank"
                rel="noopener noreferrer"
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

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  // Default to light icon if theme is not yet resolved because of SSR
  if (!mounted) {
    return <Image src={lightIcon} height={25} alt="ZeroC Logo" />;
  }

  return (
    <Link href="https://web.testing.zeroc.com/icerpc">
      <div className="mb-3 ml-[1.4rem] mr-0 mt-5 flex items-center justify-start gap-1 pb-4 lg:ml-[3rem]">
        <Image
          src={resolvedTheme === Theme.Dark ? darkIcon : lightIcon}
          height={25}
          alt="ZeroC Logo"
          className="mt-2"
        />
        <div className="ml-1 pt-[8px] text-xl font-bold text-black dark:text-white">
          Docs
        </div>
      </div>
    </Link>
  );
};

type TopNavigationItemProps = {
  name: string;
  href: string;
  pathname: string;
};

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
      return 'text-primary dark:text-white underline dark:no-underline decoration-2 underline-offset-[1.5rem] opacity-100 ';
    } else {
      return 'dark:text-[rgba(255,255,255,0.6)]';
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
