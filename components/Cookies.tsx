// Copyright (c) ZeroC, Inc.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { setCookie, getCookie } from 'cookies-next';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { OptionsType } from 'cookies-next/lib/types';

// A key to store the cookie value.
const ALLOW_COOKIES = 'allow_cookies';

export function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const cookieOptions: OptionsType = {
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    sameSite: 'strict'
  };

  useEffect(() => {
    const cookieValue = getCookie(ALLOW_COOKIES);
    setShowBanner(cookieValue === undefined);
    setShowButtons(cookieValue === undefined);
  }, []);

  const handleAccept = () => {
    setCookie(ALLOW_COOKIES, true, cookieOptions);
    setShowButtons(false);
    setShowBanner(false);
  };

  const handleReject = () => {
    setCookie(ALLOW_COOKIES, false, cookieOptions);
    setShowButtons(false);
    setShowBanner(false);
  };

  const bannerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -250
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          key="banner"
          className="fixed bottom-0 z-10 w-full overflow-hidden rounded-lg border-t border-t-black/10 bg-white shadow-2xl md:bottom-24 md:right-10 md:max-w-[350px] md:border-t-0 xl:w-1/4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={bannerVariants}
        >
          <div>
            <div className="relative overflow-hidden px-8 pt-8">
              <button
                className="absolute right-0 top-0 p-4 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 md:hidden"
                onClick={() => setShowBanner(!showBanner)}
                aria-label="Close banner"
              >
                <FontAwesomeIcon icon={faXmarkCircle} className="h-6 w-6" />
              </button>
              <div className="flex flex-col pb-4 text-2xl">
                <small className="text-sm font-bold text-gray-500">
                  Cookies
                </small>
                <span className="text-3xl font-bold">Your privacy</span>
              </div>
              <div className="pb-4">
                <p className="text-sm dark:text-slate-500">
                  This website uses cookies to analyze traffic and improve your
                  experience. By clicking &quot;Accept,&quot; you consent to the
                  use of these cookies. You can learn more about our cookies
                  policy in our{' '}
                  <Link
                    href="https://zeroc.com/privacy"
                    className="text-blue-500 underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center border-t border-solid border-gray-200">
            <button
              className="flex-1 border-r border-gray-200 px-4 py-3 text-gray-500 duration-150 hover:bg-red-400 hover:text-white"
              onClick={handleReject}
            >
              No thanks !
            </button>
            <button
              className="flex-1 px-4 py-3 text-gray-500 duration-150 hover:bg-green-400 hover:text-white"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
      {showButtons && (
        <motion.button
          className="fixed bottom-6 right-10 hidden items-center rounded-full bg-gray-900 px-4 py-3 text-sm uppercase text-white md:flex"
          onClick={() => setShowBanner(!showBanner)}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={bannerVariants}
        >
          <FontAwesomeIcon icon={faCookie} className="mr-2 h-4 w-4" />
          Cookies
        </motion.button>
      )}
    </AnimatePresence>
  );
}
