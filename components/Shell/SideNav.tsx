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

  const isCurrentPage = router.pathname === link.path.replace(/\/$/, '');

  return (
    <li key={link.path}>
      <Link href={link.path} style={isCurrentPage ? activeStyle : style}>
        {link.title}
      </Link>
      <style jsx>
        {`
          li {
            font-size: 14px;
            display: flex;
            padding: 0.5rem 0.5rem 0.5rem;
            margin: 0 1rem 0.5rem 0;
            ${noLeftPadding == true ? 'padding-left: 0px;' : ''}
            align-items: center;
          }
        `}
      </style>
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
      <li key={category.title} style={{ listStyleType: 'none' }}>
        <h5 style={{ margin: '0.5rem 0 0.5rem 0', color: 'var(--text-color)' }}>
          {category.title}
        </h5>
      </li>,
      <ul key={category.title + '-list'}>
        {category.links.map((link) => createListItem(router, link))}
        <style jsx>
          {`
            ul {
              border-left: 1px solid var(--border-color);
              padding-left: 0.1rem;
              margin-left: 0.1rem;
            }
          `}
        </style>
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
    <nav>
      <div className="logo">
        <Image
          src={resolvedTheme === 'dark' ? darkIcon : lightIcon}
          height={25}
          alt="ZeroC Logo"
        />
        <div className="logo-text">Docs</div>
      </div>
      {cells}
      <style jsx>
        {`
          nav {
            background: var(--nav-background);
            border-right: 1px solid var(--border-color);
            height: 100vh;
            overflow-y: auto;
            padding: 0 0 2rem 1.2rem;
            position: sticky;
            top: 0;
            width: var(--side-nav-width);
            z-index: 101;
          }

          .logo {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            margin-right: 2rem;
          }

          .logo .logo-text {
            padding-top: 5px;
            font-size: 16pt;
            font-weight: 500;
            color: var(--text-color);
          }

          @media screen and (max-width: 1024px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}
