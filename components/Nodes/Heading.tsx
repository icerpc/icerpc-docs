// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';
import { LinkIcon } from '@heroicons/react/24/solid';

type Props = {
  id?: string;
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
};

export function Heading({ id = '', level = 1, children, className }: Props) {
  const router = useRouter();
  const Component: any = `h${level}`;
  const isDocs = router.pathname.startsWith('/docs');
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const style = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-semibold'
  };

  const link = (
    <Component
      id={id}
      data-text={children}
      role="presentation"
      className="items-center pt-5 hover:[&>*]:opacity-100"
    >
      <span role="heading" aria-level={level} className={style[level]}>
        {children}
      </span>
      <button
        className="h-5 pl-2 opacity-0 duration-100 ease-in-out group-hover:opacity-100"
        onClick={() => copy(origin + router.pathname + `#${id}`)}
      >
        <LinkIcon className="h-4 w-4 font-bold text-slate-700" />
      </button>
    </Component>
  );

  return isDocs && level !== 1 ? (
    // When the section is hovered, set the  opacity of any child buttons to 100%
    <section id={`${id}`} className="group scroll-mt-20">
      {link}
    </section>
  ) : (
    link
  );
}
