// Copyright (c) ZeroC, Inc.

import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { Divider, EncodingSection, TOCItem, Title } from 'components';
import { Encoding } from 'types';
import { useEncoding } from 'context/state';
import { PageHistory, TableOfContents, Feedback } from 'components/Shell';
import { collectHeadings } from 'utils/collectHeadings';
import { baseUrls } from 'data/side-bar-data';

type Props = {
  children: ReactElement[];
  title: string;
  description: string;
  readingTime: string;
  encoding?: Encoding;
  showToc?: boolean;
};

export const Document = ({
  children,
  title,
  description,
  readingTime,
  encoding,
  showToc = true
}: Props) => {
  const { encoding: currentEncoding, setEncoding } = useEncoding();
  const [toc, setToc] = React.useState<TOCItem[]>([]);
  const router = useRouter();
  const path = router.asPath;
  const isBaseUrl = baseUrls.some((baseUrl) => path == baseUrl);

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

  // A variable that is only true if the current encoding matches the encoding of the document (if specified).
  const isCurrentEncoding = encoding ? encoding === currentEncoding : true;

  return (
    <div className="flex min-h-screen shrink flex-row justify-center overflow-y-clip lg:justify-start">
      <article className="mx-6 mt-10 h-full w-full max-w-[52rem] md:mx-10 lg:mx-16">
        {isCurrentEncoding && (
          <Title
            title={title}
            description={description}
            readingTime={readingTime}
            showBreadcrumbs={!isBaseUrl}
          />
        )}
        {encoding ? (
          <>
            <EncodingSection encoding={encoding}>{children}</EncodingSection>
            <EncodingSection encoding={getAltEncoding(encoding)}>
              <div className="h-[35vh] w-full">
                <h1 className="mt-20 text-3xl font-extrabold text-[#333333] dark:text-white">
                  {encoding} Only content.
                </h1>
                <p className="my-3 text-[var(--text-color-secondary)]  dark:text-white">
                  This page does not have any content available for the
                  specified encoding.
                </p>
              </div>
            </EncodingSection>
          </>
        ) : (
          <>{children}</>
        )}
        <PageHistory path={path} encoding={currentEncoding} />
        <Divider />
        <Feedback />
      </article>
      {showToc && TableOfContents(toc)}
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
