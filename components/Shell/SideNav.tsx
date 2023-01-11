// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

import {
  sideBarData,
  baseUrls,
  SideBarLink,
  SideBarCategory,
  SideBarSourceType
} from '../../data/sideBarData';

function createListItem(
  router: NextRouter,
  link: SideBarLink,
  noLeftPad: Boolean = false
): React.ReactElement {
  let paddingLeft = noLeftPad == true ? 'padding-left: 0px;' : '';
  return (
    <li key={link.path} className="link">
      <div key={link.path} className="link">
        <Link href={link.path} legacyBehavior>
          {router.pathname === link.path.replace(/\/$/, '') ? (
            <a>
              <b style={{ color: 'var(--primary-color)' }}>{link.title}</b>
            </a>
          ) : (
            <a>{link.title}</a>
          )}
        </Link>
      </div>
      <style jsx>
        {`
          li {
            text-decoration: none;
          }

          a {
            text-decoration: none;
          }

          .link {
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0;
            padding: 0.3rem;
            cursor: pointer;
            ${paddingLeft}
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
      <li key={category.title}>
        <h5>{category.title}</h5>
        <style jsx>
          {`
            li {
              list-style-type: none;
            }
          `}
        </style>
      </li>,
      <ul key={category.title}>
        {category.links.map((link) => createListItem(router, link))}
        <style jsx>
          {`
            ul {
              border-left: 1px solid rgba(24, 24, 27, 0.1);
              padding-left: 0.1rem;
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
  const baseUrl = baseUrls.find((item) => path.startsWith(item));
  const data = sideBarData[baseUrl] ?? [];
  const router = useRouter();
  const sideBarCells = data.map((item) => {
    return transformSideBarData(router, item);
  });

  return (
    <nav>
      {sideBarCells}
      <style jsx>
        {`
          nav {
            /* https://stackoverflow.com/questions/66898327/how-to-keep-footer-from-pushing-up-sticky-sidebar */
            position: sticky;
            top: 0;
            height: calc(100vh - var(--nav-height));
            width: var(--side-nav-width);
            padding: 4rem 0 2rem 2rem;
            border-right: 1px solid var(--border-color);
            flex-shrink: 0;
            margin-top: 0;
            z-index: 101;
            background-color: white;
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
