// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useHeadsObserver } from '../../hooks/hooks';

export function TableOfContents({ toc }) {
  const [headings, setHeadings] = useState([]);
  const { activeId } = useHeadsObserver(toc);

  useEffect(() => {
    const elements = toc.filter(
      (item) =>
        item.id &&
        (item.level === 2 || item.level === 3) &&
        item.title !== 'Next steps'
    );
    setHeadings(elements);
  }, [setHeadings, toc]);

  return (
    <nav className="toc">
      {headings.length > 1 ? (
        <ul className="flex column">
          <div className="toc-header">On this page</div>
          {headings.map((item) => {
            const href = `#${item.id}`;
            const active =
              typeof window !== 'undefined' && window.location.hash === href;
            return (
              <li
                key={item.id}
                className={[
                  active ? 'active' : undefined,
                  item.level === 3 ? 'padded' : undefined
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  fontWeight: activeId === item.id ? 'bold' : 'normal'
                }}
              >
                <Link href={href} passHref>
                  <a
                    style={{
                      color:
                        activeId === item.id
                          ? 'var(--primary-color)'
                          : 'rgba(75, 85, 99, 1)'
                    }}
                  >
                    {item.children}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: calc(2.5rem + var(--nav-height));
            max-height: calc(100vh - var(--nav-height));
            flex: 0 0 10rem;
            /* https://stackoverflow.com/questions/44446671/my-position-sticky-element-isnt-sticky-when-using-flexbox */
            align-self: flex-start;
            padding-top: 20px;
            padding-left: 35px;
          }

          .toc-header {
            margin: 0 0 1rem 0rem;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 500;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style-type: none;
            margin: 0 0 1rem 0rem;
            font-size: 14px;
          }
          li a {
            text-decoration: none;
          }
          li a:hover,
          li.active a {
            text-decoration: none;
          }
          li.padded {
            padding-left: 0rem;
          }
          @media screen and (max-width: 1200px) {
            nav {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}
