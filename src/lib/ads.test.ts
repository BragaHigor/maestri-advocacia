import { beforeEach, describe, expect, it, vi } from "vitest";

function storage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
}

beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal("localStorage", storage());
  vi.stubGlobal("sessionStorage", storage());
  vi.stubGlobal("window", { location: { origin: "https://www.maestriadv.com.br", pathname: "/", search: "?relato=private" } });
  vi.stubGlobal("document", { createElement: vi.fn(() => ({})), head: { appendChild: vi.fn() } });
});

describe("Google Ads consent and contact measurement", () => {
  it("does not load a Google script or measure before consent or after refusal", async () => {
    const ads = await import("./ads");
    expect(ads.measureContactAttempt()).toBe(false);
    ads.applyConsent(false);
    expect(document.head.appendChild).not.toHaveBeenCalled();
    expect(ads.measureContactAttempt()).toBe(false);
  });
  it("loads only once with denied defaults before granting measurement", async () => {
    const ads = await import("./ads");
    ads.applyConsent(true);
    ads.applyConsent(true);
    expect(document.head.appendChild).toHaveBeenCalledTimes(1);
    const commands = window.dataLayer as Array<IArguments>;
    expect(Array.from(commands[0])).toEqual(["consent", "default", expect.objectContaining({ ad_storage: "denied", ad_personalization: "denied" })]);
    expect(Array.from(commands[1])).toEqual(["consent", "update", expect.objectContaining({ ad_storage: "granted", ad_personalization: "denied" })]);
  });
  it("measures once per visit without monetary values, form fields or query strings", async () => {
    const ads = await import("./ads");
    ads.applyConsent(true);
    expect(ads.measureContactAttempt()).toBe(true);
    expect(ads.measureContactAttempt()).toBe(false);
    const commands = window.dataLayer as Array<IArguments>;
    expect(Array.from(commands.at(-1)!)).toEqual(["event", "conversion", {
      send_to: ads.ADS_CONVERSION, page_location: "https://www.maestriadv.com.br/", page_referrer: "",
    }]);
    vi.resetModules();
    const nextPage = await import("./ads");
    nextPage.applyConsent(true);
    expect(nextPage.measureContactAttempt()).toBe(false);
  });
  it("blocks contact events after revoking consent", async () => {
    const ads = await import("./ads");
    ads.applyConsent(true);
    ads.applyConsent(false);
    expect(ads.measureContactAttempt()).toBe(false);
    expect(ads.readConsent()).toBe(false);
  });
  it("requires a new choice for malformed, expired or future records", async () => {
    const ads = await import("./ads");
    for (const value of ["broken", JSON.stringify({ version: 1, accepted: true, at: Date.now() - ads.CONSENT_LIFETIME }), JSON.stringify({ version: 1, accepted: true, at: Date.now() + 60000 })]) {
      localStorage.setItem(ads.CONSENT_KEY, value);
      expect(ads.readConsent()).toBe(null);
    }
  });
});
