// Copyright (c) ZeroC, Inc.

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Encoding } from 'types';
import { useEncoding } from 'context/state';

type Props = {
  href: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export const AppLink = (props: Props) => {
  const router = useRouter();
  const { encoding, setEncoding} = useEncoding();
  const currentPagePath = router.asPath; // Use router.asPath as currentPagePath if not provided

  const resolveRelativeLink = (href: string) => {
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('/')) {
      return href; // Absolute link, return as is
    }

    if (href.startsWith('#')) {
      const currentPath = currentPagePath.split('#')[0];
      return `${currentPath}${href}`;
    }

    const currentDir = currentPagePath.replace(/\/[^/]+$/, '');
    const resolvedPath = `${currentDir}/${href}`;
    return resolvedPath;
  };

  const href = isApiLink(props.href)
    ? resolveApiLink(props.href)
    : resolveRelativeLink(props.href); // Use resolveRelativeLink for href

  // Rest of the code remains the same
  const target =
    props.target ||
    (props.href.startsWith('http') || isApiLink(props.href) ? '_blank' : undefined);
  const style = props.style || {
    textUnderlineOffset: '5px',
  };

  return (
    <Link
      {...props}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onClick={() => {
        // If the user navigates to a link with a different encoding, update the encoding
        if (isSliceLink(href)) {
          // Get the segments of the href path
          const pathSegments = href.split('/');
          const hrefEncoding = pathSegments.find((segment) => segment === 'slice1' || segment === 'slice2') === 'slice1' ? Encoding.Slice1 : Encoding.Slice2;

          // If the href encoding is different from the current encoding, update the encoding
          if (hrefEncoding !== encoding) {
            setEncoding(hrefEncoding);
          }
        }
      }}
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

const isSliceLink = (href: string) => {
  // Check if the link contains .../slice1/... or .../slice2/... or slice1/... or slice2/...
  return href.match(/(^|\/)slice[1-2]\//);
}


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
