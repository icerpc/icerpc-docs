// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import React from 'react';

export type Breadcrumb = {
  name: string;
  href: string;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <ul className="mb-2 flex pl-0 text-sm text-[#6b7385]">
      {breadcrumbs.map((crumb) => {
        const name = crumb.name;
        const href = crumb.href;
        const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];

        return (
          <li key={name} className="flex flex-row gap-2 pr-2">
            <Link href={href} style={{ textDecoration: 'none' }}>
              {name}
            </Link>
            {!isLast ? '/' : null}
          </li>
        );
      })}
    </ul>
  );
};
