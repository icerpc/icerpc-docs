// Copyright (c) ZeroC, Inc.

import { sideBarData, baseUrls } from 'data';
import { SliceSelector } from '../../SliceSelector';
import { SearchButton } from '../SearchButton';
import { SideNavList } from './SideNavList';

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
        <div className="sticky top-0 bg-[#fafafa] dark:bg-dark ">
          <SearchButton className="mb-0 mt-8 flex items-start pr-6" />
          {isSlicePage && (
            <div className="top-0 mb-2 mt-4 bg-none pr-6">
              <SliceSelector />
            </div>
          )}
        </div>
        <nav>
          <ul className="top-0 mr-2 mt-4">{cells}</ul>
        </nav>
      </div>
    </div>
  );
};
