// Copyright (c) ZeroC, Inc.

import Link from 'next/link';

const linkAttributes = {
  className: 'text-gray-500 hover:underline dark:text-[rgba(255,255,255,0.6)]'
};

const footerMenuItems = [
  {
    href: 'https://zeroc.com/about',
    text: 'About'
  },
  {
    href: 'https://zeroc.com/privacy',
    text: 'Privacy Policy'
  },
  {
    href: 'https://zeroc.com/contact',
    text: 'Contact'
  }
];

export const Footer = () => (
  <footer className="-mb-2 mt-0 border-t border-lightBorder py-6 dark:border-darkBorder dark:bg-dark">
    <div className="mx-auto w-full max-w-[100rem] px-4">
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between  md:px-10">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()} ZeroC
        </span>
        <ul className="mt-3 flex flex-wrap items-center space-x-6 text-sm font-medium sm:mt-0">
          {footerMenuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} {...linkAttributes}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
