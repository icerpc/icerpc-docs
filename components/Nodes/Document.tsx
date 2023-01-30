// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Footer, Divider } from '..';
import { Feedback } from '../Shell/Feedback';
import { PageHistory } from '../Shell/PageHistory';
import { TableOfContents, TOC, TOCItem } from '../Shell/TableOfContents';

type Props = {
  frontmatter: {
    title: string;
    description: string;
    toc?: boolean;
  };
  children: ReactNode;
};

export const Document = ({ frontmatter, children }: Props) => {
  // Get the data for the next and previous links
  const path = useRouter().asPath;
  const isDocs = path.startsWith('/docs');
  let showToc = frontmatter?.toc ?? isDocs;

  // The table of contents is a list of headings, note that the title is stored under the key children
  const toc: TOC =
    (showToc &&
      children instanceof Array &&
      children
        .filter((c) => c.type.name === 'Heading')
        .map((node) => node.props)
        .map((node) => {
          const item: TOCItem = {
            title: node.children,
            id: node.id,
            level: node.level
          };
          return item;
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
        {showToc && TableOfContents(toc)}
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
};
