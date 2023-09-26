// Copyright (c) ZeroC, Inc.

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MobileMenu } from './mobile-menu';
import { MobileSideNav } from '@/components/shell/side-navigation/mobile-side-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import logoIcon from 'public/Icerpc-logo.svg';
import { TopNavigationItems } from './top-nav-items';

export const TopNav = () => (
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
              <TopNavigationItems />
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
    <MobileSideNav />
  </div>
);

const Logo = () => (
  <Link href="/">
    <div className="mb-3 ml-[1.3rem] mr-0 mt-5 flex items-center justify-start gap-1 pb-4 lg:ml-[2.6rem]">
      <Image
        src={logoIcon}
        height={20}
        alt="IceRPC Logo"
        className="mt-2"
        priority={true}
      />
      <div className="ml-1 pt-[8px] text-xl font-bold text-black dark:text-white">
        Docs
      </div>
    </div>
  </Link>
);
