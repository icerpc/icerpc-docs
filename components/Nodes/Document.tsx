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

type Heading = {
  level: number;
  id: string;
  children: string;
};

const constructToc = (children: ReactNode) => {
  const isHeading = (x: any): x is Heading => {
    return (
      (x as Heading).level !== undefined &&
      (x as Heading).id !== undefined &&
      (x as Heading).children !== undefined
    );
  };
  return (
    (children instanceof Array &&
      children
        .filter((c) => isHeading(c.props))
        .map((c) => c.props as Heading)
        .map((h) => {
          const item: TOCItem = {
            title: h.children,
            id: h.id,
            level: h.level
          };
          return item;
        })) ||
    []
  );
};

export const Document = ({ frontmatter, children }: Props) => {
  // Get the data for the next and previous links
  const path = useRouter().asPath;
  const isDocs = path.startsWith('/docs');
  let showToc = frontmatter?.toc ?? isDocs;
  const toc = constructToc(children);

  return (
    <div className="flex flex-row justify-center overflow-y-clip">
      <article className="flex-row overflow-auto px-14 pt-12 lg:max-w-4xl">
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
      </article>
      {showToc && TableOfContents(toc)}
    </div>
  );
};
