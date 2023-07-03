// Copyright (c) ZeroC, Inc.

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiEdit, FiMessageSquare } from 'react-icons/fi';
import { AppLink } from 'components/Nodes/AppLink';
import { Divider } from 'components/Divider';
import {
  Bars3BottomLeftIcon,
  ArrowUpCircleIcon,
  MinusSmallIcon
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { baseUrls } from 'data/side-bar-data';

export type TOCItem = {
  id: string;
  title: string;
  level: number;
};

const resolvePath = (pathName: string): string => {
  return baseUrls.some((baseUrl) => pathName == baseUrl)
    ? pathName + '/index.md'
    : pathName + '.md';
};

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = useState(``);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxId = '';
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxId = entry.target.id;
          }
        });
        // Only update activeId if maxId is not an empty string
        if (maxId) {
          setActiveId(maxId);
        }
      },
      {
        rootMargin: '50px 0px -70% 0px',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Fire the callback for every 1% change in visibility.
      }
    );

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

export const TableOfContents = (toc: TOCItem[]) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentPath = resolvePath(useRouter().pathname);
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );

  const activeId = useActiveId(items.map((item) => item.id));

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      className={clsx(
        'sticky top-[3.75rem] mr-10 hidden h-[calc(100vh-4rem)] w-[275px] shrink-0 border-lightBorder',
        'border-l dark:border-darkBorder xl:flex',
        items.length > 1 ? '' : ''
      )}
    >
      <nav className="h-full px-8 py-6 pt-12">
        {items.length > 1 && (
          <>
            <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase  dark:text-white">
              <Bars3BottomLeftIcon className="ml-0 mr-2 h-5 w-5 pl-0" />
              On this page
            </h2>
            <ul className="m-0 max-h-[50vh] overflow-y-auto p-0">
              {items.map((item) => (
                <ListItem key={item.id} item={item} activeId={activeId ?? ''} />
              ))}
            </ul>
            <Divider />
          </>
        )}
        <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase   dark:text-white">
          Actions
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
            />
            GitHub Discussions
          </MoreItem>
        </ul>
        <Divider />
        {scrollPosition > 100 && (
          <button
            className="my-4 flex animate-fade-in-up flex-row items-center text-xs font-semibold uppercase  dark:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpCircleIcon className="ml-0 mr-2 h-5 w-5 pl-0 text-primary" />
            <h2> Back to top </h2>
          </button>
        )}
      </nav>
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
      <AppLink href={href} className=" dark:text-[rgba(255,255,255,0.8)]">
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
  const leftPadding = (() => {
    switch (item.level) {
      case 3:
        return '-ml-1';
      default:
        return '';
    }
  })();
  return (
    <li key={item.id} className={clsx('mb-4 pr-4 text-sm', leftPadding)}>
      <Link
        href={href}
        className={clsx(
          'flex items-start text-inherit',
          activeId === item.id
            ? 'text-primary dark:font-semibold dark:text-white'
            : ''
        )}
      >
        {item.level > 2 && (
          <MinusSmallIcon className="mx-2 mt-[2px] h-4 w-4 shrink-0" />
        )}
        {item.title}
      </Link>
    </li>
  );
};
