export const buttonBase =
  "relative isolate inline-flex min-h-14 cursor-pointer items-center justify-center overflow-hidden rounded-sm border px-[30px] py-[17px] text-center text-base font-medium leading-[1.2] tracking-[0.01em] transition duration-200 active:translate-y-0";

export const buttonGold = `${buttonBase} button-shine border-gold bg-gold text-ink hover:-translate-y-0.5 hover:border-gold-bright hover:bg-gold-bright hover:text-ink hover:shadow-[0_10px_30px_rgba(217,174,60,0.22)]`;

export const sectionClass =
  "py-[clamp(56px,8vw,108px)]";

export const containerClass =
  "mx-auto w-full max-w-[1240px] px-[clamp(20px,4vw,48px)]";

export const headingOneClass =
  "font-heading text-[clamp(36px,9vw,54px)] leading-[1.04] font-normal tracking-[-0.012em] text-white text-balance min-[880px]:text-[clamp(42px,6.4vw,78px)]";

export const headingTwoClass =
  "font-heading text-[clamp(34px,3.8vw,54px)] leading-[1.08] font-normal tracking-[-0.01em] text-white text-balance";

export const kickerClass =
  "inline-flex items-center gap-2.5 text-[12px] font-medium tracking-[0.22em] text-gold-bright uppercase";

export const sectionHeadingClass =
  "mb-[clamp(32px,4vw,54px)] flex max-w-[62ch] flex-col gap-4";

export const introClass = "text-[17px] leading-[1.72] text-paper";

export const fieldClass = "flex flex-col gap-2";

export const labelClass =
  "text-[12px] font-medium tracking-[0.14em] text-paper/75 uppercase";

export const inputClass =
  "min-h-[52px] w-full rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 font-body text-base leading-6 text-paper caret-gold outline-none transition-colors placeholder:text-paper/40 hover:border-paper/30 focus:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold aria-[invalid=true]:border-alert";

export const cardClass =
  "flex flex-col gap-3 rounded-md border border-paper/15 bg-ink-3 p-[clamp(24px,2.6vw,34px)] transition duration-300 hover:-translate-y-1 hover:border-gold/55 motion-reduce:hover:translate-y-0";
