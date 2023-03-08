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
import { Title } from 'components/Title';

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

const getOtherSliceVersion = (sliceVersion: SliceVersion): SliceVersion => {
  switch (sliceVersion) {
    case SliceVersion.Slice1:
      return SliceVersion.Slice2;
    case SliceVersion.Slice2:
      return SliceVersion.Slice1;
  }
};

interface Props {
  children: ReactElement[];
  title: string;
  description: string;
  encoding?: SliceVersion;
}

export const Document = ({ children, title, description, encoding }: Props) => {
  const { version } = useVersionContext();
  const router = useRouter();
  const path = router.asPath;

  const isDocs = path.startsWith('/docs');
  const toc = collectHeadings(children, version);

  return (
    <div className="flex shrink flex-row justify-center overflow-y-clip">
      <article className="mx-6 mt-10 flex max-w-[52rem] flex-col justify-center md:mx-10 lg:mx-20">
        {encoding ? (
          <>
            <VersionSection version={encoding}>{children}</VersionSection>
            <VersionSection version={getOtherSliceVersion(encoding)}>
              {/* A container div that fills the full width and height of parent */}
              <div className="h-full w-full">
                <Title
                  title={title}
                  description={description}
                  encoding={encoding}
                />

                <h1 className="mt-20 text-2xl font-extrabold text-[#333333]">
                  This page is not available in this version of the Slice
                  documentation
                </h1>
                <Divider />
                <h2 className="my-3 text-sm text-[var(--text-color-secondary)]">
                  This page is only available in the{' '}
                  {encoding == SliceVersion.Slice2 ? 'Slice 2' : 'Slice 1'}{' '}
                  version of the documentation.
                </h2>
              </div>
            </VersionSection>
          </>
        ) : (
          <>{children}</>
        )}
        <PageHistory path={path} version={version} />
        <Divider />
        <Feedback />
        {/* <Footer /> */}
      </article>
      {isDocs && TableOfContents(toc)}
    </div>
  );
};
