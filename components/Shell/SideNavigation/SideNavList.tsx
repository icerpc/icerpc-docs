// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import clsx from 'clsx';

import { Divider } from 'components/Divider';
import {
  SideBarDivider,
  SideBarLink,
  SideBarSourceType,
  isCategory,
  isLink
} from 'types';
import { usePath } from 'context/state';

type SideNavListProps = {
  data: SideBarSourceType;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const SideNavList = ({
  data,
  onClick
}: SideNavListProps): React.ReactElement[] => {
  const path = usePath();

  if (isCategory(data)) {
    const category = data;
    return [
      <li key="category">
        <ul>
          <li key={category.title} className="list-none">
            <h2 className="my-[10px] text-sm font-semibold dark:text-white">
              {category.title}
            </h2>
          </li>
          <li key={`${category.title}-content`} className="list-none">
            <ul
              key={category.title + '-list'}
              className="ml-[0.1rem] border-l-[1.5px] border-lightBorder pl-[0.1rem] dark:border-[#3D3D3D]"
            >
              {category.links.map((link) =>
                ListItem(path, link, false, onClick)
              )}
            </ul>
          </li>
        </ul>
      </li>
    ];
  } else if (isLink(data)) {
    return [ListItem(path, data, true, onClick)];
  } else {
    return [
      <div key={data.title} className="mr-4 py-2 text-sm uppercase text-black">
        <Divider margin="mb-4 mt-4 mr-[12px]" />
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
        <Divider margin="mt-4 mr-[12px]" />
      </div>
    ];
  }
};

const ListItem = (
  path: string,
  link: SideBarLink | SideBarDivider,
  noLeftPadding = false,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined
): React.ReactElement => {
  const leftPadding = noLeftPadding ? 'ml-0' : 'ml-3';

  if (isLink(link)) {
    const isCurrentPage = path === link.path.replace(/\/$/, '');
    return (
      <li key={link.path} className="flex">
        <Link
          href={link.path}
          className={clsx(
            `py-[6px] pl-0 pr-3 text-sm no-underline  ${leftPadding} dark:text-[#C4C7C5]`,
            isCurrentPage
              ? noLeftPadding
                ? 'font-medium text-primary dark:text-white'
                : 'ml-[-3px] border-l-[1.5px] border-primary pl-[13.5px] font-medium text-primary dark:border-white/80 dark:text-white'
              : 'mr-1 hover:text-zinc-900 dark:hover:text-white'
          )}
          onClick={onClick}
        >
          {link.title}
        </Link>
      </li>
    );
  } else {
    return (
      <li key={link.title} className={clsx('my-2 pl-0 pr-2', leftPadding)}>
        <h2 className="text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          {link.title}
        </h2>
      </li>
    );
  }
};

export const isSlicePage = (baseUrl: string) =>
  ['/slice1', '/slice2'].includes(baseUrl);
