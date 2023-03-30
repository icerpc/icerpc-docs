// Copyright (c) ZeroC, Inc.

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';

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
      className={props.className ?? 'font-medium text-primary'}
      style={style}
    >
      {props.children}
    </Link>
  );
};
