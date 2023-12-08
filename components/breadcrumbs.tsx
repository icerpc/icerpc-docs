// Copyright (c) ZeroC, Inc.

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Script from 'next/script';

export type Breadcrumb = {
  name: string;
  href: string;
};

type Props = { breadcrumbs: Breadcrumb[] };
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1, // Schema.org position is 1-based.
      name: crumb.name,
      item: new URL(crumb.href, baseUrl).href
    }))
  };

  return (
    <>
      <ol className="hidden justify-start p-0 text-sm md:flex">
        {breadcrumbs.map((crumb, index) => {
          const name = crumb.name;
          const href = crumb.href;
          const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];

          return (
            <li
              key={name}
              className={clsx(
                'mb-0 flex flex-row items-center gap-2',
                index == 0 && 'pl-1'
              )}
            >
              <Link href={href} className="dark:text-white/80">
                {name}
              </Link>
              {!isLast ? (
                <svg
                  fill="none"
                  height="22"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="-mx-2 text-[#64748b5b] dark:text-white/60"
                >
                  <path d="M16.88 3.549L7.12 20.451"></path>
                </svg>
              ) : null}
            </li>
          );
        })}
      </ol>
      <Script
        id="bread-crumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
};
