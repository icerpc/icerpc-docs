// Copyright (c) ZeroC, Inc.

'use client';

import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { AnimatePresence } from 'framer-motion';
import { GoogleAnalytics } from './google-analytics';
import { Banner } from './banner';
import { CookieButton } from './cookie-button';

// Constants
const ALLOW_COOKIES = 'allow.cookies'; // A key to store the cookie value.

export function Analytics() {
  const cookieValue = getCookie(ALLOW_COOKIES);
  const [showBanner, setShowBanner] = useState(false);
  const [showCookieButton, setShowCookieButton] = useState(false);
  const [enableAnalytics, setEnableAnalytics] = useState(
    cookieValue === 'true' ? true : false
  );

  useEffect(() => {
    setShowBanner(cookieValue === undefined);
    setShowCookieButton(cookieValue === undefined);
    setEnableAnalytics(cookieValue === 'true' ? true : false);
  }, [cookieValue]);

  const handleSetCookieSettings = (value: boolean) => {
    setShowCookieButton(false);
    setShowBanner(false);
    setEnableAnalytics(value === true);

    // Safari workaround to keep the cookie stored for more than 7 days
    fetch(`api/cookies?allow-cookies=${encodeURIComponent(value)}`);
  };

  const toggleShowBanner = () => setShowBanner(!showBanner);
  const handleAccept = () => handleSetCookieSettings(true);
  const handleReject = () => handleSetCookieSettings(false);

  return (
    <>
      {enableAnalytics && <GoogleAnalytics />}
      <AnimatePresence>
        {showBanner && (
          <Banner
            handleAccept={handleAccept}
            handleReject={handleReject}
            toggleShowBanner={toggleShowBanner}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCookieButton && (
          <CookieButton toggleShowBanner={toggleShowBanner} />
        )}
      </AnimatePresence>
    </>
  );
}
