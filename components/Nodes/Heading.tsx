// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';

type Props = {
  id?: string;
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
};

export const Heading = ({ id = '', level = 1, children, className }: Props) => {
  const style = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-semibold'
  };
  return React.createElement(
    `h${level}`,
    {
      id,
      className:
        ['heading', className].filter(Boolean).join(' ') + ' ' + style[level]
    },
    children
  );
};
