// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  children: ReactNode;
  type: 'critical' | 'info';
};

export const Callout = ({ children, type }: Props) => {
  return (
    <div
      className={classNames(
        'my-6 flex items-start justify-start gap-2.5 rounded-2xl border p-3 py-2 text-sm leading-6 ',
        type == 'critical'
          ? 'border-red-600/20 bg-red-600/20  text-red-600/90 dark:[&>*]:text-red-500/80'
          : 'border-primary/20 bg-primary/10 text-primary/90 dark:[&>*]:text-primary'
      )}
    >
      <InformationCircleIcon
        className={classNames(
          'absolute mr-2 mt-2 w-5',
          type == 'critical' ? 'text-red-600' : 'text-primary'
        )}
      />
      <div className="ml-7 mr-2 flex flex-col [&>*]:my-1 [&>*]:text-sm [&>*]:leading-6">
        {children}
      </div>
    </div>
  );
};
