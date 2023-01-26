// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useHeadsObserver } from 'hooks/hooks';
import { FiEdit, FiMessageSquare } from 'react-icons/fi';
import { AppLink } from 'components/Nodes/AppLink';

const resolvePath = (pathName: string): string => {
  return ['/docs/getting-started', '/docs/rpc', '/docs/slice'].includes(
    pathName
  )
    ? pathName + '/index.md'
    : pathName + '.md';
};

export default function TableOfContents({ toc }) {
  const { activeId } = useHeadsObserver(toc);
  const currentPath = resolvePath(useRouter().pathname);
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );

  return (
    <>
      {items.length > 1 && (
        <nav className="sticky top-[calc(5rem+var(--nav-height))] mb-4 ml-6 hidden max-h-[calc(100vh-var(--nav-height))] w-[300px] self-start border-l border-lightBorder px-8 lg:block">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider dark:text-white">
            On this page
          </h2>
          <ul className="m-0 max-h-[50vh] overflow-y-auto p-0">
            {items.map((item) => (
              <ListItem key={item.id} item={item} activeId={activeId} />
            ))}
          </ul>
          <br />
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider dark:text-white">
            More
          </h2>
          <ul className="m-0 p-0" style={{ color: 'var(--primary-color)' }}>
            <MoreItem
              href={
                'https://github.com/zeroc-ice/icerpc-docs/tree/main/pages' +
                currentPath
              }
            >
              <FiEdit color="var(--primary-color)" /> Edit this page
            </MoreItem>
            <MoreItem href="https://github.com/zeroc-ice/icerpc">
              <FiMessageSquare color="var(--primary-color)" /> GitHub
              Discussions
            </MoreItem>
          </ul>
        </nav>
      )}
    </>
  );
}

const MoreItem = ({ href, children }) => {
  return (
    <li className="m-0 my-4 text-sm">
      <AppLink href={href}>
        <div className="flex items-center gap-[0.5em]">{children}</div>
      </AppLink>
    </li>
  );
};
const ListItem = ({ item, activeId }) => {
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
            document.querySelector(href).getBoundingClientRect().top +
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
