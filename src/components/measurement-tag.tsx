import Script from "next/script";

import { ADS_ID, CONSENT_BOOTSTRAP } from "@/lib/ads";

// Os dois scripts usam beforeInteractive para irem ao head do HTML servido,
// nesta ordem: os padrões de consentimento precisam ser enfileirados antes do
// gtag.js ler o dataLayer. O conteúdo inline é uma constante de build, nunca
// entrada do visitante.
export function MeasurementTag() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document --
          Regra do Pages Router. O guia do App Router em node_modules/next/dist/docs exige
          que scripts beforeInteractive fiquem no layout raiz, que é onde este é renderizado. */}
      <Script
        id="maestri-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }}
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- idem acima. */}
      <Script
        id="maestri-google-ads"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
      />
    </>
  );
}
