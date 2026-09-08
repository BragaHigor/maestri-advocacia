"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { headerNavigationItems } from "@/data/content";
import { buttonGold } from "@/styles/classes";

import { Brand } from "../ui/brand";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setIsScrolled(value > 40);
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1_220) setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((current) => {
      const next = !current;
      if (next) requestAnimationFrame(() => firstLinkRef.current?.focus());
      return next;
    });
  };

  return (
    <header
      className="group/header sticky top-0 z-80 border-b border-paper/15 bg-ink/85 backdrop-blur-[14px]"
      data-site-header
      data-scrolled={isScrolled ? "" : undefined}
    >
      <nav
        className="mx-auto flex h-[86px] max-w-[1240px] items-center gap-[34px] px-[clamp(20px,4vw,48px)] transition-[height] duration-450 ease-fluid group-data-[scrolled]/header:h-[70px]"
        aria-label="Principal"
      >
        <a
          className="mr-auto min-w-0 text-gold-deep"
          href="#top"
          aria-label="Maestri Advocacia — início"
        >
          <Brand />
        </a>

        <ul className="hidden items-center gap-3 min-[1220px]:flex">
          {headerNavigationItems.map((item) => (
            <li key={item.href}>
              <a
                className="text-[13px] font-medium tracking-[0.005em] whitespace-nowrap text-paper hover:text-gold-deep"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className={`${buttonGold} min-h-11 !px-4 !py-3 text-[13px] whitespace-nowrap`}
              href="#contato"
            >
              Fale com um advogado
            </a>
          </li>
        </ul>

        <button
          ref={toggleRef}
          className="inline-flex size-[46px] flex-col items-center justify-center gap-[5px] rounded-sm border border-paper/15 bg-transparent min-[1220px]:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="nav-mobile"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMenu}
        >
          <span
            className={`block h-[1.5px] w-[18px] bg-paper transition-transform duration-300 ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-[18px] bg-paper transition-opacity ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-[18px] bg-paper transition-transform duration-300 ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        id="nav-mobile"
        className={`${isOpen ? "flex" : "hidden"} flex-col border-t border-paper/15 px-[clamp(20px,4vw,48px)] pt-3 pb-[26px] min-[1220px]:hidden`}
      >
        {headerNavigationItems.map((item, index) => (
          <a
            ref={index === 0 ? firstLinkRef : undefined}
            className="border-b border-paper/15 py-[15px] text-[17px] font-medium text-paper hover:text-gold-deep"
            href={item.href}
            key={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          className={`${buttonGold} mt-3.5 flex w-full`}
          href="#contato"
          onClick={() => setIsOpen(false)}
        >
          Fale com um advogado
        </a>
      </div>
    </header>
  );
}
