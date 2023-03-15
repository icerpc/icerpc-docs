// Copyright (c) ZeroC, Inc.

import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { SliceSelector } from '../SliceSelector';
import { useEncoding } from 'context/state';
import clsx from 'clsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { sideBarData, baseUrls } from 'data/side-bar-data';
import {
  SideBarDivider,
  SideBarLink,
  SideBarSourceType,
  Encoding,
  isCategory,
  isLink
} from 'types';
import { Divider } from 'components/Divider';
import { Breadcrumb } from 'components/Breadcrumbs';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getBreadcrumbs } from 'components/Title';
import { SearchButton } from './SearchButton';

function createListItem(
  router: NextRouter,
  link: SideBarLink | SideBarDivider,
  noLeftPadding: Boolean = false,
  onClick: () => void = () => {}
): React.ReactElement {
  const style: React.CSSProperties = {
    textDecoration: 'none'
  };
  const activeStyle: React.CSSProperties = {
    textDecoration: 'none',
    borderLeft: '1.5px solid var(--primary-color)',
    paddingLeft: '13.5px',
    marginLeft: '-3px'
  };
  const activeStyleAlt: React.CSSProperties = {
    color: 'var(--primary-color)',
    fontWeight: 'bold',
    textDecoration: 'none'
  };

  const leftPadding = noLeftPadding ? 'ml-0' : 'ml-3';

  if (isLink(link)) {
    const isCurrentPage = router.pathname === link.path.replace(/\/$/, '');
    return (
      <li key={link.path} className="flex">
        <Link
          href={link.path}
          className={`px-2 py-[7px] pl-0 text-sm  ${leftPadding} hover:text-zinc-900 dark:text-[#C4C7C5] dark:hover:text-white`}
          onClick={onClick}
          style={
            isCurrentPage
              ? noLeftPadding
                ? activeStyleAlt
                : activeStyle
              : style
          }
        >
          {link.title}
        </Link>
      </li>
    );
  } else {
    return (
      <div className={`${leftPadding} mb-3 mt-2 pr-2 pl-0`} key={link.title}>
        <h2 className="my-4 text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          {link.title}
        </h2>
      </div>
    );
  }
}

function transformSideBarData(
  router: NextRouter,
  data: SideBarSourceType,
  onClick: () => void = () => {}
): React.ReactElement[] {
  if (isCategory(data)) {
    const category = data;
    return [
      <li key="category">
        <ul>
          <li key={category.title} className="list-none">
            <h2 className="my-[10px] text-sm font-bold dark:text-white">
              {category.title}
            </h2>
          </li>
          <li key={`${category.title}-content`} className="list-none">
            <ul
              key={category.title + '-list'}
              className="ml-[0.1rem] border-l-[1.5px] border-lightBorder pl-[0.1rem] dark:border-[#3D3D3D]"
            >
              {category.links.map((link) =>
                createListItem(router, link, false, onClick)
              )}
            </ul>
          </li>
        </ul>
      </li>
    ];
  } else if (isLink(data)) {
    return [createListItem(router, data, true, onClick)];
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

interface SideNavProps {
  path: string;
  encoding?: Encoding;
}

export const SideNav = ({ path, encoding }: SideNavProps) => {
  const [data, setData] = useState<SideBarSourceType[]>([]);
  const { encoding: currentEncoding } = useEncoding();
  const router = useRouter();

  let baseUrl = baseUrls.find((item) => path.startsWith(item))!;
  useEffect(() => {
    const links = sideBarData(baseUrl, currentEncoding) ?? [];
    setData(links);
    return () => {
      setData([]);
    };
  }, [setData, path, currentEncoding, baseUrl]);

  let cells = data.map((item) => {
    return transformSideBarData(router, item);
  });

  return (
    // Create a wrapper that grows to fill all available left space without moving the nav
    <div className="sticky top-[59px] hidden h-screen flex-col items-end border-r border-lightBorder dark:border-darkBorder dark:bg-[#26282c] lg:flex">
      <div className="flex h-full w-full max-w-[295px] flex-col justify-start">
        <SearchButton className="mt-8 mb-0 flex items-start pr-6 pl-3" />
        {baseUrl == '/docs/slice' && (
          <div className="sticky top-0 mt-4 mb-2 bg-none pr-3 pl-6">
            <SliceSelector />
          </div>
        )}
        <nav
          className={clsx(
            'sticky top-0 block w-[275px] overflow-y-auto',
            'bg-none pr-3 pb-10 pl-6',
            baseUrl == '/docs/slice'
              ? 'h-[calc(100vh-59px-180px)]'
              : 'h-[calc(100vh-59px-40px)]'
          )}
        >
          <ul className="top-0 mx-2 mt-4">{cells}</ul>
        </nav>
      </div>
    </div>
  );
};

interface MobileSideNavProps {
  pathname: string;
  encoding?: Encoding;
}

export function MobileSideNav({ pathname, encoding }: MobileSideNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<SideBarSourceType[]>([]);
  const { encoding: currentEncoding } = useEncoding();
  const breadcrumbs = getBreadcrumbs(pathname, currentEncoding);
  const router = useRouter();

  let baseUrl = baseUrls.find((item) => pathname.startsWith(item))!;

  useEffect(() => {
    const links = sideBarData(baseUrl, currentEncoding) ?? [];
    setData(links);
    return () => {
      setData([]);
    };
  }, [setData, pathname, currentEncoding, baseUrl]);

  let cells = data.map((item) => {
    return transformSideBarData(router, item, () => setIsOpen(false));
  });

  function closeModal() {
    setIsOpen(false);
  }

  if (breadcrumbs.length > 0) {
    return (
      <>
        <div className="flex items-center justify-start border-t border-lightBorder p-4 text-sm dark:border-darkBorder lg:hidden">
          <button>
            <Bars3Icon
              className="ml-1 mr-4 block h-5 w-5 text-slate-500 dark:text-white/80"
              aria-hidden="true"
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
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
            </div>
          ))}
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
                enterFrom="-left-[300px]"
                enterTo="left-0"
                leave="ease-in duration-200"
                leaveFrom="left-0"
                leaveTo="-left-[300px]"
              >
                <div
                  className={clsx(
                    'fixed top-0 left-0 h-screen w-full max-w-[300px] rounded-r bg-white p-0 font-semibold text-slate-900 shadow-lg dark:bg-[#26282c]'
                  )}
                >
                  <Dialog.Panel className="h-full w-full overflow-hidden rounded-r text-left align-middle text-sm font-bold shadow-xl transition-all">
                    <div className="flex h-full w-full flex-col items-start">
                      <button
                        type="button"
                        className={clsx(
                          'group absolute right-0 mr-8 mt-4 items-center justify-center rounded-full border border-transparent bg-slate-300/40 px-[14px] py-2 font-medium',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        )}
                        onClick={closeModal}
                      >
                        <XMarkIcon
                          className="block h-5 w-5 group-hover:text-slate-500 dark:group-hover:text-slate-400"
                          aria-hidden="true"
                        />
                      </button>
                      <nav
                        className={clsx(
                          'block h-full w-full overflow-y-auto',
                          'bg-none pr-3 pb-10 pl-6 pt-4',
                          baseUrl == '/docs/slice' && 'mt-12'
                        )}
                      >
                        <div className="pointer-events-none sticky top-0" />
                        {baseUrl == '/docs/slice' && <SliceSelector />}
                        <ul className="mx-2 mt-4">{cells}</ul>
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
  } else {
    return null;
  }
}
