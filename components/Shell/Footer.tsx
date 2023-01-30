// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { MdHelpCenter, MdVideocam } from 'react-icons/md';

export const Footer = () => {
  return (
    <footer className="mb-10 flex flex-row items-center justify-between p-0 ">
      <ul className="flex flex-col gap-2 p-0">
        <li className="flex flex-row items-center gap-2">
          <MdHelpCenter size={20} />
          <span>
            Need help?{' '}
            <a className="text-primary" href="https://www.zeroc.com">
              Contact us
            </a>
          </span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <MdVideocam size={20} />
          <span>
            Watch our{' '}
            <a className="text-primary" href="https://www.zeroc.com">
              Developer tutorials
            </a>
          </span>
        </li>
      </ul>
      <form
        className="ml-8 flex flex-col gap-2 pt-4"
        action="/send-data-here"
        method="post"
      >
        <label htmlFor="email">Sign up for developer updates:</label>
        <div className="flex flex-row">
          <input
            className="mr-2 w-64 rounded border border-solid border-lightBorder dark:border-darkBorder"
            type="email"
            id="email"
            name="first"
            required
          />
          <button
            className=" rounded bg-[var(--primary-color)] p-2 text-sm font-medium text-white"
            type="submit"
          >
            Subscribe
          </button>
        </div>
        <span className="text-xs">
          You can unsubscribe at any time. Read our{' '}
          <Link className="underline" href="https://www.zeroc.com">
            privacy policy.
          </Link>
        </span>
      </form>
    </footer>
  );
};
