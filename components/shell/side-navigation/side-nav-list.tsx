// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import clsx from 'clsx';

import { Divider } from '@/components/divider';
import {
  SideBarDivider,
  SideBarLink,
  SideBarSourceType,
  isCategory,
  isLink
} from 'types';

type SideNavListProps = {
  data: SideBarSourceType;
  path: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const SideNavList = ({
  data,
  path,
  onClick
}: SideNavListProps): React.ReactElement[] => {
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
              className="border-light-border ml-[0.1rem] border-l-[1.5px] pl-[0.1rem] dark:border-[#3D3D3D]"
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
      <li key={data.title} className="mr-4 py-2 text-sm text-black uppercase">
        <Divider margin="mb-4 mt-4 mr-[12px]" />
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
        <Divider margin="mt-4 mr-[12px]" />
      </li>
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
            `py-[6px] pr-3 pl-0 text-sm no-underline ${leftPadding} dark:text-[#C4C7C5]`,
            isCurrentPage
              ? noLeftPadding
                ? 'text-primary font-medium dark:text-white'
                : 'border-primary text-primary ml-[-3px] border-l-[1.5px] pl-[13.5px] font-medium dark:border-white/80 dark:text-white'
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
      <li key={link.title} className={clsx('my-2 pr-2 pl-0', leftPadding)}>
        <h2 className="decoration-light-border dark:decoration-dark-border text-xs font-semibold text-slate-800 uppercase underline underline-offset-10 dark:text-white">
          {link.title}
        </h2>
      </li>
    );
  }
};
