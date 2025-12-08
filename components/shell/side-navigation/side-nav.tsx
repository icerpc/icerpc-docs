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
    <div className="border-light-border dark:border-dark-border/60 dark:bg-dark sticky top-[6.4rem] hidden h-screen flex-none flex-col items-end border-r pt-4 pb-[6.4rem] lg:flex">
      <div className="flex size-full max-w-[300px] min-w-[300px] flex-col justify-start overflow-y-auto pl-10">
        <div className="dark:bg-dark sticky top-0 space-y-5 bg-white pr-6">
          <SideNavSelector isSlicePage={isSlicePage} path={path} />
          <div className="dark:to-dark pointer-events-none absolute inset-x-0 -bottom-9 h-9 w-full bg-linear-to-t from-transparent to-white" />
        </div>
        <nav>
          <ul className="top-0 mt-4 mr-2 mb-2">{cells}</ul>
          <div className="dark:from-dark pointer-events-none sticky inset-x-0 bottom-0 h-10 w-full bg-linear-to-t from-white to-transparent" />
        </nav>
      </div>
    </div>
  );
};
