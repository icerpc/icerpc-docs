// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import { useRouter } from 'next/router';

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

export function TopNav() {
  const router = useRouter();
  return (
    <nav>
      <div className="flex top-row">
        <Link href="/">LOGO HERE: DOCS</Link>
        <Search />
      </div>
      <div className="flex bottom-row">
        <Link href="/" className="flex">
          <a className={router.pathname == '/' ? 'active' : ''}>Home</a>
        </Link>
        <Link href="/docs/slice" className="flex">
          <a
            className={
              router.pathname.startsWith('/docs/slice') ? 'active' : ''
            }
          >
            Slice
          </a>
        </Link>
        <Link href="/docs/rpc" className="flex">
          <a
            className={router.pathname.startsWith('/docs/rpc') ? 'active' : ''}
          >
            Remote Procedure Calls
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          nav {
            top: 0;
            position: fixed;
            width: 100%;
            height: 115px;
            z-index: 100;
            flex-direction: row;
            flex-wrap: wrap;
            background: var(--off-white);
            border-bottom: 1px solid var(--border-color);
          }

          nav :global(a) {
            text-decoration: none;
          }

          nav :global(.DocSearch-Button) {
            background: white;
            height: 40px;
            border-radius: 5px;
            border: 1px solid var(--border-color);
            width: 30%;
          }
          nav :global(.DocSearch-Button:hover) {
            box-shadow: none;
            background: #e8eef3;
          }
          :global(.dark) nav :global(.DocSearch-Button:hover) {
            background: #424248;
          }

          .active {
            color: var(--primary-color);
            opacity: 1;
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 0.8rem;
            animation: fadeIn 0.4s;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              text-decoration-thickness: 0px;
            }
            100% {
              opacity: 1;
              text-decoration-thickness: 2px;
            }
          }

          .top-row {
            height: 50%;
            width: 100%;
            gap: 20px;
            padding-left: 2rem;
            padding-top: 1rem;
            display: flex;
            align-items: center;
          }

          .bottom-row {
            height: 50%;
            width: 100%;
            gap: 40px;
            padding-left: 1.5rem;
            padding-top: 1rem;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </nav>
  );
}
