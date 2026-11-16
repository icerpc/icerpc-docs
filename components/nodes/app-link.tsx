// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode, CSSProperties, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePath } from '@/context/state';
import { isApiLink, isExternalLink, resolveLink } from '@/lib/links';

type AppLinkProps = {
  href: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
  children: ReactNode;
};

// Set of classes to apply when the link is an API link.
const apiClasses = [
  'after:ml-[3px] after:mr-px after:rounded-xs after:bg-primary after:px-[2px] after:py-px',
  "after:align-middle after:text-[8px] after:font-semibold after:text-white after:content-['API']",
  'dark:after:bg-primary/80'
];

// Default styles for the link.
const defaultStyle: CSSProperties = { textUnderlineOffset: '5px' };

export const AppLink = ({
  href: originalHref,
  target: target,
  className = 'font-medium text-primary hover:text-[rgb(64,131,193)]',
  style: originalStyle,
  showArrow = true,
  children
}: AppLinkProps) => {
  const path = usePath();

  const href = useMemo(
    () => resolveLink(originalHref, path),
    [originalHref, path]
  );

  const style = { ...defaultStyle, ...originalStyle };

  const prefetch =
    isExternalLink(originalHref) || isApiLink(originalHref) ? false : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      prefetch={prefetch}
      className={className}
      style={style}
    >
      <span
        className={clsx(
          isApiLink(originalHref) && apiClasses,
          isExternalLink(originalHref) &&
            showArrow &&
            'with-arrow whitespace-nowrap'
        )}
      >
        {isApiLink(originalHref) ? <code>{children}</code> : children}
      </span>

      <style jsx>{`
        .with-arrow::after {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('/images/link_arrow.svg');
          background-repeat: no-repeat;
          background-size: cover;
          transform: scale(0.52);
          transform-origin: 55% 70%;
        }

        :global(html.dark) .with-arrow::after {
          background-image: url('/images/link_arrow_dark.svg');
        }
      `}</style>
    </Link>
  );
};
