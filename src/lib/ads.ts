export const ADS_ID = "AW-18438128750";
export const ADS_CONVERSION = `${ADS_ID}/ag1XCKXGgPQcEO6I_tdE`;
export const CONSENT_KEY = "maestri-measurement-v1";
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const CONTACT_KEY = "maestri-contact-measured";

// Rótulos fixos. Nunca um campo do formulário, um link ou algo digitado
// pelo visitante.
export type ContactSource = "whatsapp_float" | "contact_form";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Uma entrada por origem de contato já medida no ciclo de vida desta página.
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

// Consent mode avançado: a tag existe em toda visita, para que o Google consiga
// verificá-la, mas começa negada. A escolha salva é lida aqui, antes do gtag.js,
// então quem já aceitou nunca mede uma página no estado errado.
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
  } catch { /* Armazenamento indisponível ou inválido: exigir nova escolha. */ }
  return null;
}

// Atualiza a tag já carregada. Recusar a mantém sem cookies; o script nunca é
// descarregado, então a página diante do visitante não é recarregada.
export function applyConsent(accepted: boolean, persist = true) {
  if (persist) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, accepted, at: Date.now() })); }
    catch { /* A escolha vale apenas para esta página. */ }
  }
  window.gtag?.("set", "ads_data_redaction", !accepted);
  window.gtag?.("consent", "update", accepted ? GRANTED_SIGNALS : DENIED_SIGNALS);
}

// Só um rótulo fixo de origem viaja no evento: campos do formulário e URLs de
// links externos não entram nele. No consent mode avançado um visitante que
// recusou ainda chega aqui, e o Google recebe o ping sem cookies de publicidade.
//
// Uma conversão por origem por visita. O botão "Abrir novamente" envia o mesmo
// formulário, então reutiliza "contact_form" e repetir uma tentativa que não
// abriu não é contado uma segunda vez.
export function measureContactAttempt(source: ContactSource): boolean {
  if (!window.gtag || measured.has(source)) return false;
  const key = `${CONTACT_KEY}:${source}`;
  try { if (sessionStorage.getItem(key)) return false; }
  catch { /* A deduplicação em memória continua disponível. */ }
  measured.add(source);
  try { sessionStorage.setItem(key, "1"); } catch { /* Armazenamento opcional. */ }
  window.gtag("event", "conversion", {
    send_to: ADS_CONVERSION,
    contact_source: source,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
  });
  return true;
}
