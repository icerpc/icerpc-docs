// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import React from 'react';

export function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className="relative">
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
              {/* The last breadcrumb should not have a trailing slash */}
              {!isLast ? '/' : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
