import { describe, expect, it } from "vitest";

import { siteConfig } from "./site";

describe("identificadores de medição", () => {
  // Um ID digitado errado não quebra o build nem gera erro no navegador: a
  // medição simplesmente vai para lugar nenhum. Esta guarda torna isso visível.
  it("usa um ID de Google Analytics no formato esperado", () => {
    expect(siteConfig.ga4Id).toMatch(/^G-[A-Z0-9]{10}$/);
  });

  it("aponta para a propriedade configurada para este site", () => {
    expect(siteConfig.ga4Id).toBe("G-Z1YCKTT9WK");
  });
});
