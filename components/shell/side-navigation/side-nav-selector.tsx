// Copyright (c) ZeroC, Inc.

'use client';

import { useRouter } from 'next/navigation';
import { useMode } from 'context/state';
import { SliceSelector } from '@/components/slice-selector';
import { Mode } from 'types/mode';

export const SideNavSelector = ({
  isSlicePage,
  path
}: {
  isSlicePage: boolean;
  path: string;
}) => {
  const { push } = useRouter();
  const { setMode } = useMode();
  return (
    <>
      {isSlicePage && (
        <>
          <SliceSelector
            className="mt-3 w-full"
            onChangeCallback={(mode) => {
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
              setMode(mode);
            }}
          />
          <div className="w-full border-t-DEFAULT border-lightBorder pb-4 dark:border-darkBorder" />
        </>
      )}
    </>
  );
};
