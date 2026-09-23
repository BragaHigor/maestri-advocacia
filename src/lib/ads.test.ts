import { beforeEach, describe, expect, it, vi } from "vitest";

function storage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
}

// Executa o snippet inline como o navegador faria, sobre os globais simulados,
// para que o código enviado no head do HTML seja exercitado pela suíte.
async function runBootstrap() {
  const ads = await import("./ads");
  new Function("window", "localStorage", "location", `${ads.CONSENT_BOOTSTRAP}`)(
    window, localStorage, window.location,
  );
  return ads;
}

beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal("localStorage", storage());
  vi.stubGlobal("sessionStorage", storage());
  vi.stubGlobal("window", { location: { origin: "https://www.maestriadv.com.br", pathname: "/", search: "?relato=private" } });
});

describe("snippet inicial do consent mode avançado", () => {
  it("tem sintaxe válida e configura a tag sem medir visualização de página", async () => {
    const ads = await runBootstrap();
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands.at(-1)).toEqual(["config", ads.ADS_ID, expect.objectContaining({
      send_page_view: false,
      allow_ad_personalization_signals: false,
      allow_enhanced_conversions: false,
      page_location: "https://www.maestriadv.com.br/",
      page_referrer: "",
    })]);
  });

  it("começa negado e com redução de dados quando não há escolha registrada", async () => {
    await runBootstrap();
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands[0]).toEqual(["consent", "default", {
      ad_storage: "denied", ad_user_data: "denied",
      ad_personalization: "denied", analytics_storage: "denied",
    }]);
    expect(commands[1]).toEqual(["set", "ads_data_redaction", true]);
  });

  it("começa concedido para quem já aceitou", async () => {
    const ads = await import("./ads");
    localStorage.setItem(ads.CONSENT_KEY, JSON.stringify({ version: 1, accepted: true, at: Date.now() }));
    await runBootstrap();
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands[0]).toEqual(["consent", "default", expect.objectContaining({
      ad_storage: "granted", ad_user_data: "granted",
      ad_personalization: "denied", analytics_storage: "denied",
    })]);
    expect(commands[1]).toEqual(["set", "ads_data_redaction", false]);
  });

  it("permanece negado com recusa salva e com registro expirado ou malformado", async () => {
    const ads = await import("./ads");
    for (const value of [
      JSON.stringify({ version: 1, accepted: false, at: Date.now() }),
      "broken",
      JSON.stringify({ version: 1, accepted: true, at: Date.now() - ads.CONSENT_LIFETIME }),
      JSON.stringify({ version: 1, accepted: true, at: Date.now() + 60_000 }),
    ]) {
      vi.stubGlobal("window", { location: { origin: "https://www.maestriadv.com.br", pathname: "/" } });
      localStorage.setItem(ads.CONSENT_KEY, value);
      await runBootstrap();
      const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
      expect(commands[0]).toEqual(["consent", "default", expect.objectContaining({ ad_storage: "denied" })]);
    }
  });
});

describe("atualização de consentimento e medição de contato", () => {
  it("concede apenas armazenamento de anúncios e dados do usuário ao aceitar", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands.at(-2)).toEqual(["set", "ads_data_redaction", false]);
    expect(commands.at(-1)).toEqual(["consent", "update", {
      ad_storage: "granted", ad_user_data: "granted",
      ad_personalization: "denied", analytics_storage: "denied",
    }]);
    expect(ads.readConsent()).toBe(true);
  });

  it("devolve a tag para negada e com redução de dados ao revogar", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    ads.applyConsent(false);
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands.at(-2)).toEqual(["set", "ads_data_redaction", true]);
    expect(commands.at(-1)).toEqual(["consent", "update", expect.objectContaining({ ad_storage: "denied" })]);
    expect(ads.readConsent()).toBe(false);
  });

  it("mede o botão flutuante e o formulário separadamente, um de cada por visita", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    expect(ads.measureContactAttempt("whatsapp_float")).toBe(true);
    expect(ads.measureContactAttempt("contact_form")).toBe(true);
    // Cada origem tem seu próprio teto, então nenhuma engole a outra.
    expect(ads.measureContactAttempt("whatsapp_float")).toBe(false);
    expect(ads.measureContactAttempt("contact_form")).toBe(false);
    const conversions = (window.dataLayer as Array<IArguments>)
      .map((c) => Array.from(c))
      .filter((c) => c[0] === "event");
    expect(conversions).toHaveLength(2);
    expect(conversions.map((c) => (c[2] as { contact_source: string }).contact_source))
      .toEqual(["whatsapp_float", "contact_form"]);
  });

  it("não conta o botão de reabrir do formulário como segunda conversão", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    // Primeiro envio válido.
    expect(ads.measureContactAttempt("contact_form")).toBe(true);
    // "Abrir novamente o WhatsApp" é um submit do mesmo formulário: mesma origem.
    expect(ads.measureContactAttempt("contact_form")).toBe(false);
    expect((window.dataLayer as Array<IArguments>)
      .map((c) => Array.from(c)).filter((c) => c[0] === "event")).toHaveLength(1);
  });

  it("não envia valores, campos do formulário ou query string no evento", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    ads.measureContactAttempt("contact_form");
    const commands = window.dataLayer as Array<IArguments>;
    expect(Array.from(commands.at(-1)!)).toEqual(["event", "conversion", {
      send_to: ads.ADS_CONVERSION,
      contact_source: "contact_form",
      page_location: "https://www.maestriadv.com.br/",
      page_referrer: "",
    }]);
  });

  it("mantém o teto entre páginas da mesma visita", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    expect(ads.measureContactAttempt("whatsapp_float")).toBe(true);
    vi.resetModules();
    const nextPage = await import("./ads");
    expect(nextPage.measureContactAttempt("whatsapp_float")).toBe(false);
  });

  it("ainda mede após recusa, sem cookies, como o modo avançado prevê", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(false);
    expect(ads.measureContactAttempt("contact_form")).toBe(true);
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands.at(-1)?.[0]).toBe("event");
    expect(commands.some((c) => c[0] === "set" && c[1] === "ads_data_redaction" && c[2] === true)).toBe(true);
  });

  it("não faz nada quando a tag não carregou", async () => {
    const ads = await import("./ads");
    expect(ads.measureContactAttempt("contact_form")).toBe(false);
    expect(() => ads.applyConsent(true)).not.toThrow();
  });
});
