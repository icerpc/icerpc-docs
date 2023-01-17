// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHeadsObserver } from '../../hooks/hooks';
import { FiEdit, FiMessageSquare } from 'react-icons/fi';
import { AppLink } from '../AppLink';
import { useTheme } from 'next-themes';

export default function TableOfContents({ toc }) {
  const [headings, setHeadings] = useState([]);
  const { activeId } = useHeadsObserver(toc);
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const currentPath = [
    '/docs/getting-started',
    '/docs/rpc',
    '/docs/slice'
  ].includes(router.pathname)
    ? router.pathname + '/index.md'
    : router.pathname + '.md';

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
    <>
      {headings.length > 1 ? (
        <nav className="toc">
          <h2 className="dark:text-white">On this page</h2>
          <ul className="m-0 p-0">
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
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const y =
                        document
                          .querySelector(`#${item.id}`)
                          .getBoundingClientRect().top +
                        window.pageYOffset -
                        100;
                      window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                      });
                    }}
                    style={{
                      color:
                        activeId === item.id
                          ? 'var(--primary-color)'
                          : 'var(--link-color)',
                      textDecoration: 'none'
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <br />
          <h2 className="dark:text-white">More</h2>
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
          <style jsx>
            {`
              nav {
                position: sticky;
                top: calc(5rem + var(--nav-height));
                max-height: calc(100vh - var(--nav-height));
                flex: 0 0 20rem;
                align-self: flex-start;
                margin-bottom: 1rem;
                margin-left: 2rem;
                padding-left: 2rem;
                padding-right: 3rem;
                border-left: 1px solid
                  ${resolvedTheme == 'dark' ? '#31363C' : '#dce6e9'};
              }

              h2 {
                margin: 0 0 1rem 0rem;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.05em;
              }

              li {
                list-style-type: none;
                margin: 0 0 1rem 0rem;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
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
      ) : null}
    </>
  );
}
const MoreItem = ({ href, children }) => {
  return (
    <li>
      <AppLink href={href} style={{ textDecoration: 'none' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em'
          }}
        >
          {children}
        </div>
      </AppLink>
      <style jsx>
        {`
          li {
            list-style-type: none;
            margin: 0 0 1rem 0rem;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
        `}
      </style>
    </li>
  );
};
