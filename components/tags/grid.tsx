// Copyright (c) ZeroC, Inc.

import { ReactNode, Fragment, Children } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  columns?: number;
};

export const Grid = ({ children }: Props) => {
  return (
    <>
      <div
        key={children?.toString() ?? 'grid'}
        className={clsx('my-8 grid grid-cols-1 gap-4 md:grid-cols-3')}
      >
        {Children.toArray(children).map((child, index) => {
          return <Fragment key={index}>{child}</Fragment>;
        })}
      </div>
    </>
  );
};
