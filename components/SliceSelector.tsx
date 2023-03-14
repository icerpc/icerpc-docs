// Copyright (c) ZeroC, Inc.

import { Tab } from '@headlessui/react';
import { useEncoding } from 'context/state';
import { Encoding, encodings } from 'types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const SliceSelector = () => {
  const { encoding: currentEncoding, setEncoding } = useEncoding();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(
    encodings.indexOf(currentEncoding)
  );

  function onChange(index: number) {
    setEncoding(encodings[index]);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, encoding: encodings[index] }
    });
  }

  useEffect(() => {
    setSelectedIndex(encodings.indexOf(currentEncoding));
  }, [currentEncoding]);

  return (
    <>
      <div className="m-0 mt-6 w-full pr-6 pl-1">
        <h2 className="py-2 text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          Slice encoding:
        </h2>
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
          <Tab.List className="my-4 flex gap-0 space-x-1 rounded-2xl bg-transparent">
            {encodings.map((encoding) => (
              <Tab
                key={encoding}
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
                {encoding}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <div className="mt-4 w-full border-t-[1px] border-lightBorder dark:border-darkBorder" />
    </>
  );
};
