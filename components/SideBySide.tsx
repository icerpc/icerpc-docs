// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const LeftColumn = ({ children }: Props) => (
  <div className="my-0 flex w-full flex-col border-r border-lightBorder py-2 pr-6 dark:border-darkBorder [&>p]:mb-2">
    {children}
  </div>
);

const RightColumn = ({ children }: Props) => (
  <div className="my-0 flex w-full flex-col py-2 pl-6 [&>p]:mb-2">
    {children}
  </div>
);

interface SideBySideProps {
  children: ReactNode[];
  // Can be "left" or "right"
  weighted: string;
}

export function SideBySide({ children, weighted }: SideBySideProps) {
  const spliceIndex = weighted === 'right' ? 1 : children.length - 1;
  const leftContent = children.slice(0, spliceIndex);
  const rightContent = children.slice(spliceIndex);

  return (
    <div className="my-4 flex flex-row items-center overflow-auto p-0 py-2">
      <LeftColumn>{leftContent}</LeftColumn>
      <RightColumn>{rightContent}</RightColumn>
    </div>
  );
}
