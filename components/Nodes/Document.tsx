// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useVersionContext } from 'context/state';
import { PageHistory, Footer, Feedback } from 'components/Shell';
import { Divider } from 'components/Divider';

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

export const Document = ({ children }: Props) => {
  // Get the version
  const { version } = useVersionContext();

  // Get the data for the toc
  const path = useRouter().pathname;
  const isDocs = path.startsWith('/docs');

  return (
    <article className="mx-10 mt-10 flex flex-col justify-center px-4">
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
  );
};
