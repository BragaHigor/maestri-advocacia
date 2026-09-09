export type ContactDestination = "whatsapp" | "email";

const DEFAULT_SITE_URL = "https://www.maestriadv.com.br";
const DEFAULT_EMAIL = "contato.maestriadv@gmail.com";

function parseSiteUrl(value: string | undefined): URL {
  try {
    const url = new URL(value ?? DEFAULT_SITE_URL);
    if (url.protocol !== "https:" && url.hostname !== "localhost") {
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

function parseDestination(value: string | undefined): ContactDestination {
  return value === "email" ? "email" : "whatsapp";
}

export const siteConfig = Object.freeze({
  name: "Maestri Advocacia",
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "5516974075767").replace(
    /\D/g,
    "",
  ),
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "(16) 97407-5767",
  email: parseEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  oab: process.env.NEXT_PUBLIC_OAB?.trim() || "OAB/SP 511954-SP",
  location:
    process.env.NEXT_PUBLIC_OFFICE_LOCATION?.trim() ||
    "Atendimento 100% online",
  serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || "Todo o Brasil",
  contactDestination: parseDestination(
    process.env.NEXT_PUBLIC_CONTACT_DESTINATION,
  ),
});
