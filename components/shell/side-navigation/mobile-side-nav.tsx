// Copyright (c) ZeroC, Inc.

'use client';

import React, { Fragment, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { getBreadcrumbs } from 'lib/breadcrumbs';
import { Mode } from 'types';
import { sideBarData, baseUrls, currentNavItem } from 'data';
import { SideNavList } from './side-nav-list';
import { SliceSelector } from '@/components/slice-selector';
import { useMode } from 'context/state';

export function MobileSideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const { push } = useRouter();
  const { setMode } = useMode();

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

  // If no sidebar data return nothing
  if (data.length === 0) return null;

  const isSlicePage = ['/slice1', '/slice2'].includes(baseUrl);

  return (
    <>
      <div className="flex h-[57px] items-center justify-start border-t border-light-border p-4 text-sm dark:border-dark-border lg:hidden">
        <button>
          <Bars3Icon
            className="ml-1 block size-5 text-slate-500 dark:text-white/80"
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
                  className="mx-2 block size-4 text-slate-500 "
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
              <div className="fixed left-0 top-0 size-full max-w-[280px] rounded-r bg-white p-0 font-semibold text-slate-900 shadow-lg dark:bg-[#26282c]">
                <Dialog.Panel className="size-full overflow-hidden rounded-r text-left align-middle text-sm font-bold shadow-xl transition-all">
                  <div className="flex size-full flex-col items-start">
                    <section id="controls" className="mt-2 w-full px-6">
                      <div className="mt-4 flex flex-row items-center justify-end">
                        <h2 className="px-1">{currentNavItem(baseUrl)}</h2>
                        <button
                          type="button"
                          className={clsx(
                            'group ml-auto items-center justify-center rounded-full border border-transparent bg-slate-300/40 px-[14px] py-2 font-medium',
                            'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          )}
                          onClick={closeModal}
                        >
                          <XMarkIcon
                            className="block size-5 group-hover:text-slate-500 dark:group-hover:text-slate-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      {isSlicePage && (
                        <div className="mt-6">
                          <SliceSelector
                            className="mb-6 mt-3 w-full"
                            onChangeCallback={(mode) => {
                              const [corePath, fragment] = path.split('#');

                              let newPath;
                              if (corePath === '/slice1') {
                                newPath =
                                  mode === Mode.Slice1 ? '/slice1' : '/slice2';
                              } else if (corePath === '/slice2') {
                                newPath =
                                  mode === Mode.Slice1 ? '/slice1' : '/slice2';
                              } else {
                                newPath = corePath.replace(
                                  /\/slice[1-2]\//,
                                  `/slice${mode === Mode.Slice1 ? 1 : 2}/`
                                );
                              }

                              // Append the fragment back, if it exists
                              if (fragment) {
                                newPath = `${newPath}#${fragment}`;
                              }

                              push(newPath);
                              setMode(mode);
                            }}
                          />
                        </div>
                      )}
                      <div className="mt-4 w-full border-t border-light-border dark:border-dark-border" />
                    </section>
                    <nav
                      className={clsx(
                        'block size-full overflow-y-auto',
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
