// Copyright (c) ZeroC, Inc.

'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { AnimatePresence } from 'framer-motion';
import { OptionsType } from 'cookies-next/lib/types';
import { GoogleAnalytics } from './google-analytics';
import { Banner } from './banner';
import { CookieButton } from './cookie-button';

// Constants
const COOKIE_EXPIRATION_TIME = 365 * 24 * 60 * 60 * 1000;
const ALLOW_COOKIES = 'allow_cookies'; // A key to store the cookie value.

export function Analytics() {
  const cookieValue = getCookie(ALLOW_COOKIES);
  const [showBanner, setShowBanner] = useState(false);
  const [showCookieButton, setShowCookieButton] = useState(false);
  const [enableAnalytics, setEnableAnalytics] = useState(
    cookieValue === 'true' ? true : false
  );

  const cookieOptions: OptionsType = {
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME),
    sameSite: 'strict'
  };

  useEffect(() => {
    const cookieValue = getCookie(ALLOW_COOKIES);
    setShowBanner(cookieValue === undefined);
    setShowCookieButton(cookieValue === undefined);
    setEnableAnalytics(cookieValue === 'true' ? true : false);
  }, []);

  const handleSetCookieSettings = (value: boolean) => {
    setCookie(ALLOW_COOKIES, value, cookieOptions);
    setShowCookieButton(false);
    setShowBanner(false);
    setEnableAnalytics(value === true);
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
