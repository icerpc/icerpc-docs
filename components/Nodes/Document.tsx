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
      <article className="flex max-w-4xl grow flex-row justify-between bg-white pr-8 pl-14 pt-12 dark:bg-[rgb(33,35,39)] lg:max-w-none">
        <div className="mr-4 inline-block w-full">
          {children}
          {isDocs && (
            <>
              <PageHistory />
              <Divider />
              <Feedback />
            </>
          )}
          <Divider />
          <Footer />
        </div>
        {showToc && TableOfContents(toc)}
      </article>
    </>
  );
};
