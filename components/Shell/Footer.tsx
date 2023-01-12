// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import React from 'react';
import { MdHelpCenter, MdVideocam } from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
export function Footer({ children }) {
  return (
    <footer className="flex flex-row justify-between items-center pb-16">
      <ul className="p-0 flex flex-col gap-4 pt-0">
        <li className="flex flex-row gap-2 items-center">
          <MdHelpCenter size={20} />
          <span>
            Need help?{' '}
            <a
              className="text-[var(--primary-color)]"
              href="https://www.zeroc.com"
            >
              Contact us
            </a>
          </span>
        </li>
        <li className="flex flex-row gap-2 items-center">
          <MdVideocam size={20} />
          <span>
            Watch our{' '}
            <a
              className="text-[var(--primary-color)]"
              href="https://www.zeroc.com"
            >
              Developer tutorials
            </a>
          </span>
        </li>
      </ul>
      <form
        className="flex flex-col ml-8 pt-4 gap-2"
        action="/send-data-here"
        method="post"
      >
        <label htmlFor="email">Sign up for developer updates:</label>
        <div className="flex flex-row">
          <input
            className="w-64 p-2 rounded border border-solid border-[var(--border-color)] mr-2"
            type="email"
            id="email"
            name="first"
            required
          />
          <button
            className=" p-2 text-sm rounded font-medium bg-[var(--primary-color)] text-white"
            type="submit"
          >
            Subscribe
          </button>
        </div>
        <span className="text-sm">
          You can unsubscribe at any time. Read our
          <br />
          <Link
            className="text-[var(--primary-color)]"
            href="https://www.zeroc.com"
          >
            privacy policy.
          </Link>
        </span>
      </form>
    </footer>
  );
}
