import { faqItems } from "@/data/content";

export function Faq() {
  return (
    <div className="border-t border-paper/15">
      {faqItems.map((item) => (
        <details
          className="reveal group border-b border-paper/15"
          data-reveal="rise-small"
          name="perguntas-frequentes"
          key={item.question}
        >
          <summary className="flex min-h-[60px] cursor-pointer list-none items-start justify-between gap-6 py-[24px] font-heading text-[clamp(17px,1.8vw,20px)] leading-[1.4] font-normal text-paper transition-colors marker:hidden hover:text-gold-bright [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              className="shrink-0 font-body text-[26px] leading-[0.9] font-normal text-gold-bright transition-transform duration-300 ease-fluid group-open:rotate-135"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="max-w-[68ch] pb-7 text-[16.5px] leading-[1.74] text-paper/75">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
