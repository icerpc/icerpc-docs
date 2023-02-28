// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface Props {
  children: ReactNode;
  type: 'critical' | 'info';
}

export const Callout = ({ children, type }: Props) => {
  return (
    <div
      className={clsx(
        'my-6 flex items-start justify-start gap-2.5 rounded-xl border p-3 py-2 text-sm leading-6 ',
        type == 'critical'
          ? 'border-red-600/20 bg-red-600/20  text-red-600/90 dark:[&>*]:text-red-500/80'
          : 'border-primary/20 bg-primary/10 text-primary/90 dark:[&>*]:text-primary'
      )}
    >
      <div className="mx-0 mt-[6px]">
        <InformationCircleIcon
          className={clsx(
            'h-5 w-5 pr-0',
            type == 'critical' ? 'text-red-600' : 'text-primary'
          )}
        />
      </div>
      <div className="mx-0 flex flex-col [&>*]:my-1 [&>*]:text-sm [&>*]:leading-6">
        {children}
      </div>
    </div>
  );
};
