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
import { SupportedEncodings } from './SupportedEncoding';

const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const getBreadcrumbs = (path: string, version: SliceVersion) => {
  const baseUrl = baseUrls.find((item) => path.startsWith(item))!;
  const categories = sideBarData(baseUrl, version).filter((item) =>
    isCategory(item)
  ) as SideBarCategory[];

  // If path or baseUrl is undefined, return an empty array
  if (!path || !baseUrl) {
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

interface Props {
  title: string;
  description: string;
  encoding?: SliceVersion;
}

export const Title = ({ title, description, encoding }: Props) => {
  const { version, setVersion } = useVersionContext();
  const path = useRouter().pathname;
  const baseUrl = baseUrls.find((item) => path.startsWith(item))!;
  const breadcrumbs = getBreadcrumbs(path, version);
  const supportedEncodings = encoding
    ? [encoding]
    : [SliceVersion.Slice1, SliceVersion.Slice2];

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
