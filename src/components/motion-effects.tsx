"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    root.dataset.motionReady = "true";

    const animateCounter = (element: HTMLElement) => {
      if (element.dataset.counted === "true") return;
      element.dataset.counted = "true";
      const target = Number.parseFloat(element.dataset.count ?? "");
      if (!Number.isFinite(target)) return;
      if (prefersReducedMotion) {
        element.textContent = String(target);
        return;
      }

      const startedAt = performance.now();
      const update = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / 1_200);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(update);
        else element.textContent = String(target);
      };
      requestAnimationFrame(update);
    };

    const reveal = (element: HTMLElement) => {
      if (element.dataset.shown === "true") return;
      element.dataset.shown = "true";
      element
        .querySelectorAll<HTMLElement>("[data-count]")
        .forEach(animateCounter);
    };

    // Elements already sitting in (or just above) the viewport on mount are
    // revealed straight away instead of waiting on an IntersectionObserver
    // callback — on some real mobile browsers that first callback can be
    // delayed or dropped, which otherwise leaves already-visible text (like
    // the hero heading) stuck hidden indefinitely.
    const alreadyVisible: HTMLElement[] = [];
    const pending: HTMLElement[] = [];
    animatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        alreadyVisible.push(element);
      } else {
        pending.push(element);
      }
    });
    alreadyVisible.forEach(reveal);

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && pending.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (first, second) =>
                first.boundingClientRect.top - second.boundingClientRect.top,
            )
            .forEach((entry, index) => {
              observer?.unobserve(entry.target);
              window.setTimeout(
                () => reveal(entry.target as HTMLElement),
                index * (prefersReducedMotion ? 40 : 85),
              );
            });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
      );
      pending.forEach((element) => observer?.observe(element));
    } else {
      pending.forEach(reveal);
    }

    // Safety net: if the observer never fires for some element (device- or
    // browser-specific quirk), make sure nothing stays invisible forever.
    const fallbackTimer = window.setTimeout(() => {
      animatedElements.forEach(reveal);
    }, 2_500);

    const parallaxLayers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    let animationFrameId = 0;
    const updateScrollEffects = () => {
      animationFrameId = 0;
      const scrollTop = window.scrollY;
      const maximumScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty(
        "--scroll-progress",
        Math.min(1, scrollTop / maximumScroll).toFixed(4),
      );
      document
        .querySelector("[data-site-header]")
        ?.toggleAttribute("data-scrolled", scrollTop > 40);
      if (prefersReducedMotion) return;

      parallaxLayers.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom < -240 || bounds.top > window.innerHeight + 240) return;
        const speed = Number.parseFloat(element.dataset.parallax ?? "") || 0;
        const offset =
          (bounds.top + bounds.height / 2 - window.innerHeight / 2) * speed;
        element.style.transform =
          `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.14)`;
      });
    };
    const requestUpdate = () => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(updateScrollEffects);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      delete root.dataset.motionReady;
    };
  }, []);

  return null;
}
