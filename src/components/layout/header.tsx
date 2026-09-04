"use client";

import { useEffect, useRef, useState } from "react";

import { mainNavigationItems } from "@/data/content";
import { buttonGold } from "@/styles/classes";

import { Brand } from "../ui/brand";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
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
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const focusFrame = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => cancelAnimationFrame(focusFrame);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  return (
    <header
      className="group/header sticky top-0 z-80 border-b border-paper/15 bg-ink/85 backdrop-blur-[14px]"
      data-site-header
    >
      <nav
        className="mx-auto flex h-[86px] max-w-[1240px] items-center gap-[34px] px-[clamp(20px,4vw,48px)] transition-[height] duration-450 ease-fluid group-data-[scrolled]/header:h-[70px]"
        aria-label="Principal"
      >
        <a
          className="mr-auto min-w-0 text-gold-bright"
          href="#top"
          aria-label="Maestri Advocacia — início"
          onClick={() => setIsOpen(false)}
        >
          <Brand />
        </a>

        <ul className="hidden items-center gap-[26px] min-[1220px]:flex">
          {mainNavigationItems.map((item) => (
            <li key={item.href}>
              <a
                className="text-sm font-medium tracking-[0.01em] text-paper hover:text-gold-bright"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className={`${buttonGold} min-h-11 px-5 py-3 text-sm`}
              href="#contato"
            >
              Falar com um advogado
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
        className={`${isOpen ? "flex" : "hidden"} max-h-[calc(100dvh-86px)] flex-col overflow-y-auto border-t border-paper/15 px-[clamp(20px,4vw,48px)] pt-3 pb-[26px] min-[1220px]:hidden`}
      >
        {mainNavigationItems.map((item, index) => (
          <a
            ref={index === 0 ? firstLinkRef : undefined}
            className="border-b border-paper/15 py-[15px] text-[17px] font-medium text-paper hover:text-gold-bright"
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
          Falar com um advogado
        </a>
      </div>
    </header>
  );
}
