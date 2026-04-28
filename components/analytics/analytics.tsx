// Copyright (c) ZeroC, Inc.

'use client';

import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { AnimatePresence } from 'framer-motion';
import { useMounted } from '@/context/state';
import { GoogleAnalytics } from './google-analytics';
import { Banner } from './banner';
import { CookieButton } from './cookie-button';

// Constants
const ALLOW_COOKIES = 'allow.cookies'; // A key to store the cookie value.

export function Analytics() {
  const mounted = useMounted();
  const cookieValue = mounted ? getCookie(ALLOW_COOKIES) : undefined;
  const storedConsent =
    cookieValue === undefined ? undefined : cookieValue === 'true';

  // Explicit user action takes precedence over persisted cookie value.
  const [cookieConsent, setCookieConsent] = useState<boolean | undefined>();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const effectiveConsent = cookieConsent ?? storedConsent;
  const enableAnalytics = effectiveConsent === true;
  const showBanner = effectiveConsent === undefined && !bannerDismissed;
  const showCookieButton = effectiveConsent === undefined && bannerDismissed;

  const handleSetCookieSettings = async (value: boolean) => {
    setBannerDismissed(false);
    setCookieConsent(value);

    // Safari workaround to keep the cookie stored for more than 7 days
    await fetch(`api/cookies?allow-cookies=${encodeURIComponent(value)}`);
  };

  const toggleShowBanner = () => setBannerDismissed((prev) => !prev);
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
