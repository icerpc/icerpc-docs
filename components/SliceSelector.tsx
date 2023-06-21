// Copyright (c) ZeroC, Inc.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { Tooltip } from 'flowbite-react';
import { useEncoding } from 'context/state';
import { Encoding, encodings } from 'types';
import { AppLink } from './Nodes/AppLink';

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
      <div className="mb-6 w-full pr-6">
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
          <Tab.List className="my-4 flex rounded-xl bg-transparent">
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
    'mx-1 w-[108px] rounded-lg border-[1.5px] bg-white p-2 text-center text-xs font-medium uppercase leading-tight',
    'focus:outline-none focus:ring-0',
    'transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg',
    'dark:bg-[#32363c] dark:text-white',
    selected
      ? 'border border-primary bg-white text-primary dark:border-white dark:text-primary'
      : 'bg-slate-50 text-slate-500 hover:bg-white/80 hover:text-primary dark:border-darkBorder dark:text-white/40'
  );
  const tooltipContent =
    encoding === Encoding.Slice1 ? (
      <p>
        Slice1 should only be used when doing interop with ZeroC Ice, to read
        learn more visit{' '}
        <AppLink href="/docs/icerpc-for-ice-users/slice/one-syntax-two-encodings">
          here
        </AppLink>
        .
      </p>
    ) : (
      <p>
        Slice2 is the default encoding for IceRPC and recommended for new
        projects.
      </p>
    );

  return (
    <Tooltip content={tooltipContent} placement="bottom" className="w-56">
      <Tab as="div" className={className}>
        {encoding}
      </Tab>
    </Tooltip>
  );
};
