// Copyright (c) ZeroC, Inc.

import Image from 'next/image';

export const License = () => (
  <div className="flex flex-row text-sm">
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
      <Image
        alt="Creative Commons License"
        src="/icons/by.svg"
        width={88}
        height={31}
        style={{ borderWidth: 0 }}
      />
    </a>
    <br />
    <div className="my-auto ml-3 dark:text-gray-400">
      This work is licensed under a{' '}
      <a
        rel="license"
        className="inline underline dark:text-gray-400"
        href="http://creativecommons.org/licenses/by/4.0/"
      >
        Creative Commons Attribution 4.0 International License.
      </a>
    </div>
  </div>
);
