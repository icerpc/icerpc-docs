// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';
import { clsx } from 'clsx';

type TableProps = {
  children: ReactNode[];
};

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
    <div className="mb-10 min-w-full">
      <table className="w-full border-collapse prose-headings:font-semibold">
        {children}
      </table>
    </div>
  );
};

type THProps = {
  align?: 'center' | 'right';
  children: ReactNode;
};

export const TH = ({ align, children }: THProps) => {
  return (
    <th
      className={clsx(
        'prose-sm border-b-[1.5px] border-lightBorder py-3 dark:border-darkBorder',
        textAlignment(align)
      )}
    >
      {children}
    </th>
  );
};

export const TR = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="prose-sm border-b border-lightBorder/60 text-gray-800 dark:border-darkBorder/40 dark:text-white">
      {children}
    </tr>
  );
};

type TDProps = {
  align?: 'center' | 'right';
  children: ReactNode;
};

export const TD = ({ align, children }: TDProps) => {
  return (
    <td className={clsx('prose-sm rounded py-3', textAlignment(align))}>
      {children}
    </td>
  );
};
