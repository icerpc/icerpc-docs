// Copyright (c) ZeroC, Inc. All rights reserved.

import { useRouter } from 'next/router';
import React from 'react';
import { TableOfContents, Footer } from '.';
import { HorizontalDivider } from './Divider';

export function Document({ children, config }) {
  const toc =
    config.filter((c) => c.type.name === 'Heading').map((node) => node.props) ||
    [];
  const isDocs = useRouter().asPath.startsWith('/docs');
  const showFooter = true;

  return (
    <div className="document">
      <article>
        <div className="root">
          {children}
          <HorizontalDivider />
          <Footer {...{ landing: showFooter }} />
        </div>
        {isDocs && toc.some((header) => header.level > 1) ? (
          <TableOfContents toc={toc} />
        ) : null}
      </article>
      <style jsx>
        {`
          article {
            background: white;
            padding-top: 4rem;
            width: 80%;
            margin: auto;
            display: flex;
            flex-direction: row;
          }

          .root {
            display: inline-block;
            width: 100%;
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
