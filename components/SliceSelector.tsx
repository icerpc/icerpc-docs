// Copyright (c) ZeroC, Inc.

import { Tab } from '@headlessui/react';
import { useVersionContext } from 'context/state';
import { sliceVersions } from 'types';
import { useEffect, useState } from 'react';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const SliceSelector = () => {
  const { version, setVersion } = useVersionContext();
  const [selectedIndex, setSelectedIndex] = useState(
    sliceVersions.indexOf(version)
  );

  function onChange(index: number) {
    setVersion(sliceVersions[index]);
    setSelectedIndex(index);
  }

  useEffect(() => {
    setSelectedIndex(sliceVersions.indexOf(version));
  }, [version]);

  return (
    <>
      <div className="m-0 my-2 w-full pr-6">
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
          <Tab.List className=" flex gap-0 space-x-1 rounded-2xl bg-transparent">
            {sliceVersions.map((version) => (
              <Tab
                key={version}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg border-[1.5px] bg-white px-2 py-2 text-xs font-medium uppercase',
                    'text-sm leading-tight focus:outline-none focus:ring-0',
                    'transition-shadow  duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg',
                    'dark:bg-[#32363c] dark:text-white',
                    selected
                      ? 'border-1 border-primary bg-white text-primary dark:text-primary'
                      : 'bg-slate-50 text-slate-500 hover:bg-opacity-80 hover:text-primary dark:border-darkBorder'
                  )
                }
              >
                {version}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
        <div className="my-4 border-t-[1.5px] border-lightBorder dark:border-darkBorder" />
      </div>
    </>
  );
};
