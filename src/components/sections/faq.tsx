import { faqItems } from "@/data/content";

export function Faq() {
  return (
    <dl className="border-t border-paper/15">
      {faqItems.map((item) => (
        <div className="reveal grid grid-cols-1 gap-2.5 border-b border-paper/15 py-[clamp(22px,3vw,30px)] min-[760px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] min-[760px]:gap-[clamp(40px,7vw,96px)]" data-reveal="rise-small" key={item.question}>
          <dt className="font-heading text-[clamp(20px,2vw,23px)] leading-[1.32] font-medium text-white">
            {item.question}
          </dt>
          <dd className="m-0 text-[16px] leading-[1.74] text-paper/75">
            {item.answer}
          </dd>
        </div>
      ))}
    </dl>
  );
}
