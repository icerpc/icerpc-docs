// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { SearchButton } from './SearchButton';
import { ThemeToggle } from '../ThemeToggle';

export function TopNav() {
  const router = useRouter();

  return (
    <nav>
      <div className="nav-container">
        <div className="left-col">
          <SearchButton />
        </div>
        <div className="right-col">
          <Link href="/" className="flex" legacyBehavior>
            <a className={router.pathname == '/' ? 'active' : ''}>Home</a>
          </Link>
          <Link href="/docs/getting-started" className="flex" legacyBehavior>
            <a
              className={
                router.pathname.startsWith('/docs/getting-started')
                  ? 'active'
                  : ''
              }
            >
              Getting Started
            </a>
          </Link>
          <Link href="/docs/slice" className="flex" legacyBehavior>
            <a
              className={
                router.pathname.startsWith('/docs/slice') ? 'active' : ''
              }
            >
              Slice
            </a>
          </Link>
          <Link href="/docs/rpc" className="flex" legacyBehavior>
            <a
              className={
                router.pathname.startsWith('/docs/rpc') ? 'active' : ''
              }
            >
              RPC Core
            </a>
          </Link>

          <div className="icons">
            <div className="vl" />
            <ThemeToggle />
            <a href="https://github.com/zeroc-ice" aria-label="Github">
              <FaGithub size={20} />
            </a>
            <a href="https://twitter.com/zeroc" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          nav {
            top: 0;
            position: fixed;
            height: var(--nav-height);
            z-index: 100;
            display: flex;
            align-items: center;
            background: var(--background);
            border-bottom: 1px solid var(--border-color);
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            padding-left: calc(var(--side-nav-width) + 2rem);
            border-radius: 5px;
            background: var(--nav-background);
          }

          nav :global(a) {
            text-decoration: none;
          }

          .active {
            color: var(--primary-color);
            opacity: 1;
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 1.5rem;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .left-col {
            display: flex;
            align-items: flex-start;
            flex: 1;
          }

          .right-col {
            height: 50%;
            gap: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 2rem;
            margin-right: 0px;
          }

          .right-col a:hover {
            color: var(--primary-color);
          }

          .image-container {
            display: flex;
            align-items: center;
            width: 100px;
          }

          .icons {
            display: flex;
            align-items: center;
            gap: 20px;
            padding-left: 1rem;
          }

          .vl {
            border-left: 1px solid var(--border-color);
            height: calc(var(--nav-height) - 40px);
            left: 50%;
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
        `}
      </style>
    </nav>
  );
}
