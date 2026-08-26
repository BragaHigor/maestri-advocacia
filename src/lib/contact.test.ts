import { describe, expect, it } from "vitest";

import {
  createEmailUrl,
  createWhatsappUrl,
  isValidBrazilianWhatsapp,
  sanitizeMessage,
} from "./contact";

describe("contact links", () => {
  it("normaliza e limita texto controlado pelo visitante", () => {
    expect(sanitizeMessage("  Olá\u0000\r\nMundo  ")).toBe("Olá\nMundo");
    expect(sanitizeMessage("a".repeat(4_000))).toHaveLength(3_500);
  });

  it("codifica assunto e corpo do e-mail", () => {
    const url = createEmailUrl({ subject: "Caso & análise", body: "Linha 1\nLinha 2" });
    expect(url).toContain("subject=Caso+%26+an%C3%A1lise");
    expect(url).toContain("body=Linha+1%0ALinha+2");
  });

  it("recusa placeholder e reconhece o WhatsApp configurado", () => {
    expect(isValidBrazilianWhatsapp("5500000000000")).toBe(false);
    expect(isValidBrazilianWhatsapp("5516991554260")).toBe(true);
    expect(createWhatsappUrl("Teste")).toBe(
      "https://wa.me/5516991554260?text=Teste",
    );
  });
});
