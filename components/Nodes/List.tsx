// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  ordered?: boolean;
};

export const List = ({ children, ordered }: Props) => {
  if (ordered) {
    return <ol className="m-0 list-none p-0">{children}</ol>;
  } else {
    return (
      <ul className="my-6 ml-12 flex list-disc flex-col gap-4">{children}</ul>
    );
  }
};
