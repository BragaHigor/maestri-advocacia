import { getStates } from "@brazilian-utils/brazilian-utils/get-states";
import type { Municipality, StateCode } from "@brazilian-utils/brazilian-utils/get-municipalities";

export type { Municipality };

export const brazilianStates = getStates();

export interface ContactLocation {
  cityName: string;
  stateName: string;
  stateCode: StateCode;
}

export function isBrazilianStateCode(value: string): value is StateCode {
  return brazilianStates.some((state) => state.code === value);
}

// O catálogo maior fica em um chunk separado, carregado ao escolher a UF.
// A consulta usa dados locais da biblioteca, sem enviar a escolha a uma API.
export async function loadMunicipalities(stateCode: string): Promise<Municipality[]> {
  if (!isBrazilianStateCode(stateCode)) return [];
  const { getMunicipalities } = await import(
    "@brazilian-utils/brazilian-utils/get-municipalities"
  );
  return getMunicipalities(stateCode);
}

export function getContactLocation(
  stateCode: string,
  municipalityCode: string,
  municipalities: readonly Municipality[],
): ContactLocation | null {
  const state = brazilianStates.find((item) => item.code === stateCode);
  const city = municipalities.find(
    (item) => item.code === municipalityCode && item.stateCode === stateCode,
  );
  if (!state || !city) return null;
  return { cityName: city.name, stateName: state.name, stateCode: state.code };
}
