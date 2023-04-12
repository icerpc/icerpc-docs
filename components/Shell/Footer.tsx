// Copyright (c) ZeroC, Inc.

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="-mb-2 mt-0 border-t border-lightBorder px-4 py-6 dark:border-darkBorder dark:bg-black">
      <div className="mx-auto w-full max-w-[98rem] p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()}{' '}
          <Link
            href="https://zeroc.com/"
            className="text-primary hover:underline"
          >
            ZeroC, Inc
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="mr-10 mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0">
          <li>
            <Link
              href="https://zeroc.com/about"
              className="mr-4 text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)] md:mr-6  "
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://zeroc.com/privacy"
              className="mr-4 text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)] md:mr-6 "
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="https://zeroc.com/contact"
              className="hover:underline dark:text-[rgba(255,255,255,0.6)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
