// Copyright (c) ZeroC, Inc.

'use client';

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import style from './search.module.css';
import clsx from 'clsx';
import { useMode } from 'context/state';
import { Mode } from 'types';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SliceSelector } from '../slice-selector';

type Props = {
  className?: string;
};

export const SearchButton = ({ className }: Props) => {
  const { mode } = useMode();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const filters = ((mode) => {
    if (mode == Mode.Slice2) return 'NOT sliceType:slice1';
    if (mode == Mode.Slice1) return 'NOT sliceType:slice2';
    return 'NOT sliceType:slice1';
  })(mode);

  // When docsearch is opened, DocSearch--active' is added to the body
  // we use this to detect when docsearch is opened and add our custom
  // search buttons
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.nodeName === 'BODY') {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains('DocSearch--active')) {
            const container = document.querySelector('.DocSearch-Modal');
            const existingDiv = document.querySelector('.slice-mode');
            if (container && !existingDiv) {
              const myDiv = document.createElement('div');
              myDiv.className =
                'slice-mode px-[var(--docsearch-spacing)] pt-[var(--docsearch-spacing)]';
              container.prepend(myDiv);
              setPortalContainer(myDiv);
            }
          } else {
            setPortalContainer(null);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={clsx(className, style.search)} id="search">
      <DocSearch
        appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ''}
        indexName="icerpc"
        insights={true}
        searchParameters={{
          filters
        }}
      />
      {portalContainer &&
        ReactDOM.createPortal(
          <SliceSelector
            showTooltips={false}
            updatePage={false}
            className="h-fit w-full"
            tabClassName="!p-1 !px-[6px] capitalize"
            showDarkMode={false}
          />,
          portalContainer
        )}
    </div>
  );
};
