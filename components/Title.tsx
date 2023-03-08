// Copyright (c) ZeroC, Inc.

import clsx from 'clsx';
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
      {baseUrl == '/docs/slice' && (
        // Create a pill containing the encoding
        <div className="flex flex-row items-center justify-start gap-2 pb-8 pt-2">
          {supportedEncodings.map((encoding) => (
            <button
              key={encoding}
              onClick={() => setVersion(encoding)}
              className={clsx(
                'flex flex-row items-center justify-center rounded-full border px-3 py-1 text-sm font-medium leading-5',
                'border-lightBorder dark:border-darkBorder'
              )}
            >
              {encoding}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
