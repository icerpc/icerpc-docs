// Copyright (c) ZeroC, Inc.

import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import lightIcon from 'public/images/Light-Icon.svg';
import darkIcon from 'public/images/Dark-Icon.svg';
import Image from 'next/image';

import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SearchButton } from 'components/Shell/SearchButton';
import { ThemeToggle } from 'components/ThemeToggle';
import { clsx } from 'clsx';
import { getBreadcrumbs } from 'components/Title';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useTheme } from 'next-themes';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { useVersionContext } from 'context/state';
import { MobileSideNav } from './SideNav';

const navigationItems = [
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

  // useEffect only runs on the client, so now we can safely show the UI
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
  // State
  const [isOpen, setIsOpen] = useState(false);
  const { version } = useVersionContext();
  const pathname = useRouter().pathname;
  const breadcrumbs = getBreadcrumbs(pathname, version);

  function closeModal() {
    setIsOpen(false);
  }

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
    <>
      <div
        className={clsx(
          'fixed top-0 z-10 flex w-full flex-col justify-center border border-t-0 border-lightBorder bg-[#FCFCFC]',
          'dark:border-darkBorder dark:bg-transparent dark:backdrop-blur'
        )}
      >
        <Disclosure
          as="nav"
          id="navbar"
          className={clsx(
            'flex h-[3.75rem] w-full justify-center text-sm font-medium'
          )}
        >
          <div className="flex w-full max-w-[98rem] items-center justify-between">
            <Logo />
            <div className=" hidden flex-1 items-start lg:flex">
              <SearchButton />
            </div>
            <div className="mr-8 hidden h-1/2 items-center justify-end space-x-8 lg:flex hover:[&>a]:text-primary">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'overflow-hidden whitespace-nowrap px-2',
                    linkStyle(pathname, item.href)
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-[calc(65px-40px)] border-l-[1px] border-lightBorder dark:border-darkBorder" />
              <div className="flex items-center justify-center gap-2 ">
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
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </Disclosure>
        <MobileSideNav breadcrumbs={breadcrumbs} path={pathname} />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 delay-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={clsx(
                  'fixed top-4 right-4 w-full max-w-[250px] rounded-xl bg-white p-0 font-semibold text-slate-900 shadow-lg dark:bg-[#26282c]'
                )}
              >
                <Dialog.Panel className="h-full w-full flex-col overflow-hidden rounded text-left align-middle text-sm font-bold shadow-xl transition-all">
                  <button
                    type="button"
                    className={clsx(
                      'group fixed right-4 top-4 justify-center rounded-full border border-transparent bg-slate-300/40 px-[14px] py-2 font-medium',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    )}
                    onClick={closeModal}
                  >
                    <XMarkIcon
                      className="block h-5 w-5 group-hover:text-slate-500 dark:group-hover:text-slate-400"
                      aria-hidden="true"
                    />
                  </button>
                  <ul className="mt-2 block">
                    {navigationItems.map((item) => (
                      <li key={item.name} className="group flex">
                        <Link
                          href={item.href}
                          className={clsx(
                            'grow overflow-hidden whitespace-nowrap px-7 py-4 font-semibold group-hover:text-zinc-900 dark:text-slate-200 dark:hover:text-white'
                          )}
                          onClick={closeModal}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={clsx(
                      'mx-1 flex flex-row items-center justify-between border-t border-lightBorder py-2 pl-6 pr-2',
                      'dark:border-darkBorder dark:text-slate-100 dark:hover:text-white'
                    )}
                  >
                    Switch theme:
                    <ThemeToggle />
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  return (
    <div className="mr-4 flex h-4/6  items-center rounded-full px-4 lg:hidden">
      <div className="mr-0 h-full pt-[1px]">
        <SearchButton />
      </div>
      <button
        className={clsx(
          'inline-flex h-4/6 items-center justify-center rounded-full text-gray-400',
          'hover:bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <EllipsisVerticalIcon className="block h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
};
