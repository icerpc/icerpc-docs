// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import { baseUrls } from '@/data';
import { BackToTop } from './back-to-top';
import { Divider } from '@/components/divider';

export type AsideItem = {
  id: string;
  title: string;
  level: number;
};

export const Aside = ({
  asideItems,
  path
}: {
  asideItems: AsideItem[];
  path: string;
}) => {
  const items = asideItems.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );
  const activeId = useActiveId(items.map((item) => item.id).join('\n'));

  return (
    <aside
      className={clsx(
        'dark:bg-dark sticky top-[6.4rem] mr-10 hidden h-[calc(100vh-4rem)] w-[275px] shrink-0 xl:flex',
        items.length > 1 ? '' : ''
      )}
    >
      <nav className="h-full px-8 pt-11 pb-6">
        {items.length > 1 && (
          <>
            <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase dark:text-white">
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
        <h2 className="mb-4 flex flex-row items-center text-xs font-semibold uppercase dark:text-white">
          Actions
        </h2>
        <ul
          className="m-0 p-0 pl-0.5"
          style={{ color: 'var(--primary-color)' }}
        >
          <ActionItem href={editPageUrl(path)}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-primary mr-1.5 size-3.5"
            />
            Edit this page
          </ActionItem>
          <ActionItem href="https://github.com/icerpc/icerpc-csharp/discussions">
            <FontAwesomeIcon
              icon={faMessage}
              className="text-primary mr-1.5 size-3.5"
            />
            GitHub Discussions
          </ActionItem>
        </ul>
        <Divider />
        <BackToTop />
      </nav>
    </aside>
  );
};

const resolvePath = (pathName: string): string => {
  return baseUrls.some((baseUrl) => pathName == baseUrl)
    ? pathName + '/index.md'
    : pathName + '.md';
};

// The ids come joined into one string, so a render that builds a new list
// doesn't re-run the effect and re-attach its listeners.
function useActiveId(ids: string) {
  const [activeId, setActiveId] = useState(ids.split('\n')[0]);

  useEffect(() => {
    const itemIds = ids.split('\n');
    let lastScrollY = window.scrollY;

    // A jump to any heading too near the end of the page to pass under the
    // header lands at the bottom, so there the heading last jumped to, by a
    // link, by Back and Forward, or by opening the page at its link, decides
    // which one is active, until the reader scrolls back up.
    let jumpedId = location.hash.slice(1);

    const handleScroll = () => {
      const headings = itemIds.flatMap(
        (id) => document.getElementById(id) ?? []
      );
      if (headings.length === 0) return;
      const { innerHeight, scrollY } = window;
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      const tops = headings.map(
        (heading) => heading.getBoundingClientRect().top
      );

      if (scrollY < lastScrollY) jumpedId = '';
      lastScrollY = scrollY;

      // The scroll position at which each heading passes under the header: a
      // pixel past where a jump to it leaves it, at its scroll-margin-top.
      const margin = parseFloat(getComputedStyle(headings[0]).scrollMarginTop);
      const targets = tops.map((top) => top + scrollY - margin + 1);

      // Headings too near the end of the page never pass under the header, so
      // their targets are squeezed into the scroll left after the last one
      // that does. They then activate in order by the bottom of the page.
      const lastReachable =
        targets.findLast((target) => target <= maxScroll) ?? 0;
      const last = targets[targets.length - 1];
      const squeeze =
        last > maxScroll && maxScroll > lastReachable
          ? (maxScroll - lastReachable) / (last - lastReachable)
          : 1;
      const squeezed = targets.map((target) =>
        target > lastReachable
          ? lastReachable + (target - lastReachable) * squeeze
          : target
      );

      // The active heading is the last one passed, or the next one once it's
      // in the top half of the viewport.
      let active = squeezed.findLastIndex((target) => target <= scrollY);
      if (tops[active + 1] < innerHeight / 2) active++;

      // At the bottom of the page the last heading is active, unless the
      // reader jumped to another one that can't pass under the header.
      if (scrollY >= maxScroll - 1) {
        const jumped = headings.findIndex((heading) => heading.id === jumpedId);
        active =
          jumped !== -1 && targets[jumped] > maxScroll
            ? jumped
            : headings.length - 1;
      }

      setActiveId(headings[Math.max(active, 0)].id);
    };

    // A jump by a link on this page, or by Back and Forward, doesn't scroll
    // when the page is already at the bottom, so it updates the active heading
    // itself.
    const handleJump = (id: string) => {
      jumpedId = id;
      handleScroll();
    };
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest('a');
      if (link?.hash && link.pathname === location.pathname) {
        handleJump(link.hash.slice(1));
      }
    };
    const handlePopState = () => handleJump(location.hash.slice(1));

    // Attach the event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    // Initial setup
    handleScroll();

    // Clean up the listeners when the hook is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [ids]);

  return activeId;
}

type ActionItemProps = {
  href: string;
  children: ReactNode;
};

const ActionItem = ({ href, children }: ActionItemProps) => {
  return (
    <li className="mb-2 text-sm leading-6">
      <Link href={href} className="dark:text-[rgba(255,255,255,0.8)]">
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
    <li
      key={item.id}
      className={clsx('mb-2 pr-4 text-sm leading-6', leftPadding)}
    >
      <Link
        href={href}
        className={clsx(
          'flex items-start text-inherit',
          activeId === item.id && 'text-primary'
        )}
      >
        {item.level > 2 && (
          <span className="mx-2 flex h-lh shrink-0 items-center">
            <FontAwesomeIcon icon={faMinus} />
          </span>
        )}
        {item.title}
      </Link>
    </li>
  );
};

const editPageUrl = (path: string) => {
  const baseEditPath =
    'https://github.com/icerpc/icerpc-docs/tree/main/content';
  let basePath = path.split('#')[0];
  basePath = resolvePath(path);
  basePath = basePath.replace(/^\/slice\d/, '/slice'); // strip away slice version
  if (!basePath.endsWith('.md')) basePath += '.md'; // ensure that basePath ends with .md

  return baseEditPath + basePath;
};
