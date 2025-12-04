// Copyright (c) ZeroC, Inc.

import { clsx } from 'clsx';

type Props = {
  margin?: string;
  id?: string;
};
export const Divider = ({ margin, id }: Props) => {
  return (
    <div
      id={id}
      className={clsx(
        'bg-light-border dark:bg-dark-border h-px',
        margin ? margin : 'my-8'
      )}
    />
  );
};
