// Copyright (c) ZeroC, Inc.

'use client';

import React, { Fragment, useState } from 'react';
import Link from 'next/link';

import { SearchButton } from '@/components/shell/search-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { clsx } from 'clsx';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { useMode } from 'context/state';
import { Mode } from 'types';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="mr-4 flex h-4/6  items-center rounded-full lg:hidden">
      <SearchButton className="h-full w-full pt-[1px] md:mr-6" />
      <button
        className="inline-flex items-center justify-center rounded-full p-1 text-black/60"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <EllipsisVerticalIcon className="block h-7 w-7" aria-hidden="true" />
      </button>
      <TopMenuModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

type TopMenuModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const TopMenuModal = ({ isOpen, closeModal }: TopMenuModalProps) => {
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
      href: 'https://docs.icerpc.dev/api/csharp/index.html'
    }
  ];

  return (
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
                'fixed right-4 top-4 w-full max-w-[250px] rounded-xl bg-white p-0 font-semibold text-slate-900 shadow-lg dark:bg-[#26282c]'
              )}
            >
              <Dialog.Panel className="h-full w-full flex-col overflow-hidden rounded text-left align-middle text-sm font-bold shadow-xl transition-all">
                <button
                  type="button"
                  className={clsx(
                    'group fixed right-4 top-4 justify-center rounded-full border border-transparent bg-slate-300/40 px-[14px] py-2 font-medium'
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
                    'mx-1 flex flex-row items-center justify-between border-t border-lightBorder py-2 pl-6 pr-3 ',
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
  );
};
