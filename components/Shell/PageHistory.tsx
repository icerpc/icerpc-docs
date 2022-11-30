// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { sideBarData, baseUrls, SideBarLink } from '../../data/sideBarData';

export function PageHistory() {
  // Get the data for the next and previous links
  const path = useRouter().asPath;
  const baseUrl = baseUrls.find((item) => path.startsWith(item));
  const data: SideBarLink[] = (sideBarData[baseUrl] ?? []).flatMap((item) => {
    if (item.kind === 'category') {
      return item.links;
    } else {
      return item as SideBarLink;
    }
  });

  // Find the next and previous pages in the sidebar if they exist
  const index = data.map((item) => item.path).indexOf(path);
  const previous: SideBarLink | null = data[index - 1];
  const next: SideBarLink | null = data[index + 1];
  return (
    <>
      <div className="page-history-container">
        {previous ? (
          <Link href={previous.path} legacyBehavior passHref>
            <a>
              <FaChevronLeft size={12} />
              {previous.title}
            </a>
          </Link>
        ) : (
          <div></div>
        )}
        {next && (
          <Link href={next.path} legacyBehavior passHref>
            <a>
              {next.title}
              <FaChevronRight size={12} />
            </a>
          </Link>
        )}
      </div>
      <style jsx>
        {`
          .page-history-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0;
            margin: 3rem -1rem 0 -1rem;
          }

          a:hover {
            background: rgb(233, 241, 254);
          }

          a {
            height: 2.5rem;
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            padding: 1rem;
            border-radius: 5px;
            align-items: center;
            text-decoration: none;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            color: var(--primary-color);
            color: var(--primary-color);
            text-decoration: none;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
