"use client";

import { useEffect, useState } from "react";
import { applyConsent, CONSENT_KEY, readConsent } from "@/lib/ads";

export function CookiePreferences() {
  return (
    <button
      type="button"
      className="min-h-11 text-left text-[15px] text-paper hover:text-gold-bright"
      onClick={() =>
        window.dispatchEvent(new Event("maestri-privacy-preferences"))
      }
    >
      Preferências de privacidade
    </button>
  );
}

export function MeasurementConsent() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);
  useEffect(() => {
    const choice = readConsent();
    // A tag já está carregada e já reflete esta escolha: o snippet inline leu o
    // mesmo registro antes do gtag.js rodar. Não há nada a aplicar aqui.
    // Adia a exibição até a primeira renderização no cliente terminar.
    const timer = window.setTimeout(() => {
      setAccepted(choice);
      setVisible(choice === null);
    }, 0);
    const open = () => setVisible(true);
    const synchronize = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      const updated = readConsent();
      applyConsent(updated === true, false);
      setAccepted(updated);
      setVisible(updated === null);
    };
    window.addEventListener("maestri-privacy-preferences", open);
    window.addEventListener("storage", synchronize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("maestri-privacy-preferences", open);
      window.removeEventListener("storage", synchronize);
    };
  }, []);
  function choose(choice: boolean) {
    applyConsent(choice);
    setAccepted(choice);
    setVisible(false);
  }
  if (!visible) return null;
  return (
    <section
      aria-label="Preferências de privacidade"
      className="fixed inset-x-0 bottom-0 z-[200] px-4 pb-[calc(20px+env(safe-area-inset-bottom))] min-[880px]:pb-8"
    >
      <div className="mx-auto flex max-h-[70dvh] w-full max-w-6xl flex-col gap-3 overflow-y-auto rounded-xl border border-gold/40 bg-ink-2 px-5 py-4 text-paper shadow-2xl min-[880px]:flex-row min-[880px]:items-center min-[880px]:gap-6 min-[880px]:px-6">
        <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-paper/80">
          Usamos cookies de medição, com sua permissão, para entender como você
          chegou até nós e melhorar sua experiência.{" "}
          <a
            href="/privacidade"
            className="text-gold-bright underline underline-offset-4"
          >
            Política de privacidade
          </a>
          .
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <button
            type="button"
            className="min-h-11 rounded border border-paper/40 px-4 py-2 text-[13px] hover:bg-paper/10"
            onClick={() => choose(false)}
          >
            Recusar
          </button>
          <button
            type="button"
            className="min-h-11 rounded border border-paper/40 px-4 py-2 text-[13px] hover:bg-paper/10"
            onClick={() => choose(true)}
          >
            Permitir
          </button>
        </div>
        {accepted !== null && (
          <button
            type="button"
            className="min-h-11 shrink-0 text-[13px] underline"
            onClick={() => setVisible(false)}
          >
            Fechar
          </button>
        )}
      </div>
    </section>
  );
}
