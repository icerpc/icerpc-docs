// Copyright (c) ZeroC, Inc.

import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { useEncoding } from 'context/state';
import {
  PageHistory,
  Footer,
  Feedback,
  TOCItem,
  TableOfContents
} from 'components/Shell';
import { Divider } from 'components/Divider';
import { Encoding } from 'types';
import { EncodingSection } from 'components/EncodingSection';
import { Title } from 'components/Title';

type Heading = {
  level: number;
  id: string;
  children: string;
};

const encodingFilter = (node: ReactElement, encoding: Encoding) => {
  if (node.type == EncodingSection)
    if (node.props.encoding === encoding) return true;
    else return false;
  return true;
};

const flattenNodes = (node: ReactElement) => {
  if (node.props?.encoding) return node.props.children;
  else return node;
};

const collectHeadings = (
  children: ReactElement[],
  encoding: Encoding
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
        .filter((c) => encodingFilter(c, encoding)) // Filter out nodes that don't match the encoding
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

const getAltEncoding = (encoding: Encoding): Encoding => {
  switch (encoding) {
    case Encoding.Slice1:
      return Encoding.Slice2;
    case Encoding.Slice2:
      return Encoding.Slice1;
  }
};

interface Props {
  children: ReactElement[];
  title: string;
  description: string;
  encoding?: Encoding;
}

export const Document = ({ children, title, description, encoding }: Props) => {
  const { encoding: currentEncoding } = useEncoding();
  const router = useRouter();
  const path = router.asPath;

  const isDocs = path.startsWith('/docs');
  const toc = collectHeadings(children, currentEncoding);

  return (
    <div className="flex min-h-screen shrink flex-row justify-center overflow-y-clip">
      <article className="mx-6 mt-10 flex h-full w-full max-w-[52rem] flex-col justify-center md:mx-10 lg:mx-20">
        <Title title={title} description={description} />
        {encoding ? (
          <>
            <EncodingSection encoding={encoding}>{children}</EncodingSection>
            <EncodingSection encoding={getAltEncoding(encoding)}>
              <UnsupportedEncoding encoding={encoding} />
            </EncodingSection>
          </>
        ) : (
          <>{children}</>
        )}
        <PageHistory path={path} encoding={currentEncoding} />
        <Divider />
        <Feedback />
        {/* <Footer /> */}
      </article>
      {isDocs && TableOfContents(toc)}
    </div>
  );
};

interface UnsupportedEncodingProps {
  encoding: Encoding;
}

const UnsupportedEncoding = ({ encoding }: UnsupportedEncodingProps) => {
  return (
    <div className="h-full w-full">
      <h1 className="mt-20 text-2xl font-extrabold text-[#333333]">
        This page does not have any content available for the specified
        encoding.
      </h1>
      <Divider />
      <h2 className="my-3 text-sm text-[var(--text-color-secondary)]">
        This page is only available for the {encoding} encoding.
      </h2>
    </div>
  );
};
