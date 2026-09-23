import { beforeEach, describe, expect, it, vi } from "vitest";

function storage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
}

// Runs the inline bootstrap the way the browser does, against the stubbed
// globals, so the snippet shipped in the HTML head is exercised by the suite.
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

describe("advanced consent mode bootstrap", () => {
  it("is syntactically valid and configures the tag without a page view", async () => {
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

  it("starts denied and redacted when no choice was recorded", async () => {
    await runBootstrap();
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands[0]).toEqual(["consent", "default", {
      ad_storage: "denied", ad_user_data: "denied",
      ad_personalization: "denied", analytics_storage: "denied",
    }]);
    expect(commands[1]).toEqual(["set", "ads_data_redaction", true]);
  });

  it("starts granted for a visitor who already accepted", async () => {
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

  it("stays denied for a stored refusal, and for expired or malformed records", async () => {
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

describe("consent updates and contact measurement", () => {
  it("grants only advertising storage and user data when accepting", async () => {
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

  it("returns the tag to denied and redacted when revoking", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    ads.applyConsent(false);
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands.at(-2)).toEqual(["set", "ads_data_redaction", true]);
    expect(commands.at(-1)).toEqual(["consent", "update", expect.objectContaining({ ad_storage: "denied" })]);
    expect(ads.readConsent()).toBe(false);
  });

  it("measures once per visit without values, form fields or query strings", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(true);
    expect(ads.measureContactAttempt()).toBe(true);
    expect(ads.measureContactAttempt()).toBe(false);
    const commands = window.dataLayer as Array<IArguments>;
    expect(Array.from(commands.at(-1)!)).toEqual(["event", "conversion", {
      send_to: ads.ADS_CONVERSION, page_location: "https://www.maestriadv.com.br/", page_referrer: "",
    }]);
    vi.resetModules();
    const nextPage = await import("./ads");
    expect(nextPage.measureContactAttempt()).toBe(false);
  });

  it("still measures after a refusal, cookieless, as advanced mode requires", async () => {
    const ads = await runBootstrap();
    ads.applyConsent(false);
    expect(ads.measureContactAttempt()).toBe(true);
    const commands = (window.dataLayer as Array<IArguments>).map((c) => Array.from(c));
    expect(commands.at(-1)?.[0]).toBe("event");
    expect(commands.some((c) => c[0] === "set" && c[1] === "ads_data_redaction" && c[2] === true)).toBe(true);
  });

  it("does nothing when the tag failed to load", async () => {
    const ads = await import("./ads");
    expect(ads.measureContactAttempt()).toBe(false);
    expect(() => ads.applyConsent(true)).not.toThrow();
  });
});
