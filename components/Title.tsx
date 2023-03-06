// Copyright (c) ZeroC, Inc.

import { Breadcrumbs, Breadcrumb } from 'components/Breadcrumbs';
import { useVersionContext } from 'context/state';
import { baseUrls, currentNavItem, sideBarData } from 'data/side-bar-data';
import { useRouter } from 'next/router';
import {
  SideBarCategory,
  SideBarLink,
  SideBarSourceType,
  SliceVersion,
  isCategory,
  isLink
} from 'types';

interface Props {
  title: string;
  description: string;
}

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const getBreadcrumbs = (path: string, version: SliceVersion) => {
  const baseUrl = baseUrls.find((item) => path.startsWith(item))!;
  const categories = sideBarData(baseUrl, version).filter((item) =>
    isCategory(item)
  ) as SideBarCategory[];

  if (baseUrl == undefined) {
    return [];
  }

  if (path == '/') {
    return [
      {
        name: 'Home',
        href: '/'
      }
    ];
  }

  let breadcrumbs: Breadcrumb[] = [
    {
      name: currentNavItem(baseUrl),
      href: baseUrl
    }
  ];

  categories.forEach((data: SideBarSourceType) => {
    let category = data as SideBarCategory;
    let links = category.links.filter(isLink);
    if (
      links.find(
        (link: SideBarLink) =>
          stripTrailingSlash(link.path) === stripTrailingSlash(path)
      )
    ) {
      breadcrumbs.push({
        name: category.title,
        href: links[0].path
      });
    }
  });
  return breadcrumbs;
};

export const Title = ({ title, description }: Props) => {
  const { version } = useVersionContext();
  const path = useRouter().pathname;
  const breadcrumbs = getBreadcrumbs(path, version);

  return (
    <div className="m-0 p-0">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-4xl font-extrabold text-[#333333]">{title}</h1>
      <h2 className="my-3 text-xl text-[var(--text-color-secondary)]">
        {description}
      </h2>
    </div>
  );
};
