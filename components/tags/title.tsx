// Copyright (c) ZeroC, Inc.

import clsx from 'clsx';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getBreadcrumbs } from 'lib/breadcrumbs';

type Props = {
  title: string;
  path: string;
  description: string;
  readingTime?: string;
};

export const Title = ({ title, description, path, readingTime }: Props) => {
  const breadcrumbs = getBreadcrumbs(path);
  const hasBreadcrumbs = breadcrumbs.length > 1;

  return (
    <div className="not-prose mb-10">
      <div
        className={clsx(
          'mb-2 flex flex-row items-center',
          hasBreadcrumbs ? 'justify-between' : 'justify-end'
        )}
      >
        {hasBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        {readingTime && <p className="pl-1 text-xs md:pl-0">{readingTime}</p>}
      </div>
      <h1 className="bg-linear-to-b from-slate-800 to-black bg-clip-text pr-10 text-4xl leading-[2.65rem] font-bold text-transparent dark:text-white">
        {title}
      </h1>
      <h2 className="mt-2 mb-3 text-xl text-(--text-color-secondary) dark:text-white/60">
        {description}
      </h2>
    </div>
  );
};
