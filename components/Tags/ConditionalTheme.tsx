// Copyright (c) ZeroC, Inc.

import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Theme } from 'types';

type Props = {
  theme: Theme;
  children: ReactNode;
};

export const ConditionalTheme = ({ theme, children }: Props) => {
  const { resolvedTheme } = useTheme();
  const [isThemeResolved, setIsThemeResolved] = useState(false);

  // Ensure that the theme is resolved before rendering the children to avoid SSR issues
  useEffect(() => {
    setIsThemeResolved(true);
  }, [resolvedTheme]);

  return (
    <section id={`theme-conditional-${theme.toString()}`}>
      {isThemeResolved && resolvedTheme === theme && children}
    </section>
  );
};
