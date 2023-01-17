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
    color: 'var(--primary-color)',
    fontWeight: 'bold',
    textDecoration: 'none'
  };
  const leftPadding = noLeftPadding ? 'ml-0' : 'ml-3';
  const isCurrentPage = router.pathname === link.path.replace(/\/$/, '');

  return (
    <li
      key={link.path}
      className={`ml-4 mr-2 flex p-2 pl-0 text-sm ${leftPadding}`}
    >
      <Link href={link.path} style={isCurrentPage ? activeStyle : style}>
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
        <h2 className="my-3 text-sm font-bold text-[var(--text-color)]">
          {category.title}
        </h2>
      </li>,
      <ul
        key={category.title + '-list'}
        className="ml-[0.1rem] border-l-[1.5px]  pl-[0.1rem]"
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
    <nav className="sticky top-0 hidden h-screen w-[var(--side-nav-width)] overflow-y-hidden border-r-[1.5px] border-[var(--border-color)] bg-[var(--nav-background)] pl-8 pt-0 lg:block">
      <div className="my-4 mr-8 flex items-center justify-start gap-2 pb-4">
        <Image
          src={resolvedTheme === 'dark' ? darkIcon : lightIcon}
          height={25}
          alt="ZeroC Logo"
        />
        <div className="pt-[5px] text-xl font-semibold">Docs</div>
      </div>
      {cells}
    </nav>
  );
}
