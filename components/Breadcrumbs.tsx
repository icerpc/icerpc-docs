// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import React from 'react';

export function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className="breadcrumbs">
      <ul>
        {breadcrumbs.map((crumb) => {
          const name = crumb.name;
          const href = crumb.href;
          const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];

          if (isLast) {
            // The last breadcrumb should not have a trailing slash
            return (
              <li key={name}>
                <Link href={href} passHref legacyBehavior>
                  <a>{name}</a>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={name}>
                <Link href={href} passHref legacyBehavior>
                  <a>{name}</a>
                </Link>
                /
              </li>
            );
          }
        })}
      </ul>
      <style jsx>
        {`
          a {
            text-decoration: none;
          }

          li {
            display: flex;
            flex-direction: row;
            padding-right: 0.5rem;
            gap: 0.5rem;
          }

          ul {
            display: flex;
            padding-left: 0pt;
            color: #6b7385;
            font-size: 0.875rem;
            margin: 0 0 0.5rem 0;
          }

          .breadcrumbs {
            position: relative;
          }
        `}
      </style>
    </div>
  );
}
