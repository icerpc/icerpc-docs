// Copyright (c) ZeroC, Inc. All rights reserved.

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Divider = ({ margin }: { margin?: string }) => {
  return (
    <div
      className={classNames(
        'h-[1px] bg-lightBorder dark:bg-darkBorder',
        margin ? margin : 'my-8'
      )}
    />
  );
};
