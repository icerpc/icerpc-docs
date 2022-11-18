// Copyright (c) ZeroC, Inc. All rights reserved.

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

// TODO: Update the DocSearch API keys, these are test keys that DocSearch makes publicly available.
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
          background: var(--background);
          height: 30px;
          border-radius: 5px;
          width: 150px;
          color: gray;
          font-size: 12px;
          padding: 0;
          margin: 0;
          justify-content: center;
          padding-right: 1rem;
          width: 130px;
        }

        :global(.DocSearch-Button:hover) {
          box-shadow: none;
          background: none;
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
          background: none;
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
          background: none;
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
          color: var(--docsearch-muted-color);
          padding: 0;
          margin-right: 0.5rem;
        }
      `}</style>
    </>
  );
}
