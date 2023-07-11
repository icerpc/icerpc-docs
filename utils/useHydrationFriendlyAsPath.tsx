// Copyright (c) ZeroC, Inc.

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// See https://github.com/vercel/next.js/issues/25202
export const useHydrationFriendlyAsPath = () => {
  const { asPath } = useRouter();
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ssr ? asPath.split('#', 1)[0]! : asPath;
};
