// Copyright (c) ZeroC, Inc.

import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SliceSelector } from '../SliceSelector';
import { useMode } from 'context/state';
import clsx from 'clsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { sideBarData, baseUrls } from 'data/side-bar-data';
import {
  SideBarDivider,
  SideBarLink,
  SideBarSourceType,
  isCategory,
  isLink
} from 'types';
import { Divider } from 'components/Divider';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getBreadcrumbs } from 'lib/breadcrumbs';
import { SearchButton } from './SearchButton';
import { Breadcrumb } from 'components/Breadcrumbs';

export const SideNav = () => {
  const { asPath, isReady } = useRouter();
  const [path, setPath] = useState(asPath);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (isReady) {
      const path = asPath.split('#')[0];
      setPath(path);

      const pathSegments = path.split('/');
      const baseUrl =
        baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? '';
      setBaseUrl(baseUrl);
    }
  }, [isReady, asPath]);

  const { mode: currentMode } = useMode();
  const [cells, setCells] = useState<React.ReactElement[][]>();

  // Sidebar data
  useEffect(() => {
    const links = sideBarData(baseUrl) ?? [];
    setCells(links.map((item) => transformSideBarData(path, item)));
  }, [path, currentMode, baseUrl]);

  return (
    <div className="sticky top-[59px] hidden h-screen flex-col items-end border-r border-lightBorder dark:border-darkBorder/60 dark:bg-black lg:flex">
      <div className="flex h-full w-full min-w-[300px] max-w-[300px] flex-col justify-start pl-10">
        <SearchButton className="mb-0 mt-8 flex items-start pr-6" />
        {isSlicePage(baseUrl) && (
          <div className="top-0 mb-2 mt-4 bg-none pr-6">
            <SliceSelector />
          </div>
        )}
        <nav
          className={clsx(
            'sticky top-0 ml-[2px] block overflow-y-auto bg-none pb-10 pr-3',
            ['/slice1', '/slice2'].includes(baseUrl)
              ? 'h-[calc(100vh-59px-160px)]'
              : 'h-[calc(100vh-59px-60px)]'
          )}
        >
          <ul className="top-0 mr-2 mt-4">{cells}</ul>
        </nav>
      </div>
    </div>
  );
};

export function MobileSideNav() {
  const { asPath, isReady } = useRouter();
  const [path, setPath] = useState(asPath);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (isReady) {
      const path = asPath.split('#')[0];
      setPath(path);
      setBreadcrumbs(getBreadcrumbs(path));

      const pathSegments = path.split('/');
      const baseUrl =
        baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? '';
      setBaseUrl(baseUrl);
    }
  }, [isReady, asPath]);

  const [isOpen, setIsOpen] = useState(false);
  const { mode: currentMode } = useMode();
  const [cells, setCells] = useState<React.ReactElement[][]>();

  // Sidebar data
  useEffect(() => {
    const links = sideBarData(baseUrl) ?? [];
    setCells(
      links.map((item) =>
        transformSideBarData(path, item, () => setIsOpen(false))
      )
    );
  }, [path, currentMode, baseUrl]);

  function closeModal() {
    setIsOpen(false);
  }

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
              <div
                className={clsx(
                  'fixed left-0 top-0 h-screen w-full max-w-[280px] rounded-r bg-white p-0 font-semibold text-slate-900 shadow-lg dark:bg-[#26282c]'
                )}
              >
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
                        {isSlicePage(baseUrl) && <SliceSelector />}
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

function createListItem(
  path: string,
  link: SideBarLink | SideBarDivider,
  noLeftPadding = false,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined
): React.ReactElement {
  const leftPadding = noLeftPadding ? 'ml-0' : 'ml-3';

  if (isLink(link)) {
    const isCurrentPage = path === link.path.replace(/\/$/, '');
    return (
      <li key={link.path} className="flex">
        <Link
          href={link.path}
          className={clsx(
            `py-[6px] pl-0 pr-3 text-sm no-underline  ${leftPadding} dark:text-[#C4C7C5]`,
            isCurrentPage
              ? noLeftPadding
                ? 'font-bold text-primary dark:text-white'
                : 'ml-[-3px] border-l-[1.5px] border-primary pl-[13.5px] font-bold text-primary dark:border-white/80 dark:text-white'
              : 'hover:text-zinc-900 dark:hover:text-white'
          )}
          onClick={onClick}
        >
          {link.title}
        </Link>
      </li>
    );
  } else {
    return (
      <li key={link.title} className={clsx('my-2 pl-0 pr-2', leftPadding)}>
        <h2 className="text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          {link.title}
        </h2>
      </li>
    );
  }
}

function transformSideBarData(
  path: string,
  data: SideBarSourceType,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined = undefined
): React.ReactElement[] {
  if (isCategory(data)) {
    const category = data;
    return [
      <li key="category">
        <ul>
          <li key={category.title} className="list-none">
            <h2 className="my-[10px] text-sm font-semibold dark:text-white">
              {category.title}
            </h2>
          </li>
          <li key={`${category.title}-content`} className="list-none">
            <ul
              key={category.title + '-list'}
              className="ml-[0.1rem] border-l-[1.5px] border-lightBorder pl-[0.1rem] dark:border-[#3D3D3D]"
            >
              {category.links.map((link) =>
                createListItem(path, link, false, onClick)
              )}
            </ul>
          </li>
        </ul>
      </li>
    ];
  } else if (isLink(data)) {
    return [createListItem(path, data, true, onClick)];
  } else {
    return [
      <div key={data.title} className="mr-4 py-2 text-sm uppercase text-black">
        <Divider margin="mb-4 mt-4 mr-[12px]" />
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
        <Divider margin="mt-4 mr-[12px]" />
      </div>
    ];
  }
}

const isSlicePage = (baseUrl: string) =>
  ['/slice1', '/slice2'].includes(baseUrl);
