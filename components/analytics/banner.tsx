// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

// Constants
const bannerVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  },
  exit: { opacity: 0, scale: 0.5, y: -50 }
};

// Banner component
type BannerProps = {
  handleAccept: () => void;
  handleReject: () => void;
  toggleShowBanner: () => void;
};

export const Banner = ({
  handleAccept,
  handleReject,
  toggleShowBanner
}: BannerProps) => (
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
          onClick={() => toggleShowBanner()}
          aria-label="Close banner"
        >
          <FontAwesomeIcon icon={faXmarkCircle} className="size-6" />
        </button>
        <div className="flex flex-col pb-4 text-2xl">
          <small className="text-sm font-bold text-gray-500">Cookies</small>
          <span className="text-3xl font-bold">Your privacy</span>
        </div>
        <div className="pb-4">
          <p className="text-sm">
            This website uses cookies to analyze traffic and improve your
            experience. By clicking &quot;Accept,&quot; you consent to the use
            of these cookies. You can learn more about our cookies policy in our{' '}
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
        className="flex-1 px-4 py-3 text-gray-500 duration-150 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white"
        onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  </motion.div>
);
