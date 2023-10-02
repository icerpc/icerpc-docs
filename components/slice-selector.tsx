// Copyright (c) ZeroC, Inc.

'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@headlessui/react';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { AppLink } from '@/components/nodes/app-link';
import { Mode, modes } from 'types';
import { useMode, usePath } from 'context/state';

type SliceSelectorProps = {
  className?: string;
  showTooltips?: boolean;
  updatePage?: boolean;
  tabClassName?: string;
  showDarkMode?: boolean;
};

export const SliceSelector = ({
  className,
  showTooltips = true,
  updatePage = true,
  tabClassName = 'w-[114px]',
  showDarkMode = true
}: SliceSelectorProps) => {
  const { mode: activeMode, setMode } = useMode();
  const path = usePath();
  const { push } = useRouter();

  function onChange(index: number) {
    const mode = modes[index];
    setMode(mode);

    if (updatePage) {
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
  }

  return (
    <div className={className}>
      <Tab.Group
        selectedIndex={activeMode && modes.indexOf(activeMode)}
        onChange={onChange}
      >
        <Tab.List className="flex space-x-2 rounded-xl bg-transparent">
          {modes.map((mode) => (
            <ModeTab
              key={mode}
              mode={mode}
              selected={mode == activeMode}
              showTooltip={showTooltips}
              showDarkMode={showDarkMode}
              tabClassName={tabClassName}
            />
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

type ModeTabProps = {
  mode: Mode;
  selected: boolean;
  showTooltip?: boolean;
  tabClassName?: string;
  showDarkMode: boolean;
};

const ModeTab = ({
  mode,
  selected,
  showTooltip,
  tabClassName,
  showDarkMode
}: ModeTabProps) => {
  const className = clsx(
    tabClassName,
    'cursor-pointer rounded border-[1.5px] bg-white p-2 text-center text-xs font-medium uppercase leading-tight',
    'focus:outline-none focus:ring-0',
    'transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg',
    selected
      ? [
          'border border-primary bg-white text-primary',
          showDarkMode && 'dark:border-white dark:text-primary'
        ]
      : [
          'bg-slate-50 text-slate-500 hover:bg-white/80 hover:text-primary',
          showDarkMode && 'dark:border-darkBorder dark:text-white/40'
        ],
    showDarkMode && 'dark:bg-transparent dark:text-white'
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
        Use Slice2 for new projects.
        <br />
        <AppLink href="/slice2/language-guide/compilation-mode">
          Learn more
        </AppLink>
      </p>
    );

  return (
    <>
      <Tab
        as="div"
        className={className}
        id={showTooltip == true ? `tooltip-${mode}` : ''}
        data-tooltip-place="bottom"
      >
        {mode}
      </Tab>
      {showTooltip == true && (
        <TooltipPortal>
          <Tooltip
            anchorSelect={`#tooltip-${mode}`}
            clickable
            style={{
              width: '14rem',
              backgroundColor: '#32363c',
              borderRadius: '0.6rem',
              opacity: '1'
            }}
          >
            {tooltipContent}
          </Tooltip>
        </TooltipPortal>
      )}
    </>
  );
};

const TooltipPortal = ({ children }: { children: ReactElement }) => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    setEl(div);
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!el) return null; // Don't render anything on the server

  return ReactDOM.createPortal(children, el);
};
