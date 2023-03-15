// Copyright (c) ZeroC, Inc.

import React from 'react';
import lightIcon from 'public/images/Light-Icon.svg';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="my-4">
      <div className="container mx-auto w-full py-4 px-0 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://zeroc.com/"
            className="mb-4 flex items-center sm:mb-0"
          >
            <Image src={lightIcon} className="mr-3 h-8" alt="IceRPC Logo" />
            <span className="-ml-2 self-center whitespace-nowrap pt-3 text-2xl font-semibold text-black dark:text-white">
              IceRPC
            </span>
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <span className="ml-1 mt-6 block text-start text-sm text-gray-500 dark:text-gray-400">
          ©{' '}
          <a href="https://zeroc.com/" className="text-primary hover:underline">
            ZeroC Inc
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
