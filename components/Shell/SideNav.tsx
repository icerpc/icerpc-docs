// Copyright (c) ZeroC, Inc. All rights reserved.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'next-themes';

// import components
import {
  sideBarData,
  baseUrls,
  SideBarLink,
  SideBarCategory,
  SideBarSourceType
} from '../../data/sideBarData';

// import assets
import lightIcon from '../../public/images/Light-Icon.svg';
import darkIcon from '../../public/images/Dark-Icon.svg';

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
        className={`p-2 pl-0 text-sm  ${leftPadding} text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white`}
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
  if (data.kind == 'category') {
    const category = data as SideBarCategory;
    return [
      <li key={category.title} className="list-none">
        <h2 className="my-3 text-sm font-bold text-[var(--text-color)] dark:text-white">
          {category.title}
        </h2>
      </li>,
      <ul
        key={category.title + '-list'}
        className="ml-[0.1rem] border-l-[1.5px] border-lightBorder pl-[0.1rem] dark:border-darkBorder"
      >
        {category.links.map((link) => createListItem(router, link))}
      </ul>
    ];
  } else {
    const link = data as SideBarLink;
    return [createListItem(router, link, true)];
  }
}

export function SideNav({ path }) {
  const [data, setData] = useState([]);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const links =
      sideBarData[baseUrls.find((item) => path.startsWith(item))] ?? [];
    setData(links);
    return () => {
      setData([]);
    };
  }, [setData, path]);

  let cells = data.map((item) => {
    return transformSideBarData(router, item);
  });

  return (
    <nav className=" sticky top-0 hidden h-screen w-[var(--side-nav-width)] overflow-y-hidden border-r-[1.5px] border-lightBorder bg-[#FAFBFC] pl-8 pt-0 dark:border-darkBorder dark:bg-[#26282c] lg:block">
      <div className="my-[15px] mr-8 flex items-center justify-start gap-1 pb-4">
        <Image
          src={resolvedTheme === 'dark' ? darkIcon : lightIcon}
          height={25}
          alt="ZeroC Logo"
        />
        <div className="pt-[6px] text-xl font-semibold text-black dark:text-white">
          Docs
        </div>
      </div>
      {cells}
    </nav>
  );
}
