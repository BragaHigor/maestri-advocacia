"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { MotionProps, Variants } from "framer-motion";

import { VIEWPORT } from "@/lib/motion";

// Abaixo de 880px o layout deixa de ser em colunas: é a faixa que o projeto
// trata como mobile. Nela as entradas de seção são removidas.
const MOBILE_QUERY = "(max-width: 879.98px)";

export type ModoDeEntrada = "mobile" | "amplo";

function naoNotificar() {
  return () => {};
}

// O Framer Motion resolve o comportamento de animação na montagem: trocar as
// props depois não surte efeito, e o elemento fica preso no estado inicial.
// Por isso o modo vira parte da `key` das seções, forçando uma remontagem.
//
// A decisão é travada na primeira medição e nunca muda depois. Isso evita
// remontar seções a cada redimensionamento que cruze 880px — o que apagaria,
// por exemplo, o que já foi digitado no formulário de contato.
export function useSectionEntrance(): {
  modo: ModoDeEntrada;
  entrada: (variants: Variants) => MotionProps;
} {
  const modo = useSyncExternalStore<ModoDeEntrada>(
    // Subscribe inerte: nada notifica, então o valor é lido uma única vez, logo
    // após a hidratação, e permanece travado pelo resto da sessão.
    naoNotificar,
    () => (window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "amplo"),
    // No servidor não há viewport. Assumir "amplo" mantém a primeira
    // renderização do cliente idêntica ao HTML pré-renderizado e faz com que
    // apenas a faixa mobile precise remontar: acima de 880px nada muda.
    () => "amplo",
  );

  const entrada = useCallback(
    (variants: Variants): MotionProps =>
      // Sem variantes na faixa mobile: o elemento e seus filhos renderizam no
      // estado natural, sem opacidade inicial e sem deslocamento.
      modo === "mobile"
        ? {}
        : { variants, initial: "hidden", whileInView: "show", viewport: VIEWPORT },
    [modo],
  );

  return { modo, entrada };
}
