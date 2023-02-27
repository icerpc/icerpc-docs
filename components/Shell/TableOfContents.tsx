// Copyright (c) ZeroC, Inc.

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = useState(``);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70%', threshold: [0, 1] }
    );

    itemIds.forEach((id) => {
      let element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        let element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);
  return activeId !== `` ? activeId : itemIds[0];
}

export const TableOfContents = (toc: TOC) => {
  const currentPath = resolvePath(useRouter().pathname);
  const { push } = useRouter();
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );

  const activeId = useActiveId(items.map((item) => item.id));

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] min-w-[275px] shrink border-l border-lightBorder dark:border-darkBorder lg:block">
      {items.length > 1 && (
        <nav className="h-full px-8 py-10 pt-12">
          <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase tracking-wider  dark:text-white">
            <Bars3BottomLeftIcon className="ml-0 mr-2 h-5 w-5 pl-0" /> On this
            page
          </h2>
          <ul className="m-0 max-h-[50vh] overflow-y-auto p-0">
            {items.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                push={push}
                activeId={activeId}
              />
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

interface MoreItemProps {
  href: string;
  children: ReactNode;
}

const MoreItem = ({ href, children }: MoreItemProps) => {
  return (
    <li className="m-0 my-4 text-sm">
      {/* Override the default styling of AppLink */}
      <AppLink href={href} className=" dark:text-[rgba(255,255,255,0.8)]">
        <div className="flex items-center gap-[0.5em]">{children}</div>
      </AppLink>
    </li>
  );
};

interface ListItemProps {
  item: TOCItem;
  push: any;
  activeId: string;
}

const ListItem = ({ item, push, activeId }: ListItemProps) => {
  const href = `#${item.id}`;
  return (
    <li
      key={item.id}
      className={['mb-4 pr-4 text-sm', item.level === 3 ? 'padded' : undefined]
        .filter(Boolean)
        .join(' ')}
    >
      <Link
        href={href}
        onClick={(e) => {
          e.preventDefault();
          push(href);
        }}
        style={{
          textDecoration: 'none',
          color: activeId === item.id ? 'var(--primary-color)' : 'inherit'
        }}
      >
        {item.title}
      </Link>
    </li>
  );
};
