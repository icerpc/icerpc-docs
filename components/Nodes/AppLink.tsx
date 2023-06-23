// Copyright (c) ZeroC, Inc.

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  href: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export const AppLink = (props: Props) => {
  // If props.href is an API link, then resolve it to the API documentation
  // on docs.testing.zeroc.com/api.
  const href = isApiLink(props.href) ? resolveApiLink(props.href) : props.href;

  // If the link is external, then open it in a new tab.
  const target =
    props.target ||
    (props.href.startsWith('http') || isApiLink(props.href)
      ? '_blank'
      : undefined);
  const style = props.style || {
    textUnderlineOffset: '5px'
  };

  return (
    <Link
      {...props}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      className={clsx(
        props.className ??
          'font-medium text-primary hover:text-[rgb(64,131,193)]',
        href.includes('docs.testing.zeroc.com/api') && [
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

const isApiLink = (href: string) => {
  const languages = ['csharp', 'rust'];
  return (
    languages.some((lang) => href.startsWith(`${lang}:`)) &&
    href.split(':').length > 1
  );
};

const resolveApiLink = (href: string) => {
  const [lang, ...rest] = href.split(':');
  const [module, method] = rest.join('.').split('#'); // split module and method names
  const apiHref = `https://docs.testing.zeroc.com/api/${lang}/api/${module}.html${
    method ? `#${method}` : ''
  }`; // include "#" and method name if it exists
  return apiHref;
};
