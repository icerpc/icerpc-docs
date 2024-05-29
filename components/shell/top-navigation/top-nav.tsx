// Copyright (c) ZeroC, Inc.

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MobileMenu } from './mobile-menu';
import { MobileSideNav } from '@/components/shell/side-navigation/mobile-side-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import logoIcon from 'public/icerpc-logo.svg';
import { TopNavigationItems } from './top-nav-items';
import { Button } from '@/components/ui/button';
import { SearchButton } from '@/components/shell/search-button';

export const TopNav = () => (
  <div
    className={clsx(
      'fixed top-0 z-10 flex w-full flex-col justify-center border-b border-lightBorder bg-[#FCFCFC]',
      'dark:border-darkBorder/60 dark:bg-dark'
    )}
  >
    <div
      id="main-nav"
      className="flex w-full flex-col items-center justify-center"
    >
      <div className="w-full max-w-[100rem] ">
        <div className="flex h-[3.75rem] w-full grow  items-center justify-between text-sm">
          <Logo />
          <div className="hidden items-center lg:flex">
            <SearchButton className="w-full min-w-[300px]" />
            <div className="mx-6 flex h-[30px] items-center border-l border-lightBorder pl-4 dark:border-darkBorder">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                className="border-none hover:bg-zinc-100 focus-visible:border-0 focus-visible:!outline-none focus-visible:ring-transparent dark:!outline-none dark:hover:bg-darkAccent dark:focus-visible:!border-0"
              >
                <a
                  className="flex h-full items-center justify-center p-4 dark:text-[rgba(255,255,255,0.8)] "
                  href="https://github.com/icerpc"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <FontAwesomeIcon icon={faGithub} className="size-5" />
                </a>
              </Button>
            </div>
          </div>
          <MobileMenu />
        </div>
        <div className="flex w-full grow items-start   justify-between text-sm lg:h-[2.65rem]">
          <nav className="my-1 hidden items-center lg:flex">
            <ul className="flex space-x-4 lg:ml-[1.9rem]">
              <TopNavigationItems />
            </ul>
          </nav>
        </div>
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
