// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LeftColumn = ({ children }: Props) => (
  <div className="my-0 flex w-full flex-col py-2 lg:pr-5 [&>p]:mb-2">
    {children}
  </div>
);

const RightColumn = ({ children }: Props) => (
  <div className="my-0 flex w-full flex-col py-2 lg:pl-5 [&>p]:mb-2">
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
      className={`relative my-2 flex flex-col overflow-auto p-0 py-2 lg:flex-row ${itemAlignment}`}
    >
      <LeftColumn>{leftContent}</LeftColumn>
      <div className="mx-auto my-4 h-px w-[90%] bg-lightBorder dark:bg-darkBorder lg:absolute lg:left-[50%] lg:my-auto lg:h-[90%] lg:w-px" />
      <RightColumn>{rightContent}</RightColumn>
    </div>
  );
}
