export const ADS_ID = "AW-18438128750";
export const ADS_CONVERSION = `${ADS_ID}/ag1XCKXGgPQcEO6I_tdE`;
export const CONSENT_KEY = "maestri-measurement-v1";
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const CONTACT_KEY = "maestri-contact-measured";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let granted = false;
let started = false;
let measured = false;

export function readConsent(): boolean | null {
  try {
    const choice = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    if (choice?.version === 1 && typeof choice.accepted === "boolean" &&
        typeof choice.at === "number" && choice.at <= Date.now() &&
        Date.now() - choice.at < CONSENT_LIFETIME) return choice.accepted;
  } catch { /* Storage unavailable or invalid: require a new choice. */ }
  return null;
}

export function applyConsent(accepted: boolean, persist = true) {
  granted = accepted;
  if (persist) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, accepted, at: Date.now() })); }
    catch { /* The choice remains valid for this page only. */ }
  }
  const denied = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };
  if (!accepted) {
    window.gtag?.("consent", "update", denied);
    return;
  }
  if (!started) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function () {
      // gtag.js consumes Arguments objects, as in Google's official bootstrap.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", denied);
  }
  window.gtag?.("consent", "update", { ...denied, ad_storage: "granted", ad_user_data: "granted" });
  if (started) return;
  started = true;
  window.gtag?.("set", "ads_data_redaction", true);
  window.gtag?.("js", new Date());
  window.gtag?.("config", ADS_ID, {
    send_page_view: false,
    allow_ad_personalization_signals: false,
    allow_enhanced_conversions: false,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
  });
  const script = document.createElement("script");
  script.id = "maestri-google-ads";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  document.head.appendChild(script);
}

// No arguments: form fields and external link URLs cannot enter this event.
export function measureContactAttempt(): boolean {
  if (!granted || !window.gtag || measured) return false;
  try { if (sessionStorage.getItem(CONTACT_KEY)) return false; }
  catch { /* In-memory deduplication remains available. */ }
  measured = true;
  try { sessionStorage.setItem(CONTACT_KEY, "1"); } catch { /* Optional storage. */ }
  window.gtag("event", "conversion", {
    send_to: ADS_CONVERSION,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
  });
  return true;
}
