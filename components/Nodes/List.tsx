// Copyright (c) ZeroC, Inc.

import React from 'react';

type Props = {
  children: React.ReactNode;
  ordered?: boolean;
};

export const List = ({ children, ordered }: Props) => {
  if (ordered) {
    return (
      <ol className="mx-5 list-decimal marker:mr-2 marker:text-gray-800 dark:marker:text-white">
        {children}
      </ol>
    );
  } else {
    return (
      <ul className="mx-5 list-disc marker:mr-2 marker:text-gray-500 dark:marker:text-white">
        {children}
      </ul>
    );
  }
};
