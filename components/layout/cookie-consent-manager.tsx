"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const CONSENT_KEY = "ideal_solutions_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
type CookieConsent = "accepted";

function persistConsent(value: CookieConsent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  document.cookie = `${CONSENT_KEY}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
}

function readConsent(): CookieConsent | null {
  const stored = window.localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted") return stored;

  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_KEY}=`))
    ?.split("=")[1];
  return cookieValue === "accepted" ? cookieValue : null;
}

function TrackingScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const hubspotTrackingId = process.env.NEXT_PUBLIC_IDEALSOLUTIONS_HUBSPOT_TRACKING_ID;

  return (
    <>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}
      {clarityId ? (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}
      {hubspotTrackingId ? (
        <Script id="hubspot-tracking" strategy="lazyOnload" src={`https://js.hs-scripts.com/${hubspotTrackingId}.js`} />
      ) : null}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export function CookieConsentManager() {
  const [consent, setConsent] = useState<CookieConsent | null | undefined>();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setConsent(readConsent()));
  }, []);

  function handleAccept() {
    persistConsent("accepted");
    setConsent("accepted");
  }

  if (consent === "accepted") return <TrackingScripts />;
  if (consent === undefined || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-white/12 bg-[#252B33] p-5 text-white shadow-[0_24px_80px_rgba(11,18,32,0.28)] sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold">Cookie privacy</p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            We use cookies to improve your experience and help our website work
            better. You can choose to accept or decline, and we will remember
            your choice on this device.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => setDismissed(true)} className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/16 px-5 text-sm font-semibold text-white transition hover:border-white/34 hover:bg-white/8">
            Decline
          </button>
          <button type="button" onClick={handleAccept} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#F2A900] px-5 text-sm font-semibold text-[#252B33] transition hover:bg-[#ffc23d]">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
