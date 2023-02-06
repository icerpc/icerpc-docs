// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode } from 'react';

type Props = {
  children: ReactNode[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Table = ({ children }: Props) => {
  return (
    <table
      className={classNames(
        'min-w-full',
        '[&>thead]:border-b',
        '[&>th]:px-6 [&>th]:py-4 [&>th]:text-left [&>th]:text-sm [&>th]:font-medium [&>th]:text-gray-900',
        '[&>tbody>tr]::bg-gray-800 [&>tbody>tr]:border-b [&>tbody>tr]:border-gray-700 [&>tbody>tr]:bg-white'
      )}
    >
      {children}
    </table>
  );
};
