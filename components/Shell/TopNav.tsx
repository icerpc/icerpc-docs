// Copyright (c) ZeroC, Inc.

import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SearchButton } from 'components/Shell/SearchButton';
import { ThemeToggle } from 'components/ThemeToggle';
import { clsx } from 'clsx';
import Image from 'next/image';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

import lightIcon from 'public/images/Light-Icon.svg';
import darkIcon from 'public/images/Dark-Icon.svg';
import { useTheme } from 'next-themes';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { Divider } from 'components/Divider';

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
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useRouter().pathname;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
      <Disclosure
        as="nav"
        className={clsx(
          'fixed top-0 z-10 flex h-[3.75rem] w-full justify-center border border-t-0 border-lightBorder dark:backdrop-blur',
          'bg-[#FCFCFC] text-sm font-medium  dark:border-darkBorder dark:bg-transparent'
        )}
      >
        <div className="flex w-full max-w-[98rem] items-center justify-between">
          <Logo />
          <div className=" hidden flex-1 items-start lg:flex">
            <SearchButton />
          </div>
          <div className="mr-0 hidden h-1/2 items-center justify-end gap-2 space-x-8 lg:flex hover:[&>a]:text-primary">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'overflow-hidden whitespace-nowrap',
                  linkStyle(pathname, item.href)
                )}
              >
                {item.name}
              </Link>
            ))}
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
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </Disclosure>
      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="dark:highlight-white/5 fixed top-4 right-4 w-full max-w-xs rounded-lg bg-white p-6 text-base font-semibold text-slate-900 shadow-lg dark:bg-slate-800 dark:text-slate-400">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-full w-full transform overflow-hidden rounded-2xl bg-red-500 text-left align-middle shadow-xl transition-all">
                  <div className="fixed right-0 mt-4 justify-end">
                    <button
                      type="button"
                      className="right-0 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                  </ul>
                  <Divider />
                  <div className="flex justify-center">Reece</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
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
          'inline-flex h-4/6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <EllipsisVerticalIcon className="block h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
};
