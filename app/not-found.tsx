// Copyright (c) ZeroC, Inc.

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-row items-center">
        <h2 className="border-r-2 border-r-light-border pr-6 text-3xl font-semibold leading-10 ">
          404
        </h2>
        <h2 className="pl-4 dark:text-[rgba(255,255,255,0.6)]">
          This page could not be found.
        </h2>
      </div>
    </div>
  );
}
