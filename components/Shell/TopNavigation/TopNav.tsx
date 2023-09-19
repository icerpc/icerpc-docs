// Copyright (c) ZeroC, Inc.

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MobileMenu } from './MobileMenu';
import { MobileSideNav } from '../SideNavigation/MobileSideNav';
import { Mode } from 'types';
import { ThemeToggle } from 'components/ThemeToggle';
import { useMode } from 'context/state';
import logoIcon from 'public/Icerpc-logo.svg';
import TopNavigationItem from './TopNavigationItem';

const navigationData = (mode: Mode) => [
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
    href: 'https://docs.icerpc.dev/api/csharp/index.html'
  }
];

export const TopNav = ({ path }: { path: string }) => {
  const { mode } = useMode();
  const data = navigationData(mode);

  return (
    <div
      className={clsx(
        'fixed top-0 z-10 flex w-full flex-col justify-center border-b border-lightBorder bg-[#FCFCFC]',
        'dark:border-darkBorder/60 dark:bg-dark'
      )}
    >
      <div id="main-nav" className="flex w-full justify-center">
        <div className="flex h-[3.75rem] w-full max-w-[100rem] items-center justify-between text-sm">
          <Logo />
          <div className="hidden items-center lg:flex">
            <nav>
              <ul className="flex">
                {data.map((item) => (
                  <TopNavigationItem
                    key={item.href}
                    name={item.name}
                    href={item.href}
                    path={path}
                  />
                ))}
              </ul>
            </nav>
            <div className="mx-6 flex h-[30px] items-center border-l border-lightBorder pl-6 dark:border-darkBorder">
              <ThemeToggle />
              <a
                className="flex h-full items-center justify-center p-4 hover:text-primary dark:text-[rgba(255,255,255,0.8)] "
                href="https://github.com/icerpc"
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
      <MobileSideNav path={path} />
    </div>
  );
};

const Logo = () => (
  <Link href="/">
    <div className="mb-3 ml-[1.3rem] mr-0 mt-5 flex items-center justify-start gap-1 pb-4 lg:ml-[2.6rem]">
      <Image src={logoIcon} height={20} alt="IceRPC Logo" className="mt-2" />
      <div className="ml-1 pt-[8px] text-xl font-bold text-black dark:text-white">
        Docs
      </div>
    </div>
  </Link>
);
