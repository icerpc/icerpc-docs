// Copyright (c) ZeroC, Inc. All rights reserved.

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

// TODO: Update the DocSearch API keys, these are test keys that DocSearch makes publically available.
function Search() {
  return (
    <DocSearch
      appId="R2IYF7ETH7"
      apiKey="599cec31baffa4868cae4e79f180729b"
      indexName="docsearch"
    />
  );
}

export function SearchButton() {
  return (
    <>
      <Search />
      <style jsx>{`
        // Search button styles

        :global(.DocSearch-Button) {
          background: white;
          height: 30px;
          border-radius: 5px;
          width: 150px;
          color: gray;
          font-size: 12px;
          padding: 0;
          margin: 0;
          padding-right: 1rem;
          justify-content: cemter;
        }

        :global(.DocSearch-Button:hover) {
          box-shadow: none;
        }

        :global(.DocSearch-Button:hover)
          :global(.DocSearch-Button-Placeholder) {
          color: var(--primary-color);
        }

        :global(.DocSearch-Button:hover) :global(.DocSearch-Button-Keys) {
          border: 1px solid var(--primary-color);
        }

        :global(.DocSearch-Button:hover) :global(.DocSearch-Button-Key) {
          color: var(--primary-color);
        }

        :global(.DocSearch-Button-Key) {
          background: white;
          box-shadow: none;
          color: var(--docsearch-muted-color);
          padding: 0;
          margin: 0;
          width: 15px;
          height: 20px;
          transition: 0.3s;
          justify-content: center;
          align-items: center;
          font-family: Inter;
        }

        :global(.DocSearch-Button-Keys) {
          border: 1px solid var(--border-color);
          border-radius: 5px;
          background: white;
          color: gray;
          font-size: 12px;
          padding-top: 2px;
          display: flex;
          justify-content: center;
          transition: 0.3s;
        }

        :global(.DocSearch-Search-Icon) {
          margin-right: 5px;
          padding-right: 5px;
        }

        :global(.DocSearch-Button-Placeholder) {
          font-size: 10pt;
          color: gray;
          padding: 0;
          margin-right: 0.5rem;
        }
      `}</style>
    </>
  );
}
