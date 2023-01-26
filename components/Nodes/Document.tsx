// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { useRouter } from 'next/router';
import { Footer, Divider } from '..';
import { Feedback } from '../Shell/Feedback';
import { PageHistory } from '../Shell/PageHistory';
import dynamic from 'next/dynamic';

const TableOfContents = dynamic(() => import('../Shell/TableOfContents'), {
  ssr: false
});

export function Document({ frontmatter, children }) {
  // Get the data for the next and previous links
  const path = useRouter().asPath;
  const isDocs = path.startsWith('/docs');
  let showToc = frontmatter?.toc ?? isDocs;

  // The table of contents is a list of headings, note that the title is stored under the key children
  const toc =
    (showToc &&
      children instanceof Array &&
      children
        .filter((c) => c.type.name === 'Heading')
        .map((node) => node.props)
        .map((node) => {
          return {
            title: node.children,
            id: node.id,
            level: node.level
          };
        })) ||
    [];

  return (
    <>
      <article className="flex grow flex-row justify-between bg-white pr-8 pl-14 pt-12 dark:bg-[rgb(33,35,39)]">
        <div className="root">
          {children}
          {isDocs && (
            <>
              <PageHistory />
              <Divider />
              <Feedback />
            </>
          )}
          <Divider />
          <Footer {...{ children }} />
        </div>
        {showToc == true ? <TableOfContents toc={toc} /> : null}
      </article>
      <style jsx>
        {`
          .page-history-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0;
            margin: 0;
            margin-top: 3rem;
          }

          .page-history {
            height: 2.5rem;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            padding: 1rem;
            border-radius: 5px;
            align-items: center;
            text-decoration: none;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            color: var(--primary-color);
          }

          .page-history:hover {
            background: rgb(233, 241, 254);
          }

          .page-history a {
            color: var(--primary-color);
            text-decoration: none;
            text-align: center;
          }

          .root {
            display: inline-block;
            width: 100%;
            margin-right: 1rem;
          }

          @media screen and (min-width: 1400px) {
            article {
              max-width: 1400px;
            }
          }
        `}
      </style>
    </>
  );
}
