// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  isCodeblocks: boolean;
};

const LeftColumn = ({ children, isCodeblocks }: Props) => (
  <div
    className={clsx(
      'my-0 flex w-full flex-col py-2 [&>p]:mb-2',
      isCodeblocks ? 'lg:pr-2' : 'lg:pr-5'
    )}
  >
    {children}
  </div>
);

const RightColumn = ({ children, isCodeblocks }: Props) => (
  <div
    className={clsx(
      'my-0 flex w-full flex-col py-2 [&>p]:mb-2',
      isCodeblocks ? 'lg:pl-2' : 'lg:pl-5'
    )}
  >
    {children}
  </div>
);

type AsideProps = {
  children: ReactNode[];
  // Can be "left" or "right"
  weighted: string;
  // Can be "top" or "center"
  alignment?: string;
};

export function Aside({ children, weighted, alignment }: AsideProps) {
  // Check if all children are CodeBlocks to determine if we need to reduce
  // the padding on the left and right columns
  const isCodeblocks = children.every((child) => {
    if (React.isValidElement(child)) {
      const type = child.type;
      return typeof type === 'function' && type.name === 'CodeBlock';
    }
    return false;
  });

  const spliceIndex = weighted === 'right' ? 1 : children.length - 1;
  const leftContent = children.slice(0, spliceIndex);
  const rightContent = children.slice(spliceIndex);
  const itemAlignment = alignment === 'center' ? 'items-center' : 'items-start';

  return (
    <div
      className={`relative my-2 flex flex-col overflow-auto p-0 py-2 lg:flex-row ${itemAlignment}`}
    >
      <LeftColumn isCodeblocks={isCodeblocks}>{leftContent}</LeftColumn>
      <div className="mx-auto my-4 h-px w-[90%] bg-light-border dark:bg-dark-border lg:absolute lg:left-1/2 lg:my-auto lg:h-[90%] lg:w-px" />
      <RightColumn isCodeblocks={isCodeblocks}>{rightContent}</RightColumn>
    </div>
  );
}
