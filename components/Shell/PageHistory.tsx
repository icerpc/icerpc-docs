// Copyright (c) ZeroC, Inc.

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { sideBarData, baseUrls } from 'data/side-bar-data';
import { SideBarLink, isCategory } from 'types';
import { useVersionContext } from 'context/state';

export function PageHistory() {
  // Get the data for the next and previous links
  const { version } = useVersionContext();
  const path = useRouter().asPath;
  const baseUrl = baseUrls.find((item) => path.startsWith(item))!;
  const data: SideBarLink[] = sideBarData(baseUrl, version).flatMap((item) => {
    if (isCategory(item)) {
      return item.links;
    } else {
      return item;
    }
  });

  // Find the next and previous pages in the sidebar if they exist
  const index = data.map((item) => item.path).indexOf(path);
  const previous: SideBarLink | null = data[index - 1];
  const next: SideBarLink | null = data[index + 1];

  return (
    <>
      <div className="mx-[-1rem] mt-12 mb-0 flex flex-row justify-between p-0">
        {previous ? (
          <Link href={previous.path}>
            <div className="flex h-10 flex-row items-center gap-2 rounded p-4 text-center text-primary hover:bg-[#E9F1FE]">
              <FaChevronLeft size={12} />
              {previous.title}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {next && (
          <Link href={next.path}>
            <div className="flex h-10 flex-row items-center gap-2 rounded p-4 text-center text-primary hover:bg-[#E9F1FE]">
              {next.title}
              <FaChevronRight size={12} />
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
