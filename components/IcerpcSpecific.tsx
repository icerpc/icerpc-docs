// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { Tooltip } from 'flowbite-react';
import { AppLink } from './Nodes/AppLink';

export const IcerpcSpecific = () => {
  const tooltipContent = (
    <p>
      This section is specific to IceRPC.
      <br />
      <AppLink href="/icerpc">Learn more</AppLink>
    </p>
  );
  return (
    <Tooltip
      content={tooltipContent}
      placement="bottom"
      className="!py-0 text-sm dark:!bg-[#32363c] [&>*]:dark:!bg-[#32363c]"
    >
      <Link
        href="/icerpc"
        className="ml-2 mt-[2px] rounded bg-primary p-[1px] px-[4px] text-xs font-bold text-white hover:bg-blue-700"
      >
        IceRPC
      </Link>
    </Tooltip>
  );
};
