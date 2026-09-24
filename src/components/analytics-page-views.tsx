"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { measurePageView } from "@/lib/ads";

// A carga inicial já é contada pelo `config` do Analytics. Este componente
// cobre apenas as navegações do App Router, que trocam de rota sem recarregar
// a página e, sem isso, não seriam registradas.
export function AnalyticsPageViews() {
  const caminho = usePathname();
  const caminhoInicial = useRef(caminho);

  useEffect(() => {
    if (caminho === caminhoInicial.current) return;
    caminhoInicial.current = caminho;
    measurePageView();
  }, [caminho]);

  return null;
}
