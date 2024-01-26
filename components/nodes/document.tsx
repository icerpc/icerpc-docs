// Copyright (c) ZeroC, Inc.

import { ReactElement } from 'react';
import { AsideItem, Divider, Title } from 'components';
import { Mode } from 'types';
import { PageHistory, Aside, Feedback } from '@/components/shell';

type Props = {
  children: ReactElement[] | ReactElement;
  title: string;
  description: string;
  path: string;
  headings: any[];
  readingTime?: string;
  mode?: Mode; // The mode of the current page (if any) ex.) /slice1/foo would have a mode of Slice1
  showAside?: boolean;
  showNavigation?: boolean;
};

export const Document = ({
  children,
  title,
  description,
  path,
  readingTime,
  headings,
  showAside = true,
  showNavigation = true
}: Props) => {
  return (
    <div className="flex shrink flex-row justify-center overflow-y-clip lg:justify-start">
      <article className="mx-6 mt-10 size-full max-w-[52rem] md:mx-10 lg:mx-16">
        {true && (
          <Title
            title={title}
            description={description}
            path={path}
            readingTime={readingTime}
          />
        )}
        {
          // eslint-disable-next-line tailwindcss/no-custom-classname
          <div
            style={{
              counterReset: 'step-counter'
            }}
          >
            <>{children}</>
          </div>
        }
        {showNavigation && <PageHistory path={path} />}
        <Divider id="feedback-divider" margin="my-0" />
        <Feedback />
      </article>
      {showAside && (
        <Aside
          asideItems={headings.filter(Boolean) as AsideItem[]}
          path={path}
        />
      )}
    </div>
  );
};
