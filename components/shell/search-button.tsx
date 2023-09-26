// Copyright (c) ZeroC, Inc.

'use client';

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import style from './search.module.css';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export const SearchButton = ({ className }: Props) => (
  <div className={clsx(className, style.search)} id="search">
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''}
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ''}
      indexName="icerpc"
      insights={true}
    />
  </div>
);
