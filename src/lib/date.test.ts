import { describe, expect, it } from "vitest";

import {
  addCalendarDays,
  addCalendarYears,
  differenceInCalendarDays,
  formatDateInputPtBr,
  parseDateInput,
  toLocalIsoDate,
} from "./date";

describe("date utilities", () => {
  it("faz parsing estrito de datas locais", () => {
    expect(parseDateInput("2024-02-29")).toEqual(new Date(2024, 1, 29));
    expect(parseDateInput("2023-02-29")).toBeNull();
    expect(parseDateInput("texto")).toBeNull();
  });

  it("formata datas sem conversão para UTC", () => {
    expect(toLocalIsoDate(new Date(2026, 7, 26))).toBe("2026-08-26");
    expect(formatDateInputPtBr("2026-07-26")).toBe("26/07/2026");
    expect(formatDateInputPtBr("data-inválida")).toBe("");
  });

  it("soma unidades de calendário", () => {
    expect(addCalendarDays(new Date(2026, 0, 10), 7)).toEqual(
      new Date(2026, 0, 17),
    );
    expect(addCalendarYears(new Date(2020, 0, 10), 5)).toEqual(
      new Date(2025, 0, 10),
    );
  });

  it("calcula diferença em dias sem ser afetado pelo horário", () => {
    expect(
      differenceInCalendarDays(
        new Date(2026, 3, 2, 1),
        new Date(2026, 3, 1, 23),
      ),
    ).toBe(1);
  });
});
