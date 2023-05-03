// Copyright (c) ZeroC, Inc.

import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { Divider, EncodingSection, TOCItem, Title } from 'components';
import { Encoding } from 'types';
import { useEncoding } from 'context/state';
import { PageHistory, TableOfContents, Feedback } from 'components/Shell';
import { collectHeadings } from 'utils/collectHeadings';

type Props = {
  children: ReactElement[];
  title: string;
  description: string;
  encoding?: Encoding;
};

export const Document = ({ children, title, description, encoding }: Props) => {
  const { encoding: currentEncoding, setEncoding } = useEncoding();
  const [toc, setToc] = React.useState<TOCItem[]>([]);
  const router = useRouter();
  const path = router.asPath;

  const isDocs = path.startsWith('/docs');

  // If the encoding is specified in the url, try to set the version to the specified encoding.
  const { query } = queryString.parseUrl(path, {
    parseFragmentIdentifier: true
  });
  const encodingFromQuery: string | null = (() => {
    const capitalize = (str?: string) => {
      if (!str) return null;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return capitalize(query.encoding?.toString());
  })();
  if (
    Object.keys(Encoding).includes(encodingFromQuery as keyof typeof Encoding)
  ) {
    setEncoding(encodingFromQuery as Encoding);
  }

  React.useEffect(() => {
    setToc(collectHeadings(children, currentEncoding));
  }, [children, currentEncoding]);

  return (
    <div className="flex min-h-screen shrink flex-row justify-center overflow-y-clip dark:bg-[rgb(21,21,22)]">
      <article className="mx-6 mt-10 h-full w-full max-w-[52rem] md:mx-10 lg:mx-16">
        {isDocs && <Title title={title} description={description} />}
        {encoding ? (
          <>
            <EncodingSection encoding={encoding}>{children}</EncodingSection>
            <EncodingSection encoding={getAltEncoding(encoding)}>
              <div className="h-full w-full">
                <h1 className="mt-20 text-2xl font-extrabold text-[#333333]">
                  This page does not have any content available for the
                  specified encoding.
                </h1>
                <Divider />
                <h2 className="my-3 text-sm text-[var(--text-color-secondary)]">
                  This page is only available for the {encoding} encoding.
                </h2>
              </div>
            </EncodingSection>
          </>
        ) : (
          <>{children}</>
        )}
        <PageHistory path={path} encoding={currentEncoding} />
        {isDocs && (
          <>
            <Divider />
            <Feedback />
          </>
        )}
      </article>
      {isDocs && TableOfContents(toc)}
    </div>
  );
};

const getAltEncoding = (encoding: Encoding): Encoding => {
  const { Slice1, Slice2 } = Encoding;
  switch (encoding) {
    case Slice1:
      return Slice2;
    case Slice2:
      return Slice1;
  }
};
