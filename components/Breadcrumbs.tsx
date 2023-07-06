// Copyright (c) ZeroC, Inc.

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export type Breadcrumb = {
  name: string;
  href: string;
};

type Props = { breadcrumbs: Breadcrumb[] };

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <ul className="flex justify-start p-0 text-sm">
      {breadcrumbs.map((crumb, index) => {
        const name = crumb.name;
        const href = crumb.href;
        const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];

        return (
          <li
            key={name}
            className={clsx('mb-0 flex flex-row gap-2', index == 0 && 'pl-0')}
          >
            <Link href={href} className="dark:text-white/80">
              {name}
            </Link>
            {!isLast ? '/' : null}
          </li>
        );
      })}
    </ul>
  );
};
