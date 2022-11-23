// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { CollapsibleCell } from '../CollapsibleCell';

import {
  sideBarData,
  baseUrls,
  SideBarLink,
  SideBarCategory,
  SideBarSourceType
} from '../../data/sideBarData';

function transformSideBarData(
  router: NextRouter,
  data: SideBarSourceType
): React.ReactElement {
  if (data.kind == 'category') {
    const category = data as SideBarCategory;
    return (
      <CollapsibleCell key={category.title} title={category.title}>
        {category.links}
      </CollapsibleCell>
    );
  } else {
    const link = data as SideBarLink;
    return (
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
        <style jsx>
          {`
            a {
              text-decoration: none;
            }

            .link {
              font-size: 14px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin: 0;
              padding: 0.5rem;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    );
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
      <div className={'content'}>
        <div style={{ flex: 'none' }}>{sideBarCells}</div>
      </div>
      <style jsx>
        {`
          a {
            text-decoration: none;
          }

          button {
            border: none;
            background: none;
            align-self: flex-start;
            font-size: 14px;
            padding: 0;
            margin: 0;
            color: gray;
          }

          nav {
            /* https://stackoverflow.com/questions/66898327/how-to-keep-footer-from-pushing-up-sticky-sidebar */
            position: sticky;
            top: var(--nav-height);
            height: calc(100vh - var(--nav-height));
            width: 260px;
            padding: 2rem 0 2rem 1rem;
            border-right: 1px solid var(--border-color);
            flex-shrink: 0;
          }

          .content {
            height: 100%;
            width: 100%;
            text-wrap: none;
          }

          @media screen and (max-width: 1000px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}
