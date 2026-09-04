import { siteConfig } from "@/config/site";

const DEFAULT_MESSAGE =
  "Olá! Acessei o site da Maestri Advocacia e gostaria de solicitar uma avaliação jurídica inicial do meu caso.";
const MAX_MESSAGE_LENGTH = 3_500;

export const CONTACT_NAME_MAX_LENGTH = 80;
export const CONTACT_REPORT_MIN_LENGTH = 20;
export const CONTACT_REPORT_MAX_LENGTH = 1_500;

export function isValidContactName(value: string): boolean {
  const name = value.trim();
  return (
    name.length >= 2 &&
    name.length <= CONTACT_NAME_MAX_LENGTH &&
    /[\p{L}]/u.test(name) &&
    !/[\p{N}]/u.test(name) &&
    /^[\p{L}\p{M} .'\u2019-]+$/u.test(name)
  );
}

export function isValidContactReport(value: string): boolean {
  const report = value.trim();
  return (
    report.length >= CONTACT_REPORT_MIN_LENGTH &&
    report.length <= CONTACT_REPORT_MAX_LENGTH &&
    /[\p{L}\p{N}]/u.test(report)
  );
}

export function getBrazilianPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 11);
}

export function formatBrazilianPhone(value: string): string {
  const digits = getBrazilianPhoneDigits(value);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = `(${digits.slice(0, 2)})`;
  const localNumber = digits.slice(2);
  if (localNumber.length <= 4) return `${areaCode} ${localNumber}`;

  const prefixLength = localNumber.length > 8 ? 5 : 4;
  return `${areaCode} ${localNumber.slice(0, prefixLength)}-${localNumber.slice(prefixLength)}`;
}

export function isValidBrazilianPhone(value: string): boolean {
  if (/[^\d\s()+-]/.test(value)) return false;
  const rawDigits = value.replace(/\D/g, "");
  const hasCountryCode = rawDigits.length > 11 && rawDigits.startsWith("55");
  if (rawDigits.length > 11 && !hasCountryCode) return false;
  if (hasCountryCode && ![12, 13].includes(rawDigits.length)) {
    return false;
  }
  const digits = hasCountryCode ? rawDigits.slice(2) : rawDigits;
  return /^[1-9]\d(?:9\d{8}|[2-8]\d{7})$/.test(digits);
}

export function isWhatsappConfigured(): boolean {
  return isValidBrazilianWhatsapp(siteConfig.whatsapp);
}

export function isValidBrazilianWhatsapp(value: string): boolean {
  return /^55\d{10,11}$/.test(value) && !/^550+$/.test(value);
}

export function sanitizeMessage(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .slice(0, MAX_MESSAGE_LENGTH)
    .trim();
}

export function createWhatsappUrl(message = DEFAULT_MESSAGE): string | null {
  if (!isWhatsappConfigured()) return null;
  const safeMessage = sanitizeMessage(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(safeMessage)}`;
}

export function createEmailUrl(options?: {
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", sanitizeMessage(options.subject));
  if (options?.body) params.set("body", sanitizeMessage(options.body));
  const query = params.toString();
  return `mailto:${siteConfig.email}${query ? `?${query}` : ""}`;
}
