import { buttonGold } from "@/styles/classes";

export function StickyContact() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-85 block border-t border-gold/35 bg-ink/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-[14px] min-[1220px]:hidden print:hidden"
      data-sticky-cta
    >
      <a
        className={`${buttonGold} flex min-h-[58px] w-full text-[16.5px]`}
        href="#contato"
      >
        Entrar em contato
      </a>
    </div>
  );
}
