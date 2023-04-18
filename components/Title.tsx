// Copyright (c) ZeroC, Inc.

import { useRouter } from 'next/router';

import { baseUrls, currentNavItem, sideBarData } from 'data/side-bar-data';
import { Breadcrumbs, Breadcrumb } from 'components/Breadcrumbs';
import { SideBarLink, Encoding, isCategory, isLink } from 'types';
import { useEncoding } from 'context/state';

interface Props {
  title: string;
  description: string;
}

export const Title = ({ title, description }: Props) => {
  const { encoding } = useEncoding();
  const path = useRouter().pathname;
  const breadcrumbs = getBreadcrumbs(path, encoding);

  return (
    <div className="m-0 p-0">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-4xl font-extrabold text-[#333333] dark:text-white">
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

export const getBreadcrumbs = (path: string, encoding: Encoding) => {
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

  const categories = sideBarData(baseUrl, encoding).filter(isCategory);
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
