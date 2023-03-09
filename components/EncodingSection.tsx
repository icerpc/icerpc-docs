// Copyright (c) ZeroC, Inc.

import { useEncoding } from 'context/state';
import React, { useEffect, ReactNode } from 'react';
import { Encoding } from 'types';

interface Props {
  encoding: Encoding;
  children: ReactNode;
}

export const EncodingSection = ({ encoding, children }: Props) => {
  if (!Object.values(Encoding).includes(encoding)) {
    throw new Error(
      `Invalid slice encoding '${encoding}'. The encoding must be one of the following options: ${Object.values(
        Encoding
      )}`
    );
  }

  const { encoding: currentEncoding } = useEncoding();
  const [currentTab, setCurrentTab] = React.useState(currentEncoding);

  useEffect(() => {
    switch (currentEncoding) {
      case Encoding.Slice1:
        setCurrentTab(currentEncoding);
        break;
      case Encoding.Slice2:
        setCurrentTab(currentEncoding);
        break;
    }
  }, [currentEncoding]);

  return encoding == currentTab ? <>{children}</> : null;
};
