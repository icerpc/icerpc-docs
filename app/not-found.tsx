// Copyright (c) ZeroC, Inc.

'use client';

import { useTheme } from 'next-themes';
import Error from 'next/error';
import { Theme } from 'types';

export default function Custom404() {
  const { resolvedTheme } = useTheme();
  return <Error statusCode={404} withDarkMode={resolvedTheme === Theme.Dark} />;
}
