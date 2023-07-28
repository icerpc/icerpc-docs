// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';
import clsx from 'clsx';

import { Divider } from 'components/Divider';
import { IcerpcSlice } from 'components/IcerpcSlice';

type Props = {
  id?: string;
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  icerpcSlice?: boolean;
};

const CopyButton = ({ id }: { id: string }) => {
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

export const Heading = ({
  id = '',
  level = 1,
  children,
  icerpcSlice
}: Props) => {
  const Component: any = `h${level}`;
  const link = (
    <Component
      id={id}
      data-text={children}
      role="presentation"
      className={clsx(
        'mb-2 mt-6 flex items-center  hover:[&>*]:opacity-100',
        level !== 1 && 'group scroll-mt-20'
      )}
    >
      <span role="heading" aria-level={level}>
        {children}
      </span>
      {icerpcSlice && <IcerpcSlice />}
      <CopyButton id={id} />
      {level >= 1 && level <= 3 && <Divider margin="my-4" />}
    </Component>
  );

  return link;
};
