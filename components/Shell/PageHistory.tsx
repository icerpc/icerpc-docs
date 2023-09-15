// Copyright (c) ZeroC, Inc.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import { sideBarData, baseUrls, flattenSideBarData } from 'data/data';
import { SideBarLink, isLink } from 'types';
import { useRouter } from 'next/router';
import { Divider } from 'components/Divider';
import clsx from 'clsx';

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

const usePageLinks = (asPath: string, isReady: boolean) => {
  const [previous, setPrevious] = useState<SideBarLink | undefined>();
  const [next, setNext] = useState<SideBarLink | undefined>();

  useEffect(() => {
    if (isReady) {
      // Remove the anchor from the path before looking up the side bar data
      const path = asPath.split('#')[0];

      // Get the side bar links for the current page
      const pathSegments = path.split('/');
      const baseUrl =
        baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? '';
      const links: SideBarLink[] = flattenSideBarData(
        sideBarData(baseUrl)
      ).filter(isLink);

      // Find the current page in the list of links
      const index = links
        .map((item) => stripTrailingSlash(item.path))
        .indexOf(path);

      // Get the previous and next links
      setPrevious(index > 0 ? links[index - 1] : undefined);
      setNext(index < links.length - 1 ? links[index + 1] : undefined);
    }
  }, [asPath, isReady]);

  return { previous, next };
};

export const PageHistory = () => {
  const { asPath, isReady, pathname } = useRouter();
  const { previous, next } = usePageLinks(asPath, isReady);

  const isHome = pathname === '/';

  if (isHome) return null;

  return (
    <>
      <Divider />
      <div className="mx-[-1rem] mb-8 flex flex-row items-stretch justify-between p-0">
        <NavLink
          direction={Direction.Left}
          path={previous?.path}
          title={previous?.title}
        />
        <NavLink
          direction={Direction.Right}
          path={next?.path}
          title={next?.title}
        />
      </div>
    </>
  );
};

const NavLink = ({
  direction,
  path,
  title
}: {
  direction: Direction;
  path?: string;
  title?: string;
}) => {
  if (!path || !title) return <div className="w-1/2"></div>;

  const isLeft = direction === Direction.Left;

  return (
    <div
      className={clsx(
        'flex w-1/2 items-start rounded-lg',
        isLeft ? 'justify-start' : 'justify-end'
      )}
    >
      <Link
        href={path}
        className="group flex flex-col p-3 text-left text-primary "
      >
        <div className="flex flex-row items-center">
          {isLeft && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="mr-2 mt-[21px] h-4 w-4"
            />
          )}
          <div className="flex flex-col">
            <span className="w-full text-sm font-[400] leading-normal text-slate-500 transition-colors group-hover:text-slate-800 dark:text-white/80 dark:group-hover:text-white">
              {isLeft ? 'Previous' : 'Next'}
            </span>
            <span className="grow">{title}</span>
            <div />
          </div>
          {!isLeft && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="ml-2 mt-[21px] h-4 w-4"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

enum Direction {
  Left,
  Right
}
