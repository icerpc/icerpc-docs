// Copyright (c) ZeroC, Inc.

import { useTheme } from 'next-themes';
import Error from 'next/error';
import { Theme } from 'types';

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  return <Error statusCode={404} withDarkMode={resolvedTheme === Theme.Dark} />;
}
