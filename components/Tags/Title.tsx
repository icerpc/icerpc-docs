// Copyright (c) ZeroC, Inc.

import { useRouter } from 'next/router';

import { baseUrls, currentNavItem, sideBarData } from 'data/side-bar-data';
import { Breadcrumbs, Breadcrumb } from 'components/Breadcrumbs';
import { SideBarLink, Encoding, isCategory, isLink } from 'types';
import { useHydrationFriendlyAsPath } from 'lib/utils';

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

export const getBreadcrumbs = (path: string) => {
  if (!path || path === '/') {
    return path === '/'
      ? [
          {
            name: 'Home',
            href: '/'
          }
        ]
      : [];
  }

  const baseUrl = baseUrls.find((item) => path.startsWith(item));
  if (!baseUrl) {
    return [];
  }

  const categories = sideBarData(baseUrl).filter(isCategory);
  const breadcrumbs: Breadcrumb[] = [
    {
      name: currentNavItem(baseUrl),
      href: baseUrl
    }
  ];

  categories.some((category) => {
    const links = category.links.filter(isLink);
    const linkFound = links.find(
      (link: SideBarLink) =>
        stripTrailingSlash(link.path) === stripTrailingSlash(path)
    );

    if (linkFound) {
      breadcrumbs.push({
        name: category.title,
        href: links[0].path
      });

      // Break out of the loop early when a link is found
      return true;
    }

    // Continue the loop if no link is found
    return false;
  });

  return breadcrumbs;
};
