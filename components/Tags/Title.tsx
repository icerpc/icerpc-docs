// Copyright (c) ZeroC, Inc.

import { Breadcrumb, Breadcrumbs } from 'components/Breadcrumbs';
import { getBreadcrumbs } from 'lib/breadcrumbs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  description: string;
  readingTime?: string;
};

export const Title = ({ title, description, readingTime }: Props) => {
  const { asPath, isReady } = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    if (isReady) {
      const path = asPath.split('#')[0];
      setBreadcrumbs(getBreadcrumbs(path));
    }
  }, [isReady, asPath]);

  return (
    <div className="not-prose mb-10">
      <div className="mb-2 flex flex-row items-center justify-between">
        {<Breadcrumbs breadcrumbs={breadcrumbs} />}
        {readingTime && <p className="text-xs">{readingTime}</p>}
      </div>
      <h1 className="bg-gradient-to-b from-slate-800 to-black bg-clip-text pr-10 text-4xl font-bold text-transparent dark:text-white">
        {title}
      </h1>
      <h2 className="my-3 text-xl text-[var(--text-color-secondary)] dark:text-white/60">
        {description}
      </h2>
    </div>
  );
};
