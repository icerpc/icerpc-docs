// Copyright (c) ZeroC, Inc.

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="-mb-2 mt-0 border-t border-lightBorder py-6 dark:border-darkBorder dark:bg-black">
      <div className="mx-auto w-full max-w-[100rem] px-4 md:flex md:items-center md:justify-between md:px-10">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()} ZeroC
        </span>
        <ul className="mt-3 flex flex-wrap items-center space-x-6 text-sm font-medium sm:mt-0">
          <li>
            <Link
              href="https://zeroc.com/about"
              className="text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://zeroc.com/privacy"
              className="text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="https://zeroc.com/contact"
              className="text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)]"
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
