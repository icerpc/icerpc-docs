// Copyright (c) ZeroC, Inc. All rights reserved.

import * as React from 'react';

export function Heading({ id = '', level = 1, children, className }) {
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
}
