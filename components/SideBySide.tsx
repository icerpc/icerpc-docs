// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LeftColumn = ({ children }: Props) => (
  <div className="my-0 flex w-full flex-col py-2 pr-5 [&>p]:mb-2">
    {children}
  </div>
);

const RightColumn = ({ children }: Props) => (
  <div className="my-0 flex w-full flex-col py-2 pl-5 [&>p]:mb-2">
    {children}
  </div>
);

type SideBySideProps = {
  children: ReactNode[];
  // Can be "left" or "right"
  weighted: string;
  // Can be "top" or "center"
  alignment?: string;
};

export function SideBySide({ children, weighted, alignment }: SideBySideProps) {
  const spliceIndex = weighted === 'right' ? 1 : children.length - 1;
  const leftContent = children.slice(0, spliceIndex);
  const rightContent = children.slice(spliceIndex);
  const itemAlignment = alignment === 'center' ? 'items-center' : 'items-start';

  return (
    <div
      className={`relative my-4 flex flex-row overflow-auto p-0 py-2 ${itemAlignment}`}
    >
      <LeftColumn>{leftContent}</LeftColumn>
      <div className="absolute left-[50%] my-auto mb-4 h-[90%] w-px bg-lightBorder dark:bg-darkBorder" />
      <RightColumn>{rightContent}</RightColumn>
    </div>
  );
}
