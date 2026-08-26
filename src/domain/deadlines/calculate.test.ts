import { describe, expect, it } from "vitest";

import { deadlineRules } from "./data";
import { calculateDeadline } from "./calculate";

const NOW = new Date(2026, 7, 26, 12);

describe("calculateDeadline", () => {
  it("exibe o estado inicial da regra selecionada", () => {
    const result = calculateDeadline(deadlineRules.pix, "", NOW);
    expect(result.number).toBe(80);
    expect(result.progress).toBe(0);
    expect(result.title).toContain("Informe a data");
  });

  it("rejeita data futura em regras contadas a partir do fato", () => {
    const result = calculateDeadline(deadlineRules.pix, "2026-08-27", NOW);
    expect(result.title).toBe("Essa data está no futuro.");
  });

  it("calcula um prazo vigente", () => {
    const result = calculateDeadline(deadlineRules.compraonline, "2026-08-24", NOW);
    expect(result.number).toBe(5);
    expect(result.unit).toBe("dias restantes");
    expect(result.tone).toBe("normal");
  });

  it("marca um prazo curto como urgente", () => {
    const result = calculateDeadline(deadlineRules.compraonline, "2026-08-25", NOW);
    expect(result.number).toBe(6);
    expect(result.tone).toBe("normal");

    const urgent = calculateDeadline(deadlineRules.compraonline, "2026-08-21", NOW);
    expect(urgent.number).toBe(2);
    expect(urgent.tone).toBe("warning");
  });

  it("marca prazo vencido sem afirmar que o caso terminou", () => {
    const result = calculateDeadline(deadlineRules.compraonline, "2026-08-01", NOW);
    expect(result.tone).toBe("alert");
    expect(result.text).toContain("Isso não encerra o caso");
  });

  it("calcula a antecedência da fatura", () => {
    const inTime = calculateDeadline(deadlineRules.cartao, "2026-09-10", NOW);
    expect(inTime.number).toBe(5);
    expect(inTime.unit).toBe("dias para avisar");

    const limit = calculateDeadline(deadlineRules.cartao, "2026-09-05", NOW);
    expect(limit.number).toBe(0);
    expect(limit.tone).toBe("warning");
  });
});
