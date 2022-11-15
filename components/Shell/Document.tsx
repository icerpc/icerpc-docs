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
  const file = path.endsWith('/') ? path + 'index.md' : path;

  return (
    <div className="document">
      <article>
        <div className="root">
          {children}
          <HorizontalDivider />
          <Feedback />
          <HorizontalDivider />
          {isDocs && (
            <div className="edit-container">
              <a
                href={`https://github.com/zeroc-ice/icerpc-docs/tree/main/pages${file}`}
              >
                Edit this page
              </a>
            </div>
          )}
          <Footer {...{ children }} />
        </div>
        {isDocs && toc.some((header) => header.level > 1) ? (
          <TableOfContents toc={toc} />
        ) : null}
      </article>
      <style jsx>
        {`
          article {
            background: var(--background);
            padding-top: 4rem;
            width: 85%;
            margin: auto;
            display: flex;
            flex-direction: row;
          }

          a {
            color: var(--primary-color);
            text-decoration: none;
          }

          .root {
            display: inline-block;
            width: 100%;
          }

          .edit-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            font-size: 14px;
          }

          @media screen and (min-width: 1200px) {
            article {
              max-width: 1200px;
            }
          }
        `}
      </style>
    </div>
  );
}
