// Copyright (c) ZeroC, Inc.

import { clsx } from 'clsx';

export const Divider = ({ margin }: { margin?: string }) => {
  return (
    <div
      className={clsx(
        'h-[1px] bg-lightBorder dark:bg-darkBorder',
        margin ? margin : 'my-8'
      )}
    />
  );
};
