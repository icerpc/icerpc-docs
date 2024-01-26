// Copyright (c) ZeroC, Inc.

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';

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

// Cookie button component
type CookieButtonProps = {
  toggleShowBanner: () => void;
};

export const CookieButton = ({ toggleShowBanner }: CookieButtonProps) => (
  <motion.button
    className="fixed bottom-6 right-10 hidden items-center rounded-full bg-gray-900 px-4 py-3 text-sm uppercase text-white md:flex"
    onClick={() => toggleShowBanner()}
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={bannerVariants}
  >
    <FontAwesomeIcon icon={faCookie} className="mr-2 size-4" />
    Cookies
  </motion.button>
);
