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
      <table className="w-full table-fixed border-collapse rounded prose-headings:font-semibold">
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
        'prose-sm pl-4',
        children !== undefined &&
        'border-b-[1.5px] border-lightBorder py-3 dark:border-darkBorder',
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
  dividers?: boolean;
};

export const TD = ({ align, children, dividers }: TDProps) => {
  return (
    <td
      className={clsx(
        'prose-sm rounded py-3 pl-4 align-top',
        dividers && 'border border-lightBorder/60 dark:border-darkBorder/40',
        textAlignment(align)
      )}
    >
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="code-container">{children}</div>
      <style jsx>{`
        .code-container {
          display: inline-block;
        }
        .code-container :global(code) {
          overflow-x: none;
        }
      `}</style>
    </td>
  );
};
