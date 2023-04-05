// Copyright (c) ZeroC, Inc.

import React from 'react';
import Link from 'next/link';

interface Props {
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <ul className="mb-3 mt-0 flex pl-0 pt-0 text-sm">
      {breadcrumbs.map((crumb) => {
        const name = crumb.name;
        const href = crumb.href;
        const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];

        return (
          <li key={name} className="flex flex-row gap-2 pr-2 ">
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
