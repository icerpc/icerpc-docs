// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { useRouter } from 'next/router';
import { Footer, HorizontalDivider } from '..';
import { Feedback } from './Feedback';
import { PageHistory } from './PageHistory';

export function Document({ children }) {
  // Get the data for the next and previous links
  const path = useRouter().asPath;
  const isDocs = path.startsWith('/docs');

  return (
    <div>
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
      </article>
      {/* {showToc && <TableOfContents toc={toc} />} */}
      <style jsx>
        {`
          article {
            background: var(--background);
            padding-top: 3rem;
            padding-left: 4rem;
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
            margin-right: 0rem;
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
