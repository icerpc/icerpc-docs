// Copyright (c) ZeroC, Inc.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { setCookie, getCookie } from 'cookies-next';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

// A key to store the cookie value.
const ALLOW_COOKIES = 'allow_cookies';

export function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const cookieValue = getCookie(ALLOW_COOKIES);
    setShowBanner(cookieValue === undefined);
    setShowButtons(cookieValue === undefined);
  }, []);

  const handleAccept = () => {
    setCookie(ALLOW_COOKIES, true);
    setShowButtons(false);
    setShowBanner(false);
  };

  const handleReject = () => {
    setCookie(ALLOW_COOKIES, false);
    setShowButtons(false);
    setShowBanner(false);
  };

  const bannerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: -50
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
              <div
                className="absolute -right-10 -top-10 text-yellow-500"
                style={{ width: '80px', height: '77px' }}
              >
                <svg
                  width="120"
                  height="119"
                  viewBox="0 0 120 119"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.3"
                    d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
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
                <p className="text-sm">
                  This website uses cookies to analyze traffic and improve your
                  experience. By clicking &quot;Accept,&quot; you consent to the
                  use of these cookies. You can manage your preferences and
                  learn more about our cookies policy in our{' '}
                  <Link
                    href="/privacy"
                    target="_blank"
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
              Of course
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
