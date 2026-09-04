import { describe, expect, it } from "vitest";

import {
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_REPORT_MAX_LENGTH,
  createEmailUrl,
  createWhatsappUrl,
  formatBrazilianPhone,
  getBrazilianPhoneDigits,
  isValidContactName,
  isValidContactReport,
  isValidBrazilianPhone,
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

  it("remove caracteres inválidos e formata telefones brasileiros", () => {
    expect(getBrazilianPhoneDigits("abc16x99155-4260")).toBe("16991554260");
    expect(getBrazilianPhoneDigits("+55 (16) 99155-4260")).toBe("16991554260");
    expect(formatBrazilianPhone("16991554260")).toBe("(16) 99155-4260");
    expect(formatBrazilianPhone("1637221234")).toBe("(16) 3722-1234");
  });

  it("valida WhatsApp informado no formulário com DDD", () => {
    expect(isValidBrazilianPhone("(16) 99155-4260")).toBe(true);
    expect(isValidBrazilianPhone("(55) 99999-9999")).toBe(true);
    expect(isValidBrazilianPhone("(16) 3722-1234")).toBe(true);
    expect(isValidBrazilianPhone("16 1234-5678")).toBe(false);
    expect(isValidBrazilianPhone("1699155")).toBe(false);
    expect(isValidBrazilianPhone("169915542601")).toBe(false);
    expect(isValidBrazilianPhone("abc16991554260")).toBe(false);
  });

  it("valida nomes de pessoas e rejeita números ou caracteres impróprios", () => {
    expect(isValidContactName("Ana Clara D'Ávila")).toBe(true);
    expect(isValidContactName("João-Pedro")).toBe(true);
    expect(isValidContactName("A")).toBe(false);
    expect(isValidContactName("Maria123")).toBe(false);
    expect(isValidContactName("A".repeat(CONTACT_NAME_MAX_LENGTH + 1))).toBe(false);
  });

  it("valida o tamanho e o conteúdo do relato", () => {
    expect(isValidContactReport("Fiz um Pix e depois percebi que era um golpe.")).toBe(true);
    expect(isValidContactReport("Muito curto.")).toBe(false);
    expect(isValidContactReport("!".repeat(30))).toBe(false);
    expect(isValidContactReport("A".repeat(CONTACT_REPORT_MAX_LENGTH + 1))).toBe(false);
  });
});
