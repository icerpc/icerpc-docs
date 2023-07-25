// Copyright (c) ZeroC, Inc.

import { baseUrls, currentNavItem, sideBarData } from 'data/side-bar-data';
import { Breadcrumbs, Breadcrumb } from 'components/Breadcrumbs';
import { isCategory, isLink } from 'types';
import { useHydrationFriendlyAsPath } from 'utils/useHydrationFriendlyAsPath';

type Props = {
  title: string;
  description: string;
  showBreadcrumbs?: boolean;
  readingTime?: string;
};

export const Title = ({
  title,
  description,
  readingTime,
  showBreadcrumbs = true
}: Props) => {
  const path = useHydrationFriendlyAsPath();
  const breadcrumbs = getBreadcrumbs(path);

  return (
    <div className="not-prose mb-10">
      <div className="mb-2 flex flex-row items-center justify-between">
        {showBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {readingTime && showBreadcrumbs && (
          <p className="text-xs">{readingTime}</p>
        )}
      </div>
      <h1 className="bg-gradient-to-b from-slate-800 to-black bg-clip-text pr-10 text-4xl font-bold text-transparent dark:text-white">
        {title}
      </h1>
      <h2 className="my-3 text-xl text-[var(--text-color-secondary)] dark:text-white/60">
        {description}
      </h2>
    </div>
  );
};

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const getBreadcrumbs = (path: string): Breadcrumb[] => {
  if (path === '/') {
    return [
      {
        name: 'Home',
        href: '/'
      }
    ];
  }

  if (!path) {
    return [];
  }

  const pathSegments = path.split('/').filter((segment) => segment);
  const baseUrl = baseUrls.find((item) => item === `/${pathSegments[0]}`);

  if (!baseUrl || pathSegments.length < 2) {
    return [];
  }

  const categories = sideBarData(baseUrl).filter(isCategory);

  const breadcrumbs: Breadcrumb[] = [
    {
      name: currentNavItem(baseUrl),
      href: baseUrl
    }
  ];

  let currentPath = baseUrl;

  for (let i = 1; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`;

    // Check for matching link within the categories
    let found = false;

    for (const category of categories) {
      const matchingLink = category.links.find(
        (linkItem) =>
          isLink(linkItem) &&
          stripTrailingSlash(linkItem.path) === stripTrailingSlash(currentPath)
      );

      if (matchingLink) {
        breadcrumbs.push({
          name: matchingLink.title,
          href: currentPath
        });
        found = true;
        break; // break out of the category loop
      }
    }

    // If no matching link is found for a segment, the path is invalid
    if (!found) {
      return [];
    }
  }

  return breadcrumbs;
};
