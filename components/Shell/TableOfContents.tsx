// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useHeadsObserver } from 'hooks/hooks';
import { FiEdit, FiMessageSquare } from 'react-icons/fi';
import { AppLink } from 'components/Nodes/AppLink';
import { Divider } from 'components/Divider';
import { Bars3BottomLeftIcon } from '@heroicons/react/20/solid';

export type TOC = TOCItem[];

export type TOCItem = {
  id: string;
  title: string;
  level: number;
};

const resolvePath = (pathName: string): string => {
  return ['/docs/getting-started', '/docs/rpc', '/docs/slice'].includes(
    pathName
  )
    ? pathName + '/index.md'
    : pathName + '.md';
};

export const TableOfContents = (toc: TOC) => {
  const { activeId } = useHeadsObserver(toc);
  const currentPath = resolvePath(useRouter().pathname);
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[300px] shrink-0 border-l border-lightBorder dark:border-darkBorder lg:block">
      {items.length > 1 && (
        <nav className="h-full px-8 py-10">
          <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase tracking-wider  dark:text-white">
            <Bars3BottomLeftIcon className="ml-0 mr-2 h-5 w-5 pl-0" /> On this
            page
          </h2>
          <ul className="m-0 max-h-[50vh] overflow-y-auto p-0">
            {items.map((item) => (
              <ListItem key={item.id} item={item} activeId={activeId} />
            ))}
          </ul>
          <Divider />
          <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase tracking-wider  dark:text-white">
            More
          </h2>
          <ul
            className="m-0 p-0 pl-[2px]"
            style={{ color: 'var(--primary-color)' }}
          >
            <MoreItem
              href={
                'https://github.com/zeroc-ice/icerpc-docs/tree/main/pages' +
                currentPath
              }
            >
              <FiEdit className="mr-[6px]" color="var(--primary-color)" /> Edit
              this page
            </MoreItem>
            <MoreItem href="https://github.com/zeroc-ice/icerpc">
              <FiMessageSquare
                className="mr-[6px]"
                color="var(--primary-color)"
              />{' '}
              GitHub Discussions
            </MoreItem>
          </ul>
          <Divider />
        </nav>
      )}
    </aside>
  );
};

type MoreItemProps = {
  href: string;
  children: ReactNode;
};

const MoreItem = ({ href, children }: MoreItemProps) => {
  return (
    <li className="m-0 my-4 text-sm">
      <AppLink href={href} className="text-[#4B5563]">
        <div className="flex items-center gap-[0.5em]">{children}</div>
      </AppLink>
    </li>
  );
};

type ListItemProps = {
  item: TOCItem;
  activeId: string;
};

const ListItem = ({ item, activeId }: ListItemProps) => {
  const href = `#${item.id}`;
  const active = typeof window !== 'undefined' && window.location.hash === href;
  return (
    <li
      key={item.id}
      className={[
        'mb-4 text-sm',
        active ? 'active' : undefined,
        item.level === 3 ? 'padded' : undefined
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const y =
            document.querySelector(href)!.getBoundingClientRect().top +
            window.pageYOffset -
            100;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }}
        style={{
          color:
            activeId === item.id ? 'var(--primary-color)' : 'var(--link-color)',
          textDecoration: 'none'
        }}
      >
        {item.title}
      </Link>
    </li>
  );
};
