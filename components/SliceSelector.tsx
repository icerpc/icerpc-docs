// Copyright (c) ZeroC, Inc.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import { useEncoding } from 'context/state';
import { Encoding, encodings } from 'types';

export const SliceSelector = () => {
  const { encoding: currentEncoding, setEncoding } = useEncoding();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(
    encodings.indexOf(currentEncoding)
  );

  function onChange(index: number) {
    const encoding = encodings[index];
    setEncoding(encoding);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, encoding }
    });
  }

  useEffect(() => {
    setSelectedIndex(encodings.indexOf(currentEncoding));
  }, [currentEncoding]);

  return (
    <>
      <div className="mb-6 w-full pl-1 pr-6">
        <h2 className="py-2 text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          Slice encoding:
        </h2>
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
          <Tab.List className="my-4 flex gap-0 space-x-1 rounded-2xl bg-transparent">
            {encodings.map((encoding, index) => (
              <EncodingTab
                key={encoding}
                encoding={encoding}
                selected={index === selectedIndex}
              />
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <div className="mt-4 w-full border-t-[1px] border-lightBorder dark:border-darkBorder" />
    </>
  );
};

type EncodingTabProps = {
  encoding: Encoding;
  selected: boolean;
};

const EncodingTab = ({ encoding, selected }: EncodingTabProps) => {
  const className = clsx(
    'w-full rounded-xl border-[1.5px] bg-white p-2 text-xs font-medium uppercase leading-tight',
    'focus:outline-none focus:ring-0',
    'transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg',
    'dark:bg-[#32363c] dark:text-white',
    selected
      ? 'border border-primary bg-white text-primary dark:border-white dark:text-primary'
      : 'bg-slate-50 text-slate-500 hover:bg-white/80 hover:text-primary dark:border-darkBorder dark:text-white/40'
  );

  return <Tab className={className}>{encoding}</Tab>;
};
