import { baseUrls, currentNavItem, sideBarData } from 'data';
import { Breadcrumb } from 'components/Breadcrumbs';
import { SideBarLink, isCategory, isLink } from 'types';

export const getBreadcrumbs = (path: string): Breadcrumb[] => {
  const baseUrl = getBaseUrlFromPath(path);
  if (!baseUrl) return [];

  return [
    ...getNavBreadcrumb(baseUrl),
    ...getCategoryBreadcrumb(path, baseUrl)
  ];
};

const getBaseUrlFromPath = (path: string): string | null => {
  const pathSegments = path.split('/');
  return baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? null;
};

// Adds the current nav item to the breadcrumb
const getNavBreadcrumb = (baseUrl: string): Breadcrumb[] => [
  {
    name: currentNavItem(baseUrl),
    href: baseUrl
  }
];

// Adds the current category and subcategory to the breadcrumb
const getCategoryBreadcrumb = (path: string, baseUrl: string): Breadcrumb[] => {
  const categories = sideBarData(baseUrl).filter(isCategory);

  for (const category of categories) {
    const linkFound = category.links
      .filter(isLink)
      .find(
        (link: SideBarLink) =>
          stripTrailingSlash(link.path) === stripTrailingSlash(path)
      );

    if (linkFound) {
      return [
        {
          name: category.title,
          href: linkFound.path
        }
      ];
    }
  }
  return [];
};

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};
