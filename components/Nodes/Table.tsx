// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface TableProps {
  children: ReactNode[];
}

// Convert the align prop to a Tailwind CSS class
// Align defaults to undefined, which is left aligned, and can be set to right or center
const textAlignment = (align?: string): string => {
  if (align === 'center') {
    return 'text-center';
  } else if (align === 'right') {
    return 'text-right';
  } else {
    return 'text-left';
  }
};

export const Table = ({ children }: TableProps) => {
  return (
    <div
      className={clsx(
        'mb-4 min-w-full rounded-xl border border-lightBorder bg-[#FAFAFA]  shadow-sm',
        'dark:border-darkBorder dark:bg-[rgb(33,35,39)]'
      )}
    >
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
};

interface THProps {
  align?: 'center' | 'right';
  children: ReactNode;
}

export const TH = ({ align, children }: THProps) => {
  return (
    <th className={clsx('px-5 py-3', textAlignment(align))}>{children}</th>
  );
};

export const TR = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="border-b border-lightBorder text-gray-800 dark:border-darkBorder dark:text-white">
      {children}
    </tr>
  );
};

interface TDProps {
  align?: 'center' | 'right';
  children: ReactNode;
}

export const TD = ({ align, children }: TDProps) => {
  return (
    <td className={clsx('rounded px-5 py-3', textAlignment(align))}>
      {children}
    </td>
  );
};
