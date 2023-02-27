// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useVersionContext } from 'context/state';
import { Feedback, PageHistory, TableOfContents, TOCItem } from '../Shell/';
import { Footer, Divider } from '..';

interface Props {
  frontmatter: {
    title: string;
    description: string;
    toc?: boolean;
  };
  children: ReactNode;
}

interface Heading {
  level: number;
  id: string;
  children: string;
}

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
  // Get the version
  const { version } = useVersionContext();

  // Get the data for the toc
  const path = useRouter().pathname;
  const isDocs = path.startsWith('/docs');
  let showToc = frontmatter?.toc ?? isDocs;
  const toc = constructToc(children);

  return (
    <div className="flex w-screen flex-row justify-center overflow-y-clip lg:w-[calc(100vw-15rem)]">
      <article className="flex-row overflow-auto px-14 pt-12 lg:max-w-4xl">
        {children}
        {isDocs && (
          <>
            <PageHistory path={path} version={version} />
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
