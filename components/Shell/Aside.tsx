// Copyright (c) ZeroC, Inc.

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  faCircleUp,
  faMessage,
  faPenToSquare
} from '@fortawesome/free-regular-svg-icons';

import { baseUrls } from 'data/side-bar-data';
import { Divider } from 'components/Divider';
import { useRouter } from 'next/router';

export type AsideItem = {
  id: string;
  title: string;
  level: number;
};

export const Aside = ({ asideItems }: { asideItems: AsideItem[] }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const items = asideItems.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );

  const activeId = useActiveId(items.map((item) => item.id));

  const { asPath, isReady } = useRouter();

  // Edit this page URL
  const baseEditPath = 'https://github.com/icerpc/icerpc-docs/tree/main/pages';
  const [editUrl, setEditUrl] = useState(baseEditPath);

  useEffect(() => {
    if (isReady) {
      let path = asPath.split('#')[0];
      path = resolvePath(path);
      path = path.replace(/^\/slice\d/, '/slice'); // strip away slice version
      setEditUrl(baseEditPath + path);
    }
  }, [asPath, isReady]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
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
        'sticky top-[3.75rem] mr-10 hidden w-[275px] shrink-0 dark:bg-dark xl:flex',
        items.length > 1 ? '' : ''
      )}
    >
      <nav className="h-full px-8 pb-6 pt-11">
        {items.length > 1 && (
          <>
            <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase  dark:text-white">
              On this page
            </h2>
            <ul className="m-0 max-h-[50vh] overflow-y-auto p-0">
              {items.map((item, index) => (
                <ListItem
                  key={`${item.id}-${index}`}
                  item={item}
                  activeId={activeId ?? ''}
                />
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
          <ActionItem href={editUrl}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="mr-[6px] h-[14px] w-[14px] text-primary"
            />
            Edit this page
          </ActionItem>
          <ActionItem href="https://github.com/orgs/icerpc/discussions">
            <FontAwesomeIcon
              icon={faMessage}
              className="mr-[6px] h-[14px] w-[14px] text-primary"
            />
            GitHub Discussions
          </ActionItem>
        </ul>
        <Divider />
        {scrollPosition > 100 && (
          <button
            className="my-4 flex animate-fade-in-up flex-row items-center pl-[2px] text-xs font-semibold uppercase  dark:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FontAwesomeIcon
              icon={faCircleUp}
              className="mr-4 h-4 w-4 text-primary"
            />

            <h2> Back to top </h2>
          </button>
        )}
      </nav>
    </aside>
  );
};

const resolvePath = (pathName: string): string => {
  return baseUrls.some((baseUrl) => pathName == baseUrl)
    ? pathName + '/index.md'
    : pathName + '.md';
};

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let potentialId = '';
      let potentialDistance = Infinity;

      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();

          // Bias towards sections entering from the bottom
          if (rect.top > 0 && rect.top < potentialDistance) {
            potentialDistance = rect.top;
            potentialId = id;
          }
        }
      });

      if (potentialId) {
        setActiveId(potentialId);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Initial setup
    handleScroll();

    // Clean up the listener when the hook is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemIds]);

  return activeId;
}

type ActionItemProps = {
  href: string;
  children: ReactNode;
};

const ActionItem = ({ href, children }: ActionItemProps) => {
  return (
    <li className="m-0 my-5 text-sm">
      <Link href={href} className=" dark:text-[rgba(255,255,255,0.8)]">
        <div className="flex items-center gap-[0.5em]">{children}</div>
      </Link>
    </li>
  );
};

type ListItemProps = {
  item: AsideItem;
  activeId: string;
};

const ListItem = ({ item, activeId }: ListItemProps) => {
  const href = `#${item.id}`;
  const leftPadding = item.level >= 3 ? '-ml-1' : '';

  return (
    <li key={item.id} className={clsx('mb-4 pr-4 text-sm', leftPadding)}>
      <Link
        href={href}
        className={clsx(
          'flex items-start text-inherit',
          activeId === item.id && 'font-semibold text-primary dark:text-white'
        )}
      >
        {item.level > 2 && (
          <FontAwesomeIcon
            icon={faMinus}
            className="mx-2 mt-[2px] h-4 w-2 shrink-0"
          />
        )}
        {item.title}
      </Link>
    </li>
  );
};
