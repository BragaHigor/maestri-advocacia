import { describe, expect, it } from "vitest";

import { brazilianStates, getContactLocation, loadMunicipalities } from "./location";

describe("localidade do contato", () => {
  it("inclui os 26 estados e o Distrito Federal", () => {
    expect(brazilianStates).toHaveLength(27);
    expect(brazilianStates.find((state) => state.code === "DF")?.name).toBe("Distrito Federal");
  });

  it("filtra municípios por UF e mantém nomes com acentos", async () => {
    const cities = await loadMunicipalities("SP");
    expect(cities.length).toBeGreaterThan(600);
    expect(cities.every((city) => city.stateCode === "SP")).toBe(true);
    expect(getContactLocation("SP", "3543402", cities)).toEqual({
      cityName: "Ribeirão Preto",
      stateName: "São Paulo",
      stateCode: "SP",
    });
  });

  it("rejeita estado vazio ou inválido sem retornar todas as cidades", async () => {
    expect(await loadMunicipalities("")).toEqual([]);
    expect(await loadMunicipalities("ZZ")).toEqual([]);
  });

  it("rejeita cidade vazia, inexistente ou de outro estado", async () => {
    const cities = await loadMunicipalities("SP");
    expect(getContactLocation("SP", "", cities)).toBeNull();
    expect(getContactLocation("SP", "9999999", cities)).toBeNull();
    expect(getContactLocation("RJ", "3543402", cities)).toBeNull();
    expect(getContactLocation("ZZ", "3543402", cities)).toBeNull();
  });

  it("oferece Brasília para o Distrito Federal", async () => {
    const cities = await loadMunicipalities("DF");
    expect(getContactLocation("DF", "5300108", cities)?.cityName).toBe("Brasília");
  });
});
