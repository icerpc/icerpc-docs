// Copyright (c) ZeroC, Inc.

'use client';

import { ReactNode, CSSProperties, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Mode } from '@/types';
import { useMode, usePath } from '@/context/state';

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

  const { mode, setMode } = useMode();

  const href = useMemo(() => {
    let url = isApiLink(originalHref)
      ? resolveApiLink(originalHref)
      : resolveRelativeLink(originalHref, path);

    if (!isExternalLink(url)) {
      const baseURL = 'https://docs.icerpc.dev';
      const parsedUrl = new URL(url, baseURL);
      url = parsedUrl.href.replace(baseURL, '');
      url = url.replace(
        /^\/slice(?=#|\/|$)/,
        mode === Mode.Slice1 ? '/slice1' : '/slice2'
      );
    }
    return url;
  }, [originalHref, path, mode]);

  const style = { ...defaultStyle, ...originalStyle };

  /**
   * Handles the click on the link, specifically for slice links.
   */
  const handleLinkClick = () => {
    if (isSliceLink(href)) {
      // Pull the mode from the href if it's a slice1 or slice2 link and set it in the context.
      const hrefMode = getSliceMode(href);
      if (hrefMode) {
        setMode(hrefMode);
      }
    }
  };

  const prefetch =
    isExternalLink(originalHref) || isApiLink(originalHref) ? false : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onClick={handleLinkClick}
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

// Utility Functions

/**
 * Maps a href to the corresponding mode.
 * @param {string} href - The href to extract the mode from.
 * @returns {Mode | undefined} - The mode if href is a slice link, undefined otherwise.
 */
const getSliceMode = (href: string): Mode | undefined => {
  const match = href.match(/(?:^|\/)slice([1-2]?)(?:\/|$)/);
  if (!match) return undefined;

  const sliceNumber = match[1] || ''; // "" or "1" or "2"

  switch (sliceNumber) {
    case '1':
      return Mode.Slice1;
    case '2':
      return Mode.Slice2;
    default:
      return undefined;
  }
};

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
const isSliceLink = (href: string) => /(^|\/)slice([1-2]?)(\/|$)/.test(href);

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
  const version = languageApiReferenceVersion(language);
  // Right now we only support the C# API reference, so the URL is hardcoded to the C# API reference.
  return `${
    process.env.NEXT_PUBLIC_API_HOST
  }/${language}/${version}/api/api/${module}.html${method ? `#${method}` : ''}`;
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

/**
 * Returns the API reference version for a given language.
 * @param {string} language - The programming language (e.g., 'csharp').
 * @returns {string} - The API reference version.
 */
const languageApiReferenceVersion = (language: string): string => {
  const versions: Record<string, string> = {
    csharp: '0.5.x'
  };
  return versions[language] || 'main';
};
