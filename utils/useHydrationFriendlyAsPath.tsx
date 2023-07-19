// Copyright (c) ZeroC, Inc.

import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// See https://github.com/vercel/next.js/issues/25202
export const useHydrationFriendlyAsPath = () => {
  const { asPath } = useRouter();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return isMountedRef.current ? asPath : asPath.split('#', 1)[0]!;
};
