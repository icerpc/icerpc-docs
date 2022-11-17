// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { useRouter } from 'next/router';
import { TableOfContents, Footer, HorizontalDivider } from '..';
import { Feedback } from './Feedback';

export function Document({ children, config }) {
  const toc =
    config.filter((c) => c.type.name === 'Heading').map((node) => node.props) ||
    [];
  const path = useRouter().asPath;
  const isDocs = path.startsWith('/docs');

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
        {isDocs && toc.some((header) => header.level > 1) ? (
          <TableOfContents toc={toc} />
        ) : null}
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
