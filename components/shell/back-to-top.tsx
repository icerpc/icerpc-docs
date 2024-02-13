// Copyright (c) ZeroC, Inc.

'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-regular-svg-icons';

export const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (scrollPosition > 100) {
    return (
      <button
        className="my-4 flex animate-fade-in-up flex-row items-center pl-[2px] text-xs font-semibold uppercase  dark:text-white"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FontAwesomeIcon
          icon={faCircleUp}
          className="mr-4 size-4 text-primary"
        />

        <h2> Back to top </h2>
      </button>
    );
  } else {
    return null;
  }
};
