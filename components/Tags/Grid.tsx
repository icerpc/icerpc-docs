// Copyright (c) ZeroC, Inc.

import { ReactNode, Fragment, Children } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  columns?: number;
};

export const Grid = ({ children, columns = 3 }: Props) => {
  return (
    <>
      <div
        key={children?.toString() ?? 'grid'}
        className={clsx(
          'my-8 grid gap-4',
          columns !== undefined ? `lg:grid-cols-${columns}` : 'lg:grid-cols-1'
        )}
      >
        {Children.toArray(children).map((child, index) => {
          return <Fragment key={index}>{child}</Fragment>;
        })}
      </div>
    </>
  );
};
