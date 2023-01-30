// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode } from 'react';

type Props = { children: ReactNode };

const LeftColumn = ({ children }: Props) => (
  <div className="flex w-full flex-col border-r-0 border-b-2 pr-10 pl-0 pb-12 lg:w-1/2 lg:border-b-0 lg:border-r-2 lg:pb-0 lg:pr-10">
    {children}
  </div>
);

const RightColumn = ({ children }: Props) => (
  <div className="flex w-full flex-col pt-8 pb-2 pl-12 lg:py-0 lg:pr-10 ">
    {children}
  </div>
);

export function SideBySide(children: ReactNode[]) {
  const [first, ...rest] = children;
  return (
    <div className="mt-4 flex w-full flex-col items-center rounded p-0 lg:flex-row">
      <LeftColumn>{first}</LeftColumn>
      <RightColumn>{rest}</RightColumn>
    </div>
  );
}
