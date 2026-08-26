"use client";

import { type RefObject, useEffect } from "react";

const MINIMUM_FONT_SIZE = 10.5;
const ARROW_RESERVED_WIDTH = 20;

export function useFitSelectText(ref: RefObject<HTMLSelectElement | null>) {
  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    const update = () => {
      input.style.removeProperty("font-size");
      const selectedText = input.options[input.selectedIndex]?.text
        .replace(/\s+/g, " ")
        .trim();
      if (!selectedText) return;

      const styles = getComputedStyle(input);
      const originalFontSize = Number.parseFloat(styles.fontSize) || 0;
      const availableWidth =
        input.clientWidth -
        (Number.parseFloat(styles.paddingLeft) || 0) -
        (Number.parseFloat(styles.paddingRight) || 0) -
        ARROW_RESERVED_WIDTH;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context || availableWidth <= 0) return;
      context.font = `${styles.fontStyle} ${styles.fontWeight} ${originalFontSize}px ${styles.fontFamily}`;
      const letterSpacing = Number.parseFloat(styles.letterSpacing) || 0;
      const textWidth =
        context.measureText(selectedText).width + letterSpacing * selectedText.length;
      if (textWidth <= availableWidth) return;
      const fitted = Math.max(
        MINIMUM_FONT_SIZE,
        originalFontSize * (availableWidth / textWidth),
      );
      input.style.fontSize = `${fitted.toFixed(2)}px`;
    };

    input.addEventListener("change", update);
    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(update) : undefined;
    resizeObserver?.observe(input);
    if (!resizeObserver) window.addEventListener("resize", update);
    void document.fonts?.ready.then(update);
    update();

    return () => {
      input.removeEventListener("change", update);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", update);
    };
  }, [ref]);
}
