import { siteConfig } from "@/config/site";

const DEFAULT_MESSAGE =
  "Olá! Acessei o site da Maestri Advocacia e gostaria de solicitar uma avaliação jurídica inicial do meu caso.";
const MAX_MESSAGE_LENGTH = 3_500;

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
