export const ADS_ID = "AW-18438128750";
export const ADS_CONVERSION = `${ADS_ID}/ag1XCKXGgPQcEO6I_tdE`;
export const CONSENT_KEY = "maestri-measurement-v1";
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const CONTACT_KEY = "maestri-contact-measured";

// Fixed labels. Never a form field, a link or anything the visitor typed.
export type ContactSource = "whatsapp_float" | "contact_form";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// One entry per contact source already measured in this page's lifetime.
const measured = new Set<ContactSource>();

const DENIED_SIGNALS = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const GRANTED_SIGNALS = {
  ...DENIED_SIGNALS,
  ad_storage: "granted",
  ad_user_data: "granted",
} as const;

// Advanced consent mode: the tag is present on every page view so Google can
// verify it, but it starts denied. A stored acceptance is read here, ahead of
// gtag.js, so a returning visitor never measures a page under the wrong state.
export const CONSENT_BOOTSTRAP = `
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments)}
window.gtag=gtag;
;(function(){
var ok=false;
try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)})||"null");
ok=!!(c&&c.version===1&&c.accepted===true&&typeof c.at==="number"&&c.at<=Date.now()&&Date.now()-c.at<${CONSENT_LIFETIME})}catch(e){}
gtag("consent","default",ok?${JSON.stringify(GRANTED_SIGNALS)}:${JSON.stringify(DENIED_SIGNALS)});
gtag("set","ads_data_redaction",!ok);
gtag("js",new Date());
gtag("config",${JSON.stringify(ADS_ID)},{send_page_view:false,allow_ad_personalization_signals:false,allow_enhanced_conversions:false,page_location:location.origin+location.pathname,page_referrer:""})
})()
`.trim();

export function readConsent(): boolean | null {
  try {
    const choice = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    if (choice?.version === 1 && typeof choice.accepted === "boolean" &&
        typeof choice.at === "number" && choice.at <= Date.now() &&
        Date.now() - choice.at < CONSENT_LIFETIME) return choice.accepted;
  } catch { /* Storage unavailable or invalid: require a new choice. */ }
  return null;
}

// Updates the already-loaded tag. Refusing keeps it cookieless; it never
// unloads the script, so the page in front of the visitor is not reloaded.
export function applyConsent(accepted: boolean, persist = true) {
  if (persist) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, accepted, at: Date.now() })); }
    catch { /* The choice remains valid for this page only. */ }
  }
  window.gtag?.("set", "ads_data_redaction", !accepted);
  window.gtag?.("consent", "update", accepted ? GRANTED_SIGNALS : DENIED_SIGNALS);
}

// Only a fixed source label travels with the event: form fields and external
// link URLs cannot enter it. Under advanced consent mode a denied visitor still
// reaches this point, and Google receives the ping without advertising cookies.
//
// One conversion per source per visit. The form's "open again" button submits
// the same form, so it reuses "contact_form" and retrying an attempt that did
// not open is not counted a second time.
export function measureContactAttempt(source: ContactSource): boolean {
  if (!window.gtag || measured.has(source)) return false;
  const key = `${CONTACT_KEY}:${source}`;
  try { if (sessionStorage.getItem(key)) return false; }
  catch { /* In-memory deduplication remains available. */ }
  measured.add(source);
  try { sessionStorage.setItem(key, "1"); } catch { /* Optional storage. */ }
  window.gtag("event", "conversion", {
    send_to: ADS_CONVERSION,
    contact_source: source,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
  });
  return true;
}
