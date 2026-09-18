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

  it.each([
    ["pix", "2026-06-07"],
    ["compraonline", "2026-08-19"],
    ["vicio30", "2026-07-27"],
    ["vicio90", "2026-05-28"],
    ["reparacao", "2021-08-26"],
  ] as const)("distingue o dia-limite e o dia seguinte para %s", (id, date) => {
    const limit = calculateDeadline(deadlineRules[id], date, NOW);
    expect(limit.number).toBe(0);
    expect(limit.unit).toBe("dias restantes");
    expect(limit.progress).toBe(100);
    expect(limit.tone).toBe("warning");
    expect(limit.title).toBe("A data-limite é hoje.");

    const overdue = calculateDeadline(
      deadlineRules[id],
      date,
      new Date(2026, 7, 27, 12),
    );
    expect(overdue.number).toBe(1);
    expect(overdue.unit).toBe("dia de atraso");
    expect(overdue.tone).toBe("alert");
    expect(overdue.title).toBe("Este prazo específico venceu.");
    expect(overdue.text).toContain("Isso não encerra o caso");
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
