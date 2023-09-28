// Copyright (c) ZeroC, Inc.

import { sideBarData, baseUrls } from 'data';
import { SliceSelector } from '@/components/slice-selector';
import { SearchButton } from '@/components/shell/search-button';
import { SideNavList } from './side-nav-list';

export const SideNav = ({ path }: { path: string }) => {
  // Clean up path
  const pathNoFragment = path.split('#')[0]; // Remove fragment
  const pathSegments = pathNoFragment.split('/'); // Split into segments
  const baseUrl = baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? ''; // Get base url

  // Construct the sidebar cells
  const data = sideBarData(baseUrl);
  const cells = data.map((item, index) => (
    <SideNavList key={index} data={item} path={path} />
  ));

  // Determine if the sidebar should contain a slice selector
  const isSlicePage = ['/slice1', '/slice2'].includes(baseUrl);

  return (
    <div className="sticky top-[59px] hidden h-[calc(100vh-59px)] flex-none flex-col items-end overflow-y-auto border-r border-lightBorder dark:border-darkBorder/60 dark:bg-dark lg:flex">
      <div className="flex h-full w-full min-w-[300px] max-w-[300px] flex-col justify-start pl-10">
        <div className="sticky top-0 space-y-5 bg-[#fafafa] pr-6 dark:bg-dark">
          <SearchButton className="mb-0 mt-6 flex items-start" />
          {isSlicePage && <SliceSelector className="w-full" />}
          <div className="w-full border-t-[1px] border-lightBorder dark:border-darkBorder" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-2.25rem] h-9 w-full bg-gradient-to-t from-transparent to-[#fafafa]" />
        </div>
        <nav>
          <ul className="top-0 mr-2 mt-5">{cells}</ul>
          <div className="pointer-events-none sticky inset-x-0 bottom-0 h-10 w-full bg-gradient-to-t from-[#fafafa] to-transparent " />
        </nav>
      </div>
    </div>
  );
};
