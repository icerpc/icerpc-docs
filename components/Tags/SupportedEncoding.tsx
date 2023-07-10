// Copyright (c) ZeroC, Inc.

import clsx from 'clsx';
import { useEncoding } from 'context/state';
import { useRouter } from 'next/router';
import { Encoding } from 'types';

type Props = {
  supported: Encoding[];
};

export const SupportedEncodings = ({ supported }: Props) => {
  const { encoding: currentEncoding, setEncoding } = useEncoding();
  const router = useRouter();

  const updateEncoding = (encoding: Encoding) => {
    setEncoding(encoding);
    // Update the URL
    const path = router.asPath;

    let newPath;
    if (path === '/slice1') {
      newPath = encoding === Encoding.Slice1 ? '/slice1' : '/slice2';
    } else if (path === '/slice2') {
      newPath = encoding === Encoding.Slice1 ? '/slice1' : '/slice2';
    } else {
      newPath = path.replace(
        /\/slice[1-2]\//,
        `/slice${encoding === Encoding.Slice1 ? 1 : 2}/`
      );
    }

    router.push(newPath);
  };

  return (
    <div className="flex flex-row items-center justify-start pb-4 pt-1">
      <h3 className="my-0 mr-2 text-sm font-semibold">Supports:</h3>
      <div className="flex flex-row items-center justify-start gap-2">
        {supported &&
          supported.map((encoding) => (
            <button
              key={encoding}
              onClick={() => updateEncoding(encoding)}
              className={clsx(
                'flex flex-row items-center justify-center rounded-xl border px-3 py-1 text-sm font-medium leading-5',
                'border-lightBorder dark:border-darkBorder dark:bg-black ',
                encoding == currentEncoding
                  ? 'border-primary text-primary'
                  : 'dark:text-white/40'
              )}
            >
              {encoding}
            </button>
          ))}
      </div>
    </div>
  );
};
