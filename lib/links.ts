// Copyright (c) ZeroC, Inc.

// Where a link in a page goes: AppLink shows it there, and lib/page-markdown.ts
// writes it in the page's Markdown copy.

/**
 * Check if a link is external.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's an external link, false otherwise.
 */
export const isExternalLink = (href: string) =>
  href.startsWith('http://') || href.startsWith('https://');

/**
 * Determines if a link is an API link.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's an API link, false otherwise.
 */
export const isApiLink = (href: string) => {
  const supportedLanguages = ['csharp', 'rust'];
  return (
    supportedLanguages.some((lang) => href.startsWith(`${lang}:`)) &&
    href.split(':').length > 1
  );
};

/**
 * Resolves a link in the page at `path`.
 * @param {string} href - The original link.
 * @param {string} path - The path of the page the link is on.
 * @returns {string} - An external URL, or a path on this site with its anchor.
 */
export const resolveLink = (href: string, path: string) => {
  let url = isApiLink(href)
    ? resolveApiLink(href)
    : resolveRelativeLink(href, path);

  if (!isExternalLink(url)) {
    const baseURL = 'https://docs.icerpc.dev';
    const parsedUrl = new URL(url, baseURL);
    url = parsedUrl.href.replace(baseURL, '');
  }
  return url;
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
  }/${language}/${version}/api/reference/${module}.html${method ? `#${method}` : ''}`;
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
    csharp: '0.6.x'
  };
  return versions[language] || 'main';
};
