// Copyright (c) ZeroC, Inc. All rights reserved.

import { Tab } from '@headlessui/react';
import { useAppContext } from '../context/state';
import { sliceVersions } from '../types/slice-version.d';
import { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SliceSelector() {
  const [sliceVersion, setSliceVersion] = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(
    sliceVersions.indexOf(sliceVersion)
  );

  function onChange(index) {
    setSliceVersion(sliceVersions[index]);
    setSelectedIndex(index);
  }

  useEffect(() => {
    setSelectedIndex(sliceVersions.indexOf(sliceVersion));
  }, [sliceVersion]);

  console.log('sliceVersion', sliceVersion);

  return (
    <>
      <div className="m-0 my-4 w-full pr-6">
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
          <Tab.List className=" flex space-x-1 rounded-xl bg-slate-100 p-1">
            {sliceVersions.map((version) => (
              <Tab
                key={version}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-slate-400 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {version}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
        {/* Horizontal Divider */}
        <div className="my-4 border-t-[1.5px] border-lightBorder dark:border-darkBorder" />
      </div>
    </>
  );
}
