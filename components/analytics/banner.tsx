// Copyright (c) ZeroC, Inc.

import { motion, Variants } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

// Constants
const bannerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: 100,
    x: 75,
    transition: { ease: 'easeInOut' }
  }
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
    className="fixed bottom-0 z-10 w-full overflow-hidden rounded-lg border-t border-t-black/10 bg-white shadow-2xl md:right-10 md:bottom-24 md:max-w-[350px] md:border-t-0 xl:w-1/4"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={bannerVariants}
  >
    <div>
      <div className="relative overflow-hidden px-8 pt-8">
        <button
          className="absolute top-0 right-0 mt-1 mr-1 p-4 text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden focus:ring-inset md:hidden"
          onClick={() => toggleShowBanner()}
          aria-label="Close banner"
        >
          <FontAwesomeIcon icon={faXmarkCircle} className="size-6" />
        </button>
        <div className="flex flex-col pb-2 text-2xl">
          <small className="text-sm font-bold text-gray-500">Cookies</small>
          <span className="text-3xl font-bold">Your privacy</span>
        </div>
        <div className="pb-4">
          <div className="text-sm">
            This website uses cookies to analyze traffic and improve your
            experience.
            <br />
            <div className="mt-3 mr-2 text-[10px] leading-[0.8rem] text-gray-500">
              By clicking &quot;Accept,&quot; you consent to the use of these
              cookies. You can learn more about our cookies policy in our{' '}
              <a
                href="https://zeroc.com/privacy"
                className="text-blue-500 underline"
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex w-full items-center justify-center gap-3 px-8 pb-4 text-sm">
      <button
        className="flex-1 rounded-lg border border-black/20 bg-white px-3 py-[10px] text-center text-black/40 hover:border-black hover:text-black"
        onClick={handleReject}
      >
        No thanks
      </button>
      <button
        className="flex-1 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 px-3 py-[10px] text-center text-white"
        onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  </motion.div>
);
