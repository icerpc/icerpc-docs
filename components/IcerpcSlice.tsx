// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { Tooltip } from 'flowbite-react';
import { AppLink } from './Nodes/AppLink';

export const IcerpcSlice = () => {
  const tooltipContent = (
    <p>
      This section is specific to the IceRPC + Slice integration.
      <br />
      <AppLink href="/icerpc">Learn more</AppLink>
    </p>
  );
  return (
    <div className="inline-flex flex-1">
      <Tooltip
        content={tooltipContent}
        placement="bottom"
        className="flex items-center justify-center text-sm dark:!bg-[#32363c] [&>*]:dark:!bg-[#32363c]"
      >
        <div className="flex h-full w-full">
          <Link
            href="/icerpc"
            className="relative my-auto ml-1 rounded border border-primary/20 bg-primary/10 p-[1px] px-[4px] text-xs font-bold text-primary/90 "
          >
            IceRPC + Slice
          </Link>
        </div>
      </Tooltip>
    </div>
  );
};
