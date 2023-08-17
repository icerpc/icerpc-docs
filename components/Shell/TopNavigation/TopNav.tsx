// Copyright (c) ZeroC, Inc.

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MobileMenu } from './MobileMenu';
import { MobileSideNav } from '../SideNav';
import { ThemeToggle } from 'components/ThemeToggle';
import { useMode, useMounted } from 'context/state';
import { Mode, Theme } from 'types';

import darkIcon from 'public/Icerpc-dark-logo.svg';
import lightIcon from 'public/Icerpc-logo.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const TopNav = () => {
  const { mode } = useMode();

  const navigationItems = [
    {
      name: 'Getting Started',
      href: '/getting-started'
    },
    {
      name: 'IceRPC',
      href: '/icerpc'
    },
    {
      name: 'Slice',
      href: mode === Mode.Slice1 ? '/slice1' : '/slice2'
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

  return (
    <div
      className={clsx(
        'fixed top-0 z-10 flex w-full flex-col justify-center border-b border-lightBorder bg-[#FCFCFC]',
        'dark:border-darkBorder/60 dark:bg-black'
      )}
    >
      <div id="main-nav" className="flex w-full justify-center">
        <div className="flex h-[3.75rem] w-full max-w-[100rem] items-center justify-between text-sm">
          <TopLogo />
          <div className="hidden items-center lg:flex">
            <nav>
              <ul className="flex">
                {navigationItems.map((item) => (
                  <TopNavigationItem
                    key={item.href}
                    name={item.name}
                    href={item.href}
                  />
                ))}
              </ul>
            </nav>
            <div className="mx-6 flex h-[30px] items-center border-l border-lightBorder pl-6 dark:border-darkBorder">
              <ThemeToggle />
              <a
                className="flex h-full items-center justify-center p-4 hover:text-primary dark:text-[rgba(255,255,255,0.8)] "
                href="https://github.com/icerpc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
              </a>
            </div>
          </div>
          <MobileMenu />
        </div>
      </div>
      <MobileSideNav />
    </div>
  );
};

const TopLogo = () => (
  <Link href="/">
    <div className="mb-3 ml-[1.3rem] mr-0 mt-5 flex items-center justify-start gap-1 pb-4 lg:ml-[2.6rem]">
      <Logo height={20} className="mt-2" />
      <div className="ml-1 pt-[8px] text-xl font-bold text-black dark:text-white">
        Docs
      </div>
    </div>
  </Link>
);

type LogoProps = {
  height: number;
  className?: string;
};

export const Logo = ({ height, className }: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted();

  // if not mounted, default to light logo
  let logo = lightIcon;

  // once mounted, set the logo according to the resolved theme
  if (isMounted) {
    logo = resolvedTheme === Theme.Dark ? darkIcon : lightIcon;
  }

  return (
    <Image src={logo} height={height} alt="IceRPC Logo" className={className} />
  );
};

type TopNavigationItemProps = {
  name: string;
  href: string;
};

const TopNavigationItem = ({ name, href }: TopNavigationItemProps) => {
  const { asPath, isReady } = useRouter();
  const [path, setPath] = useState(asPath);

  useEffect(() => {
    isReady && setPath(asPath);
  }, [isReady, asPath]);

  const prefetch = href.startsWith('http') ? false : undefined;

  const baseClassName =
    'mx-3 overflow-hidden whitespace-nowrap dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';
  const activeClassName =
    'mx-3 text-primary font-semibold no-underline decoration-2 underline-offset-[1.5rem] opacity-100 dark:text-white hover:!text-primary dark:hover:!text-white';

  const [linkClassName, setLinkClassName] = useState(baseClassName);

  useEffect(() => {
    const isActive = isActivePath(path, href);
    setLinkClassName(clsx(baseClassName, isActive && activeClassName));
  }, [href, path, setLinkClassName]);

  return (
    <li key={href}>
      <Link href={href} className={linkClassName} prefetch={prefetch}>
        {name}
      </Link>
    </li>
  );
};

function isActivePath(path: string, href: string): boolean {
  return (
    path === href ||
    path.startsWith(`${href}/`) ||
    (path.startsWith('/slice') && href === '/slice2')
  );
}
