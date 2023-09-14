// Copyright (c) ZeroC, Inc.

export const License = () => (
  <div className="flex flex-row text-sm">
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Creative Commons License"
        style={{ borderWidth: 0 }}
        src="https://i.creativecommons.org/l/by/4.0/88x31.png"
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
