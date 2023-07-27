// Copyright (c) ZeroC, Inc.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import { sideBarData, baseUrls, flattenSideBarData } from 'data/side-bar-data';
import { SideBarLink, isLink } from 'types';
import { useRouter } from 'next/router';

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const PageHistory = () => {

  const { asPath, isReady } = useRouter();

  const [previous, setPrevious] = useState<SideBarLink | undefined>();
  const [next, setNext] = useState<SideBarLink | undefined>();

  useEffect(() => {
    if (isReady) {

      // Remove the anchor from the path before looking up the side bar data
      const path = asPath.split('#')[0];

      // Get the side bar links for the current page
      const pathSegments = path.split('/');
      const baseUrl = baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? '';
      const links: SideBarLink[] = flattenSideBarData(sideBarData(baseUrl)).filter(
        isLink
      );

      // Find the current page in the list of links
      const index = links
        .map((item) => stripTrailingSlash(item.path))
        .indexOf(path);

      // Get the previous and next links
      setPrevious(index > 0 ? links[index - 1] : undefined);
      setNext(index < links.length - 1 ? links[index + 1] : undefined);
    }

  }, [asPath, isReady]);

  return (
    <div className="mx-[-1rem] mb-0 mt-12 flex flex-row justify-between p-0">
      {previous ? (
        <Link href={previous.path}>
          <div className="flex h-10 flex-row items-center gap-2 rounded p-4 text-center text-primary hover:bg-[#E9F1FE] dark:hover:bg-[#E9F1FE]/20">
            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
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
            <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
          </div>
        </Link>
      )}
    </div>
  );
};
