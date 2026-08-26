"use client";

import { type RefObject, useEffect } from "react";

const MINIMUM_FONT_SIZE = 6;
const STEP = 0.5;

export function useFitText(ref: RefObject<HTMLElement | null>, text: string) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      element.style.removeProperty("font-size");
      const value = text.replace(/\s+/g, " ").trim();
      if (!value) return;

      const originalFontSize =
        Number.parseFloat(getComputedStyle(element).fontSize) || 16;
      let fontSize = originalFontSize;

      // Measure the real rendered overflow (not an estimate) and step the
      // font size down until the DOM itself reports a fit, or the floor.
      while (
        element.scrollWidth > element.clientWidth &&
        fontSize > MINIMUM_FONT_SIZE
      ) {
        fontSize = Math.max(MINIMUM_FONT_SIZE, fontSize - STEP);
        element.style.fontSize = `${fontSize}px`;
      }
    };

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(update) : undefined;
    resizeObserver?.observe(element);
    if (!resizeObserver) window.addEventListener("resize", update);
    void document.fonts?.ready.then(update);
    update();

    return () => {
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", update);
    };
  }, [ref, text]);
}
