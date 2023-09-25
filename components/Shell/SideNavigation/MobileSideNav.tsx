// Copyright (c) ZeroC, Inc.

'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { sideBarData, baseUrls } from 'data';
import { SliceSelector } from '../../SliceSelector';
import clsx from 'clsx';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getBreadcrumbs } from 'lib/breadcrumbs';
import { SideNavList } from './SideNavList';
import { usePath } from 'context/state';

export function MobileSideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePath();

  // Clean up path
  const pathNoFragment = path.split('#')[0]; // Remove fragment
  const pathSegments = pathNoFragment.split('/'); // Split into segments
  const baseUrl = baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? ''; // Get base url

  // Sidebar data
  const breadcrumbs = getBreadcrumbs(path);
  const data = sideBarData(baseUrl);
  const cells = data.map((item, index) => (
    <SideNavList
      key={index}
      data={item}
      path={path}
      onClick={() => closeModal()}
    />
  ));

  function closeModal() {
    setIsOpen(false);
  }

  // If on home page / return nothing
  if (path === '/') return null;

  const isSlicePage = ['/slice1', '/slice2'].includes(baseUrl);

  return (
    <>
      <div className="flex h-[57px] items-center justify-start border-t border-lightBorder p-4 text-sm dark:border-darkBorder lg:hidden">
        <button>
          <Bars3Icon
            className="ml-1 block h-5 w-5 text-slate-500 dark:text-white/80"
            aria-hidden="true"
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>
        <ol className="ml-4 flex min-w-0 whitespace-nowrap">
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.href}
              className={clsx(
                index !== breadcrumbs.length - 1
                  ? 'flex items-center'
                  : 'truncate'
              )}
            >
              <Link
                href={breadcrumb.href}
                className={clsx(
                  index !== breadcrumbs.length - 1
                    ? 'text-slate-500 dark:text-white/80'
                    : 'font-semibold text-black dark:text-white'
                )}
              >
                {breadcrumb.name}
              </Link>
              {index !== breadcrumbs.length - 1 && (
                <ChevronRightIcon
                  className="mx-2 block h-4 w-4 text-slate-500 "
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
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
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="-left-[300px]"
              enterTo="left-0"
              leave="ease-in duration-200"
              leaveFrom="left-0"
              leaveTo="-left-[300px]"
            >
              <div className="fixed left-0 top-0 h-full w-full max-w-[280px] rounded-r bg-white p-0 font-semibold text-slate-900 shadow-lg dark:bg-[#26282c]">
                <Dialog.Panel className="h-full w-full overflow-hidden rounded-r text-left align-middle text-sm font-bold shadow-xl transition-all">
                  <div className="flex h-full w-full flex-col items-start">
                    <section id="controls" className="mt-2 pl-6">
                      <div className="flex flex-row justify-end">
                        <button
                          type="button"
                          className={clsx(
                            'group ml-auto mt-4 items-center justify-center rounded-full border border-transparent bg-slate-300/40 px-[14px] py-2 font-medium',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          )}
                          onClick={closeModal}
                        >
                          <XMarkIcon
                            className="block h-5 w-5 group-hover:text-slate-500 dark:group-hover:text-slate-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div className="mt-6">
                        {isSlicePage && <SliceSelector />}
                      </div>
                    </section>
                    <nav
                      className={clsx(
                        'block h-full w-full overflow-y-auto',
                        'bg-none pb-10 pl-6 pr-3 pt-4'
                      )}
                    >
                      <div className="pointer-events-none sticky top-0" />
                      <ul className="mx-2">{cells}</ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
