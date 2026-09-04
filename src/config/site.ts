const DEFAULT_SITE_URL = "https://www.maestriadvocacia.com.br";
const DEFAULT_EMAIL = "contato@maestriadvocacia.com.br";

function parseSiteUrl(value: string | undefined): URL {
  try {
    const url = new URL(value ?? DEFAULT_SITE_URL);
    const isLocalHttp =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    if (url.protocol !== "https:" && !isLocalHttp) {
      return new URL(DEFAULT_SITE_URL);
    }
    return url;
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

function parseEmail(value: string | undefined): string {
  const email = value?.trim() ?? "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : DEFAULT_EMAIL;
}

export const siteConfig = Object.freeze({
  name: "Maestri Advocacia",
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "5516991554260").replace(
    /\D/g,
    "",
  ),
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "(16) 99155-4260",
  email: parseEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  oab: process.env.NEXT_PUBLIC_OAB?.trim() || "OAB/SP 123.456",
  location:
    process.env.NEXT_PUBLIC_OFFICE_LOCATION?.trim() ||
    "Franca/SP — atendimento 100% online",
  serviceArea:
    process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || "Todo o Brasil",
});
