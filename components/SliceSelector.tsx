// Copyright (c) ZeroC, Inc.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { Tooltip } from 'flowbite-react';
import { useMode } from 'context/state';
import { Mode, modes } from 'types';
import { AppLink } from './Nodes/AppLink';

export const SliceSelector = () => {
  const { mode, setMode } = useMode();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(modes.indexOf(mode));

  function onChange(index: number) {
    const mode = modes[index];
    setMode(mode);

    const path = router.asPath;

    let newPath;
    if (path === '/slice1') {
      newPath = mode === Mode.Slice1 ? '/slice1' : '/slice2';
    } else if (path === '/slice2') {
      newPath = mode === Mode.Slice1 ? '/slice1' : '/slice2';
    } else {
      newPath = path.replace(
        /\/slice[1-2]\//,
        `/slice${mode === Mode.Slice1 ? 1 : 2}/`
      );
    }

    router.push(newPath);
  }

  useEffect(() => {
    setSelectedIndex(modes.indexOf(mode));
  }, [mode]);

  return (
    <>
      <div className="mb-6 mt-3 w-full pr-4">
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
          <Tab.List className="flex space-x-2 rounded-xl bg-transparent">
            {modes.map((mode, index) => (
              <ModeTab
                key={mode}
                mode={mode}
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

type ModeTabProps = {
  mode: Mode;
  selected: boolean;
};

const ModeTab = ({ mode, selected }: ModeTabProps) => {
  const className = clsx(
    'w-[114px] rounded border-[1.5px] bg-white p-2 text-center text-xs font-medium uppercase leading-tight',
    'focus:outline-none focus:ring-0',
    'transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg',
    'dark:bg-transparent dark:text-white',
    selected
      ? 'border border-primary bg-white text-primary dark:border-white dark:text-primary'
      : 'bg-slate-50 text-slate-500 hover:bg-white/80 hover:text-primary dark:border-darkBorder dark:text-white/40'
  );
  const tooltipContent =
    mode === Mode.Slice1 ? (
      <p>
        Use Slice1 for Ice interop.
        <br />
        <AppLink href="/slice1/language-guide/compilation-mode">
          Learn more
        </AppLink>
      </p>
    ) : (
      <p>
        Use Slice2 for new projects.{' '}
        <AppLink href="/slice2/language-guide/compilation-mode">
          Learn more
        </AppLink>
      </p>
    );

  return (
    <Tooltip
      content={tooltipContent}
      placement="bottom"
      className="w-56 dark:!bg-[#32363c] [&>*]:dark:!bg-[#32363c]"
    >
      <Tab as="div" className={className}>
        {mode}
      </Tab>
    </Tooltip>
  );
};
