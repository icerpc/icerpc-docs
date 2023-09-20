// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import clsx from 'clsx';

type TopNavigationItemProps = {
  name: string;
  href: string;
  path: string;
};

const TopNavigationItem = ({ name, href, path }: TopNavigationItemProps) => {
  const prefetch = href.startsWith('http') ? false : undefined;
  const baseClassName =
    'mx-3 overflow-hidden whitespace-nowrap dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';
  const activeClassName =
    'mx-3 text-primary font-semibold no-underline decoration-2 underline-offset-[1.5rem] opacity-100 dark:text-white hover:!text-primary dark:hover:!text-white';
  const isActive = isActivePath(path, href);
  const linkClassName = clsx(baseClassName, isActive && activeClassName);

  return (
    <li key={href}>
      <Link href={href} className={linkClassName} prefetch={prefetch}>
        {name}
      </Link>
    </li>
  );
};

function isActivePath(path: string, href: string): boolean {
  return (
    path === href ||
    path.startsWith(`${href}/`) ||
    (path.startsWith('/slice') && href === '/slice2')
  );
}

export default TopNavigationItem;
