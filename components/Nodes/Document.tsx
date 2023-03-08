// Copyright (c) ZeroC, Inc.

import React, { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useVersionContext } from 'context/state';
import {
  PageHistory,
  Footer,
  Feedback,
  TOCItem,
  TableOfContents
} from 'components/Shell';
import { Divider } from 'components/Divider';
import { SliceVersion } from 'types';
import { VersionSection } from 'components/SliceVersionSection';

type Heading = {
  level: number;
  id: string;
  children: string;
};

const versionFilter = (node: ReactElement, version: SliceVersion) => {
  if (node.type == VersionSection)
    if (node.props.version === version) return true;
    else return false;
  return true;
};

const flattenNodes = (node: ReactElement) => {
  if (node.props?.version) return node.props.children;
  else return node;
};

const collectHeadings = (
  children: ReactElement[],
  version: SliceVersion
): TOCItem[] => {
  const isHeading = (x: any): x is Heading => {
    return (
      (x as Heading).level !== undefined &&
      (x as Heading).id !== undefined &&
      (x as Heading).children !== undefined
    );
  };

  return (
    (children instanceof Array &&
      (children
        .filter((c) => versionFilter(c, version)) // Filter out nodes that don't match the version
        .flatMap((c) => flattenNodes(c)) // Flatten the nodes
        .filter((c) => isHeading(c.props))
        .map((c) => {
          const heading = c.props as Heading;
          return {
            title: heading.children,
            id: heading.id,
            level: heading.level
          };
        }) as TOCItem[])) ||
    []
  );
};

export const Document = ({
  children,
  encoding
}: {
  children: ReactElement[];
  encoding?: SliceVersion;
}) => {
  // Get the version
  const { version } = useVersionContext();
  // Get the data for the next and previous links

  const router = useRouter();
  const path = router.asPath;

  if (encoding && encoding !== version) {
    router.push('/docs/slice');
  }

  const isDocs = path.startsWith('/docs');
  const toc = collectHeadings(children, version);

  return (
    <div className="flex shrink flex-row justify-center overflow-y-clip">
      <article className="mx-6 mt-10 flex max-w-[52rem] flex-col justify-center md:mx-10 lg:mx-20">
        {children}
        {isDocs && (
          <>
            <PageHistory path={path} version={version} />
            <Divider />
            <Feedback />
          </>
        )}
        <Divider />
        {/* <Footer /> */}
      </article>
      {isDocs && TableOfContents(toc)}
    </div>
  );
};
