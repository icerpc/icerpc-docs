// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Footer, HorizontalDivider } from '..';
import { Feedback } from './Feedback';

export function Document({ children, config }) {
  const isDocs = useRouter().asPath.startsWith('/docs');
  const toc =
    config
      .filter((c) => typeof c.props.level !== 'undefined')
      .map((node) => node.props) || [];
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
          a {
            color: var(--primary-color);
            text-decoration: none;
          }

          article {
            background: var(--background);
            padding-top: 4rem;
            width: 90%;
            margin: auto;
            display: flex;
            flex-direction: row;
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
