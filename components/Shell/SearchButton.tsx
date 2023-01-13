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
      <div className="relative min-w-[200px] max-w-[400px] flex-1">
        <Search />
      </div>

      <style jsx>{`
        // Search button style
        :global(.DocSearch-Button) {
          display: flex;
          width: 100%;
          height: 36px;
          background: var(--nav-background);
          border: 1px solid var(--border-color);
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
          font-family: inherit;
        }

        :global(.DocSearch-Button-Keys) {
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
          margin-left: 10px;
          padding-right: 5px;
          padding-top: 4px;
          padding-bottom: 4px;
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
