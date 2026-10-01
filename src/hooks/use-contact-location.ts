"use client";

import { useEffect, useRef, useState } from "react";

import { isBrazilianStateCode, loadMunicipalities, type Municipality } from "@/lib/location";

type LoadStatus = "idle" | "loading" | "ready" | "error";

export function useContactLocation() {
  const [stateCode, setStateCode] = useState("");
  const [municipalityCode, setMunicipalityCode] = useState("");
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");
  const request = useRef(0);

  useEffect(() => () => { request.current += 1; }, []);

  function resetLocation() {
    request.current += 1;
    setStateCode("");
    setMunicipalityCode("");
    setMunicipalities([]);
    setLoadStatus("idle");
  }

  async function selectState(value: string) {
    if (!isBrazilianStateCode(value)) {
      resetLocation();
      return;
    }
    const currentRequest = ++request.current;
    setStateCode(value);
    setMunicipalityCode("");
    setMunicipalities([]);
    setLoadStatus("loading");
    try {
      const cities = await loadMunicipalities(value);
      // Troca de UF, limpeza ou desmontagem invalidam respostas anteriores.
      if (currentRequest !== request.current) return;
      if (cities.length === 0) throw new Error("Catálogo indisponível.");
      setMunicipalities(cities);
      setLoadStatus("ready");
    } catch {
      if (currentRequest === request.current) setLoadStatus("error");
    }
  }

  function selectCity(value: string) {
    setMunicipalityCode(
      municipalities.some((city) => city.code === value && city.stateCode === stateCode)
        ? value
        : "",
    );
  }

  return {
    stateCode,
    municipalityCode,
    municipalities,
    loadStatus,
    selectState,
    selectCity,
    resetLocation,
  };
}
