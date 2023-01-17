// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';

export function AppLink(props) {
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
      className={props.className + '' + 'text-primary'}
      style={style}
    >
      {props.children}
    </Link>
  );
}
