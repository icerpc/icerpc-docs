// Copyright (c) ZeroC, Inc.

import { ReactElement, useEffect, useState } from 'react';

import { Divider, ModeSection, AsideItem, Title } from 'components';
import { Mode } from 'types';
import { useMode } from 'context/state';
import { PageHistory, Aside, Feedback } from 'components/Shell';
import { collectHeadings } from 'utils/collectHeadings';

type Props = {
  children: ReactElement[];
  title: string;
  description: string;
  readingTime: string;
  mode?: Mode;
  showAside?: boolean;
};

export const Document = ({
  children,
  title,
  description,
  readingTime,
  mode,
  showAside = true
}: Props) => {

  const { mode: currentMode } = useMode();
  const [asideItems, setAsideItems] = useState<AsideItem[]>([]);

  useEffect(() => {
    setAsideItems(collectHeadings(children, currentMode));

  }, [children, currentMode]);

  // A variable that is only true if the current mode matches the mode of the document (if specified).
  const isCurrentMode = mode ? mode === currentMode : true;

  return (
    <div className="flex min-h-screen shrink flex-row justify-center overflow-y-clip lg:justify-start">
      <article className="mx-6 mt-10 h-full w-full max-w-[52rem] md:mx-10 lg:mx-16">
        {isCurrentMode && (
          <Title
            title={title}
            description={description}
            readingTime={readingTime}
          />
        )}
        {mode ? (
          <>
            <ModeSection mode={mode}>{children}</ModeSection>
            <ModeSection mode={getAltMode(mode)}>
              <div className="h-[35vh] w-full">
                <h1 className="mt-20 text-3xl font-extrabold text-[#333333] dark:text-white">
                  {mode} Only content.
                </h1>
                <p className="my-3 text-[var(--text-color-secondary)]  dark:text-white">
                  This page does not have any content available for the
                  specified mode.
                </p>
              </div>
            </ModeSection>
          </>
        ) : (
          <>{children}</>
        )}
        <PageHistory />
        <Divider />
        <Feedback />
      </article>
      {showAside && <Aside asideItems={asideItems} />}
    </div>
  );
};

const getAltMode = (mode: Mode): Mode => {
  const { Slice1, Slice2 } = Mode;
  switch (mode) {
    case Slice1:
      return Slice2;
    case Slice2:
      return Slice1;
  }
};
