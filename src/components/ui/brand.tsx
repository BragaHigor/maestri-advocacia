import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-[clamp(11px,3vw,15px)]">
      <Image
        className={
          footer
            ? "h-[58px] w-auto"
            : "h-[clamp(42px,12vw,52px)] w-auto transition-[height] duration-450 ease-fluid group-data-[scrolled]/header:h-10"
        }
        src="/assets/brand/maestri-monograma-fundo-escuro.svg"
        alt=""
        width={1000}
        height={849}
        loading="eager"
        style={{ width: "auto" }}
        aria-hidden="true"
      />
      <span className="flex min-w-0 flex-col gap-1.5">
        <Image
          className={
            footer
              ? "h-[25px] w-auto"
              : "h-[clamp(18px,5.2vw,23px)] w-auto transition-[height] duration-450 ease-fluid group-data-[scrolled]/header:h-[18px]"
          }
          src="/assets/brand/maestri-nome-creme.svg"
          alt="Maestri"
          width={1000}
          height={152}
          loading="eager"
          style={{ width: "auto" }}
        />
        <span
          className={`font-heading leading-none font-semibold tracking-[0.34em] whitespace-nowrap text-gold-bright uppercase ${
            footer ? "text-[12.5px]" : "text-[clamp(9.5px,2.8vw,11.5px)]"
          }`}
        >
          Advocacia
        </span>
      </span>
    </span>
  );
}
