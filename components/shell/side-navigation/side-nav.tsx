// Copyright (c) ZeroC, Inc.

import { sideBarData, baseUrls } from 'data';
import { SideNavList } from './side-nav-list';
import { SideNavSelector } from './side-nav-selector';

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
    <div className="sticky top-[6.4rem] hidden h-[calc(100vh-59px)] flex-none flex-col items-end border-r border-lightBorder dark:border-darkBorder/60 dark:bg-dark lg:flex">
      <div className="flex h-full w-full min-w-[300px] max-w-[300px] flex-col justify-start overflow-y-auto pl-10">
        <div className="sticky top-0 space-y-5 bg-[#fafafa] pr-6 dark:bg-dark">
          <SideNavSelector isSlicePage={isSlicePage} path={path} />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-2.25rem] h-9 w-full bg-gradient-to-t from-transparent to-[#fafafa] dark:to-dark" />
        </div>
        <nav>
          <ul className="top-0 mb-2 mr-2 mt-4">{cells}</ul>
          <div className="pointer-events-none sticky inset-x-0 bottom-0 h-10 w-full bg-gradient-to-t from-[#fafafa] to-transparent dark:from-dark " />
        </nav>
      </div>
    </div>
  );
};
