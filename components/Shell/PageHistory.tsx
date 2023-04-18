// Copyright (c) ZeroC, Inc.

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { sideBarData, baseUrls, flattenSideBarData } from 'data/side-bar-data';
import { SideBarLink, Encoding, isLink } from 'types';
import Link from 'next/link';
import React from 'react';
import queryString from 'query-string';

interface Props {
  path: string;
  encoding: Encoding;
}

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const PageHistory = ({ path, encoding }: Props) => {
  // Get the side bar links for the current page
  const baseUrl = baseUrls.find((item) => path.startsWith(item)) ?? '';
  const links: SideBarLink[] = flattenSideBarData(
    sideBarData(baseUrl, encoding)
  ).filter(isLink);

  // Find the current page in the list of links
  const { url } = queryString.parseUrl(path, {
    parseFragmentIdentifier: true
  });
  const index = links.map((item) => stripTrailingSlash(item.path)).indexOf(url);

  // Get the previous and next links
  const previous = index > 0 ? links[index - 1] : undefined;
  const next = index < links.length - 1 ? links[index + 1] : undefined;

  return (
    <div className="mx-[-1rem] mb-0 mt-12 flex flex-row justify-between p-0">
      {previous ? (
        <Link href={previous.path}>
          <div className="flex h-10 flex-row items-center gap-2 rounded p-4 text-center text-primary hover:bg-[#E9F1FE] dark:hover:bg-[#E9F1FE]/20">
            <FaChevronLeft size={12} />
            {previous.title}
          </div>
        </Link>
      ) : (
        <div></div>
      )}
      {next && (
        <Link href={next.path}>
          <div className="flex h-10 flex-row items-center gap-2 rounded p-4 text-center text-primary hover:bg-[#E9F1FE] dark:hover:bg-[#E9F1FE]/20">
            {next.title}
            <FaChevronRight size={12} />
          </div>
        </Link>
      )}
    </div>
  );
};
