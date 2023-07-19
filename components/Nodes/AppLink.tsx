// Copyright (c) ZeroC, Inc.

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Mode } from 'types';
import { useMode } from 'context/state';

type AppLinkProps = {
  href: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

// Set of classes to apply when the link is an API link.
const apiClasses = [
  'after:ml-[3px] after:mr-[1px] after:rounded-sm after:bg-primary after:px-[2px] after:py-[1px]',
  "after:align-middle after:text-[8px] after:font-semibold after:text-white after:content-['API']",
  'dark:after:bg-primary/80'
];

// Default styles for the link.
const defaultStyle: CSSProperties = { textUnderlineOffset: '5px' };

export const AppLink = ({
  href: originalHref,
  target: originalTarget,
  className = 'font-medium text-primary hover:text-[rgb(64,131,193)]',
  style: originalStyle,
  children
}: AppLinkProps) => {
  const router = useRouter();
  const { mode, setMode } = useMode();

  const href = isApiLink(originalHref)
    ? resolveApiLink(originalHref)
    : resolveRelativeLink(originalHref, router.asPath);

  const style = { ...defaultStyle, ...originalStyle };

  // Determine the target for the link, e.g., "_blank" for external links.
  const target =
    originalTarget ||
    (isExternalLink(originalHref) || isApiLink(originalHref)
      ? '_blank'
      : undefined);

  const shouldPrefetch = !isApiLink(originalHref);

  /**
   * Handles the click on the link, specifically for slice links.
   */
  const handleLinkClick = () => {
    if (isSliceLink(href)) {
      const hrefMode = href.includes('slice1') ? Mode.Slice1 : Mode.Slice2;
      if (hrefMode !== mode) {
        setMode(hrefMode);
      }
    }
  };

  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      prefetch={shouldPrefetch}
      onClick={handleLinkClick}
      className={clsx(
        className,
        href.includes('docs.testing.zeroc.com/api') && apiClasses
      )}
      style={style}
    >
      {children}
    </Link>
  );
};

// Utility Functions

/**
 * Check if a link is external.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's an external link, false otherwise.
 */
const isExternalLink = (href: string) =>
  href.startsWith('http://') || href.startsWith('https://');

/**
 * Determines if a link is a slice link.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's a slice link, false otherwise.
 */
const isSliceLink = (href: string) => /(^|\/)slice[1-2]\//.test(href);

/**
 * Determines if a link is an API link.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's an API link, false otherwise.
 */
const isApiLink = (href: string) => {
  const supportedLanguages = ['csharp', 'rust'];
  return (
    supportedLanguages.some((lang) => href.startsWith(`${lang}:`)) &&
    href.split(':').length > 1
  );
};

/**
 * Resolves an API link to its full URL.
 * @param {string} href - The original API link.
 * @returns {string} - The resolved API link.
 */
const resolveApiLink = (href: string) => {
  const [language, ...rest] = href.split(':');
  const [module, method] = rest.join('.').split('#');
  return `https://docs.testing.zeroc.com/api/${language}/api/${module}.html${
    method ? `#${method}` : ''
  }`;
};

/**
 * Resolve relative links to their full path.
 * @param {string} href - The original link.
 * @param {string} routerPath - The current route path.
 * @returns {string} - The resolved link.
 */
const resolveRelativeLink = (href: string, routerPath: string) => {
  if (isExternalLink(href) || href.startsWith('/')) {
    return href;
  }
  if (href.startsWith('#')) {
    return `${routerPath.split('#')[0]}${href}`;
  }
  return `${routerPath.replace(/\/[^/]+$/, '')}/${href}`;
};
