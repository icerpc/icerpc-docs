// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import React from 'react';

interface Props {
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <ul className="mt-0 mb-3 flex pt-0 pl-0 text-sm">
      {breadcrumbs.map((crumb) => {
        const name = crumb.name;
        const href = crumb.href;
        const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];

        return (
          <li key={name} className="flex flex-row gap-2 pr-2 ">
            <Link href={href} className="dark:text-slate-300">
              {name}
            </Link>
            {!isLast ? '/' : null}
          </li>
        );
      })}
    </ul>
  );
};
