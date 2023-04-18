// Copyright (c) ZeroC, Inc.

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  href: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export const AppLink = (props: Props) => {
  const target =
    props.target || (props.href.startsWith('http') ? '_blank' : undefined);
  const style = props.style || {
    textUnderlineOffset: '5px'
  };

  return (
    <Link
      {...props}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      className={clsx(
        props.className ??
          'font-medium text-primary hover:text-[rgb(64,131,193)]',
        props.href.includes('api.testing.zeroc.com') && [
          'after:ml-[3px] after:mr-[1px] after:rounded-sm after:bg-primary after:px-[2px] after:py-[1px]',
          "after:align-middle after:text-[8px] after:font-semibold after:text-white after:content-['API']",
          'dark:after:bg-primary/80'
        ]
      )}
      style={style}
    >
      {props.children}
    </Link>
  );
};
