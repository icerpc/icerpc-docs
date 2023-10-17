// Copyright (c) ZeroC, Inc.

'use client';

import { LinkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import copy from 'copy-to-clipboard';

export const HeadingCopyButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <button
      className="h-5 pl-2 opacity-0 duration-100 ease-in-out group-hover:opacity-100"
      aria-label="Copy link to heading"
      onClick={() => {
        copy(window.location.origin + window.location.pathname + `#${id}`);
        router.push(`#${id}`);
      }}
    >
      <LinkIcon className="h-4 w-4 font-bold text-slate-700 dark:text-slate-300" />
    </button>
  );
};
