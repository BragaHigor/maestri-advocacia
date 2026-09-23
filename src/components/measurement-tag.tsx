import Script from "next/script";

import { ADS_ID, CONSENT_BOOTSTRAP } from "@/lib/ads";

// Both scripts use beforeInteractive so they land in the served HTML head, in
// this order: consent defaults must be queued before gtag.js reads dataLayer.
// The inline payload is a build-time constant, never visitor input.
export function MeasurementTag() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document --
          Pages Router rule. The App Router guide in node_modules/next/dist/docs requires
          beforeInteractive scripts to live in the root layout, which is where this renders. */}
      <Script
        id="maestri-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }}
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- same as above. */}
      <Script
        id="maestri-google-ads"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
      />
    </>
  );
}
