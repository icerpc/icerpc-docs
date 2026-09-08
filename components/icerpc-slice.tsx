// Copyright (c) ZeroC, Inc.

'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AppLink } from './nodes/app-link';

export const IcerpcSlice = () => (
  <div className="mt-1 ml-1.5 inline-flex">
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex size-full">
            <AppLink
              href="/slice#slice-and-icerpc"
              className="border-primary/20 bg-primary/10 text-primary/90 relative my-auto ml-1 rounded-sm border p-px px-[4px] text-xs font-bold"
            >
              IceRPC + Slice
            </AppLink>
          </div>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side="bottom"
            className="z-50 border-0 bg-gray-900 px-3 py-2 text-white dark:bg-[#32363c]"
          >
            <p>
              This section is specific to the IceRPC + Slice integration.
              <br />
              <AppLink href="/slice#slice-and-icerpc">Learn more</AppLink>
            </p>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  </div>
);
