// Copyright (c) ZeroC, Inc.

'use client';

import { useRouter } from 'next/navigation';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { Tooltip } from 'flowbite-react';
import { useMode, usePath } from 'context/state';
import { Mode, modes } from 'types';
import { AppLink } from './Nodes/AppLink';

export const SliceSelector = () => {
  const { mode: activeMode, setMode } = useMode();
  const path = usePath();
  const { push } = useRouter();

  function onChange(index: number) {
    const mode = modes[index];
    setMode(mode);

    const [corePath, fragment] = path.split('#');

    let newPath;
    if (corePath === '/slice1') {
      newPath = mode === Mode.Slice1 ? '/slice1' : '/slice2';
    } else if (corePath === '/slice2') {
      newPath = mode === Mode.Slice1 ? '/slice1' : '/slice2';
    } else {
      newPath = corePath.replace(
        /\/slice[1-2]\//,
        `/slice${mode === Mode.Slice1 ? 1 : 2}/`
      );
    }

    // Append the fragment back, if it exists
    if (fragment) {
      newPath = `${newPath}#${fragment}`;
    }

    push(newPath);
  }

  return (
    <>
      <div className="mb-6 mt-3 w-full">
        <Tab.Group
          selectedIndex={activeMode && modes.indexOf(activeMode)}
          onChange={onChange}
        >
          <Tab.List className="flex space-x-2 rounded-xl bg-transparent">
            {modes.map((mode) => (
              <ModeTab key={mode} mode={mode} selected={mode == activeMode} />
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
    'w-[114px] cursor-pointer rounded border-[1.5px] bg-white p-2 text-center text-xs font-medium uppercase leading-tight',
    'focus:outline-none focus:ring-0',
    'transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg',
    'dark:bg-transparent dark:text-white',
    selected
      ? 'border border-primary bg-white text-primary dark:border-white dark:text-primary'
      : 'bg-slate-50 text-slate-500 hover:bg-white/80 hover:text-primary dark:border-darkBorder dark:text-white/40'
  );
  const tooltipContent =
    mode === Mode.Slice1 ? (
      <p className="px-2">
        Use Slice1 for Ice interop.
        <br />
        <AppLink href="/slice1/language-guide/compilation-mode">
          Learn more
        </AppLink>
      </p>
    ) : (
      <p className="px-2">
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
