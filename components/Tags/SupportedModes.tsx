// Copyright (c) ZeroC, Inc.

import clsx from 'clsx';
import { useMode } from 'context/state';
import { useRouter } from 'next/router';
import { Mode } from 'types';

type Props = {
  supported: Mode[];
};

export const SupportedModes = ({ supported }: Props) => {
  const { mode: currentMode, setMode } = useMode();
  const router = useRouter();

  const updateMode = (mode: Mode) => {
    setMode(mode);
    // Update the URL
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
  };

  return (
    <div className="flex flex-row items-center justify-start pb-4 pt-1">
      <h3 className="my-0 mr-2 text-sm font-semibold">Supports:</h3>
      <div className="flex flex-row items-center justify-start gap-2">
        {supported &&
          supported.map((mode) => (
            <button
              key={mode}
              onClick={() => updateMode(mode)}
              className={clsx(
                'flex flex-row items-center justify-center rounded-xl border px-3 py-1 text-sm font-medium leading-5',
                'border-lightBorder dark:border-darkBorder dark:bg-black ',
                mode == currentMode
                  ? 'border-primary text-primary'
                  : 'dark:text-white/40'
              )}
            >
              {mode}
            </button>
          ))}
      </div>
    </div>
  );
};
