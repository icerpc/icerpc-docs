// Copyright (c) ZeroC, Inc.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { SliceSelector } from '../SliceSelector';
import { useVersionContext } from 'context/state';
import clsx from 'clsx';

import { sideBarData, baseUrls } from 'data/side-bar-data';
import {
  SideBarDivider,
  SideBarLink,
  SideBarSourceType,
  isCategory,
  isLink
} from 'types';
import { Divider } from 'components/Divider';

function createListItem(
  router: NextRouter,
  link: SideBarLink | SideBarDivider,
  noLeftPadding: Boolean = false
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
      <div className={`${leftPadding} mb-3 mt-2 pr-2 pl-0`}>
        <h2 className="my-4 text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          {link.title}
        </h2>
      </div>
    );
  }
}

function transformSideBarData(
  router: NextRouter,
  data: SideBarSourceType
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
              {category.links.map((link) => createListItem(router, link))}
            </ul>
          </li>
        </ul>
      </li>
    ];
  } else if (isLink(data)) {
    return [createListItem(router, data, true)];
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
}

export const SideNav = ({ path }: SideNavProps) => {
  const [data, setData] = useState<SideBarSourceType[]>([]);
  const { version } = useVersionContext();
  const router = useRouter();

  let baseUrl = baseUrls.find((item) => path.startsWith(item))!;

  useEffect(() => {
    const links = sideBarData(baseUrl, version) ?? [];
    setData(links);
    return () => {
      setData([]);
    };
  }, [setData, path, version, baseUrl]);

  let cells = data.map((item) => {
    return transformSideBarData(router, item);
  });

  return (
    // Create a wrapper that grows to fill all available left space without moving the nav
    <div className="sticky top-[59px] flex h-screen grow justify-end border-r border-lightBorder dark:border-darkBorder dark:bg-[#26282c]">
      <nav
        className={clsx(
          'sticky top-0 hidden h-[calc(100vh-59px)] w-[275px] overflow-y-auto lg:block',
          'bg-none pr-3 pb-10 pl-6 pt-4'
        )}
      >
        <div className="pointer-events-none sticky top-0" />
        {baseUrl == '/docs/slice' && <SliceSelector />}
        <ul role="list" className="mx-2 mt-4">
          {cells}
        </ul>
      </nav>
    </div>
  );
};
