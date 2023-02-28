// Copyright (c) ZeroC, Inc.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { SliceSelector } from '../SliceSelector';
import { useVersionContext } from 'context/state';
import clsx from 'clsx';

import { sideBarData, baseUrls } from 'data/side-bar-data';
import { SideBarLink, SideBarSourceType, isCategory } from 'types';

function createListItem(
  router: NextRouter,
  link: SideBarLink,
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
  const isCurrentPage = router.pathname === link.path.replace(/\/$/, '');

  return (
    <li key={link.path} className="flex">
      <Link
        href={link.path}
        className={`p-2 py-[7px] pl-0 text-sm  ${leftPadding} hover:text-zinc-900 dark:text-[#C4C7C5] dark:hover:text-white`}
        style={
          isCurrentPage ? (noLeftPadding ? activeStyleAlt : activeStyle) : style
        }
      >
        {link.title}
      </Link>
    </li>
  );
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
            <h2 className="my-2 text-sm font-bold dark:text-white">
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
  } else {
    const link = data as SideBarLink;
    return [createListItem(router, link, true)];
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
    <nav
      className={clsx(
        'sticky top-16 hidden h-screen w-[275px] shrink-0 overflow-x-hidden lg:block',
        'border-r border-lightBorder bg-[#ffffff] pr-3 pb-10 pl-6 pt-0',
        'dark:border-darkBorder dark:bg-[#26282c]'
      )}
    >
      {baseUrl == '/docs/slice' && <SliceSelector />}
      <ul role="list" className="mt-4">
        {cells}
      </ul>
    </nav>
  );
};
