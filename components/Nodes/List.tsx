// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  ordered?: boolean;
}

export const List = ({ children, ordered }: Props) => {
  if (ordered) {
    return (
      <ol className="mx-10 list-decimal text-sm marker:mr-2 marker:text-gray-800 dark:marker:text-white [&>li]:mb-4 [&>li]:pl-2 ">
        {children}
      </ol>
    );
  } else {
    return (
      <ul className="mx-10 list-disc text-sm marker:mr-2 marker:text-gray-500 dark:marker:text-white [&>li]:mb-4 [&>li]:pl-2">
        {children}
      </ul>
    );
  }
};
