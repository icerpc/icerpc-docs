// Copyright (c) ZeroC, Inc.

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import { useTheme } from 'next-themes';

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

interface Props {
  className?: string;
}

export const SearchButton = ({ className }: Props) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className={className}>
      <Search />
      <style jsx>{`
        // Search button style

        :global(.DocSearch-Button) {
          --docsearch-text-color: ${resolvedTheme == 'dark'
            ? 'rgba(255, 255, 255, 1)'
            : 'rgb(28, 30, 33)'};
          --docsearch-muted-color: ${resolvedTheme == 'dark'
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgb(150, 159, 175)'};
        }

        :global(.DocSearch-Button) {
          border-radius: 4px;
          // grayish white background
          background: ${resolvedTheme == 'dark'
            ? 'rgba(0, 0, 0, 0.45)'
            : '#f7f7f7'};
          border: 1px solid ${resolvedTheme == 'dark' ? '#1f1f1f' : '#eaeaea'};
          width: 100%;
          height: 35px;
        }

        // Breakpoint for the search button to remove background and box shadow when the screen is small
        @media (max-width: 768px) {
          :global(.DocSearch-Button) {
            background: none;
            box-shadow: none;
            width: 35px;
          }
        }

        :global(.DocSearch-Button:hover) {
          box-shadow: none;
          background: none;
        }

        :global(.DocSearch-Button:hover)
          :global(.DocSearch-Button-Placeholder) {
          color: #43a0f7;
        }

        :global(.DocSearch-Button:hover) :global(.DocSearch-Button-Key) {
          color: #43a0f7;
        }

        :global(.DocSearch-Button-Keys) {
          margin: -20px;
        }

        :global(.DocSearch-Button-Key) {
          background: none;
          box-shadow: none;
          color: var(--docsearch-muted-color);
          padding: 0;
          margin: -2px;
          height: 20px;
          font-size: 12px;
          transition: 0.3s;
          justify-content: between;
          align-items: center;
          font-family: inherit;
        }

        :global(.DocSearch-Search-Icon) {
          margin-right: 10px;
          margin-left: 0px;
          padding: 3px;
        }

        @media (max-width: 768px) {
          :global(.DocSearch-Search-Icon) {
            padding: 1px;
            margin-top: 2px;
          }
        }

        :global(.DocSearch-Button-Placeholder) {
          font-size: 10pt;
          color: var(--docsearch-muted-color);
          padding: 2px;
        }
      `}</style>
    </div>
  );
};
