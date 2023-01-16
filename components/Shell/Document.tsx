// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Footer, HorizontalDivider } from '..';
import { Feedback } from './Feedback';
import { PageHistory } from './PageHistory';

export function Document({ children, config }) {
  // Get the data for the next and previous links
  const path = useRouter().asPath;
  const isDocs = path.startsWith('/docs');
  const toc =
    config.filter((c) => typeof c.props.level !== 'undefined').map((node) => node.props) || [];
  const showToc = isDocs && toc.some((header) => header.level > 1);

  // Only load the TableOfContents component if we're on a docs page that has multiple headers
  const TableOfContents = showToc
    ? dynamic(() => import('./TableOfContents'), {
        ssr: false
      })
    : null;

  return (
    <div className="document">
      <article>
        <div className="root">
          {children}
          {isDocs && (
            <>
              <PageHistory />
              <HorizontalDivider />
              <Feedback />
            </>
          )}
          <HorizontalDivider />
          <Footer {...{ children }} />
        </div>
        {showToc && <TableOfContents toc={toc} />}
      </article>
      <style jsx>
        {`
          article {
            background: var(--background);
            padding-top: 4rem;
            width: 90%;
            margin: auto;
            display: flex;
            flex-direction: row;
          }

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
            margin-right: 4rem;
          }

          @media screen and (min-width: 1400px) {
            article {
              max-width: 1400px;
            }
          }
        `}
      </style>
    </div>
  );
}
