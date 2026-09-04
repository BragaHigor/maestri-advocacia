import Image from "next/image";

import { siteConfig } from "@/config/site";
import {
  caseCards,
  marqueeItems,
  processSteps,
  scamSignals,
} from "@/data/content";
import { createEmailUrl } from "@/lib/contact";
import {
  buttonGhost,
  buttonGold,
  cardClass,
  headingOneClass,
  headingTwoClass,
  introClass,
  kickerClass,
  sectionClass,
} from "@/styles/classes";

import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { ContactForm } from "./contact-form";
import { DeadlineCalculator } from "./deadline-calculator";
import { Faq } from "./faq";

export function HeroSection() {
  return (
    <>
      <section className="scroll-mt-24" id="top">
        <Container className="grid grid-cols-1 items-center gap-[clamp(36px,5vw,72px)] py-[clamp(44px,6vw,84px)] min-[880px]:min-h-[calc(100svh-150px)] min-[880px]:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <div
            className="reveal flex flex-col gap-[clamp(22px,2.6vw,32px)]"
            data-reveal="rise"
          >
            <p className={kickerClass}>
              <span className="h-[1.5px] w-[26px] bg-gold" />
              Direito do Consumidor &amp; Fraudes bancárias
            </p>
            <h1 className={`${headingOneClass} reveal`} data-reveal="mask">
              <span>
                Atuação focada em fraudes bancárias para quem quer o seu{" "}
              </span>
              <em className="font-normal text-gold-bright not-italic">
                dinheiro de volta.
              </em>
            </h1>
            <p className="max-w-[54ch] text-[clamp(17px,1.5vw,19.5px)] leading-[1.72]">
              Atendemos pessoas de todo o Brasil vítimas de golpes no Pix, no
              cartão de crédito e em compras online. Atuação exclusiva em
              Direito do Consumidor, com contato direto com advogado do início
              ao fim.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a className={buttonGold} href="#contato">
                Enviar meu caso agora
              </a>
              <a className={buttonGhost} href="#ferramenta">
                Calcular meu prazo
              </a>
            </div>
            <p className="text-[14.5px] leading-[1.6] text-paper/75">
              Atendimento em todo o Brasil
            </p>
          </div>

          <div
            className="reveal relative mx-auto w-full min-w-0 max-w-[620px] min-[880px]:max-w-[520px]"
            data-reveal="fade"
          >
            <div className="relative overflow-hidden rounded-md border border-paper/15">
              <Image
                className="aspect-4/5 w-full object-cover object-[50%_16%] saturate-[0.88] contrast-[1.04]"
                data-parallax="-0.055"
                src="/assets/images/retrato-principal.jpeg"
                alt="Advogada responsável pela Maestri Advocacia"
                width={853}
                height={1280}
                sizes="(max-width: 879px) 100vw, 42vw"
                priority
              />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,11,9,0)_38%,rgba(13,11,9,0.55)_72%,#0d0b09_100%)]" />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(217,174,60,0.12),rgba(13,11,9,0)_55%)]" />
            </div>
            <Image
              className="absolute bottom-[22px] left-1/2 h-auto w-[76px] -translate-x-1/2 opacity-90"
              src="/assets/brand/maestri-monograma-fundo-escuro.svg"
              alt=""
              width={1000}
              height={849}
              style={{ height: "auto" }}
              aria-hidden="true"
            />
          </div>
        </Container>
      </section>
      <Marquee />
    </>
  );
}

function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-paper/15 bg-ink-2 py-5"
      aria-hidden="true"
      data-marquee
    >
      <div className="marquee-track flex w-max will-change-transform">
        {[0, 1, 2].map((group) => (
          <div
            className="flex shrink-0 items-center gap-[26px] pr-[26px] font-heading text-lg font-normal tracking-[0.04em] whitespace-nowrap text-paper/50"
            data-marquee-group
            key={group}
          >
            {marqueeItems.map((item) => (
              <span className="contents" key={`${group}-${item}`}>
                <span>{item}</span>
                <i className="text-gold not-italic">·</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DeadlineSection() {
  return (
    <section className={sectionClass} id="ferramenta">
      <Container>
        <SectionHeading
          kicker="Ferramenta"
          title="Quanto tempo você ainda tem?"
          description="Escolha a situação que mais se parece com a sua e informe a data solicitada. O cálculo é informativo — os detalhes do caso podem mudar a contagem e devem ser confirmados na análise."
        />
        <DeadlineCalculator />
        <aside
          className="reveal mt-[clamp(20px,3vw,30px)] grid grid-cols-1 items-baseline gap-[8px_20px] border-l-2 border-gold/60 bg-gold/5 p-4 text-[13px] leading-[1.65] text-paper/60 min-[621px]:grid-cols-[auto_minmax(0,1fr)] min-[621px]:p-[18px_20px]"
          data-reveal="fade"
          aria-labelledby="calc-sources-title"
        >
          <p
            className="text-[11.5px] font-semibold tracking-[0.14em] text-gold-bright uppercase"
            id="calc-sources-title"
          >
            Fontes oficiais
          </p>
          <p>
            Os prazos exibidos vêm das regras do{" "}
            <a
              className="border-b border-gold/30 text-paper/75 hover:border-gold hover:text-gold-bright"
              href="https://www.bcb.gov.br/meubc/faqs/p/o-que-e-e-como-funciona-o-mecanismo-especial-de-devolucao-med"
              target="_blank"
              rel="noopener noreferrer"
            >
              MED do Banco Central
            </a>{" "}
            e do{" "}
            <a
              className="border-b border-gold/30 text-paper/75 hover:border-gold hover:text-gold-bright"
              href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Código de Defesa do Consumidor
            </a>
            , especialmente nos arts. 26, 27, 49 e 54-G.
          </p>
        </aside>
      </Container>
    </section>
  );
}

export function CasesSection() {
  return (
    <section
      className={`${sectionClass} border-y border-paper/15 bg-ink-2`}
      id="atuacao"
    >
      <Container>
        <SectionHeading
          kicker="Área de atuação"
          title="Como podemos ajudar você"
          description="Atuação concentrada em relações de consumo e fraudes no ambiente bancário e digital."
        />
        <div className="grid grid-cols-1 gap-5 min-[521px]:grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
          {caseCards.map((card) => (
            <article
              className={`reveal ${cardClass} ${card.featured ? "gap-3.5 min-[880px]:col-span-2 min-[880px]:p-[clamp(26px,3vw,40px)]" : ""}`}
              data-reveal="rise"
              key={card.title}
            >
              {card.featured ? (
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-bright uppercase">
                  Mais frequente
                </p>
              ) : null}
              <h3
                className={`font-heading leading-[1.18] font-normal text-white ${card.featured ? "text-[27px]" : "text-[22px]"}`}
              >
                {card.title}
              </h3>
              <p
                className={`max-w-[62ch] leading-[1.7] ${card.featured ? "text-base" : "text-[15.5px] text-paper/75"}`}
              >
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

const splitClass =
  "grid grid-cols-1 items-start gap-[clamp(32px,5vw,72px)] min-[880px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]";
const splitAsideClass =
  "reveal flex flex-col gap-4 min-[880px]:sticky min-[880px]:top-[116px]";

export function SignalsSection() {
  return (
    <section className={sectionClass} id="como-reconhecer">
      <Container className={splitClass}>
        <div className={splitAsideClass} data-reveal="rise">
          <p className={kickerClass}>Como reconhecer</p>
          <h2 className={`${headingTwoClass} reveal`} data-reveal="mask">
            Seis sinais de que é golpe
          </h2>
          <p className="max-w-[42ch] text-base leading-[1.72] text-paper/75">
            Se alguma destas situações estiver acontecendo agora, encerre o
            contato antes de decidir qualquer coisa.
          </p>
        </div>
        <ol className="flex flex-col">
          {scamSignals.map((signal, index) => (
            <li
              className="reveal grid grid-cols-[34px_1fr] gap-3.5 border-b border-paper/15 py-6 last:border-b-0 min-[521px]:grid-cols-[42px_1fr] min-[521px]:gap-[18px]"
              data-reveal="rise-small"
              key={signal.title}
            >
              <span className="font-heading text-lg font-normal text-gold-bright tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-xl leading-[1.16] font-medium text-white">
                  {signal.title}
                </h3>
                <p className="text-base leading-[1.68] text-paper/75">
                  {signal.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section
      className={`${sectionClass} border-y border-paper/15 bg-ink-2`}
      id="o-caminho"
    >
      <Container className={splitClass}>
        <div className={splitAsideClass} data-reveal="rise">
          <p className={kickerClass}>O caminho</p>
          <h2 className={`${headingTwoClass} reveal`} data-reveal="mask">
            Do primeiro contato ao desfecho
          </h2>
          <p className="max-w-[42ch] text-base leading-[1.72] text-paper/75">
            Quatro etapas, sem surpresa em nenhuma delas.
          </p>
        </div>
        <div className="flex flex-col">
          {processSteps.map((step, index) => (
            <div
              className="reveal grid grid-cols-[48px_1fr] gap-3.5 border-t border-paper/15 py-7 last:border-b min-[521px]:grid-cols-[64px_1fr] min-[521px]:gap-5"
              data-reveal="rise-small"
              key={step.title}
            >
              <span className="font-heading text-[28px] leading-none font-normal text-gold/60 tabular-nums min-[521px]:text-[36px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-[21px] leading-[1.16] font-medium text-white">
                  {step.title}
                </h3>
                <p className="text-base leading-[1.7] text-paper/75">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className={sectionClass} id="quem-atende">
      <Container className="grid grid-cols-1 items-center gap-[clamp(32px,5vw,68px)] min-[880px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div
          className="reveal relative order-first min-w-0 overflow-hidden rounded-md border border-paper/15"
          data-reveal="rise"
        >
          <Image
            className="aspect-4/5 w-full object-cover object-[50%_55%] saturate-90 contrast-[1.03]"
            data-parallax="-0.055"
            src="/assets/images/retrato-sentada.jpg"
            alt="Advogada responsável pela Maestri Advocacia"
            width={853}
            height={1280}
            sizes="(max-width: 879px) 100vw, 38vw"
          />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(217,174,60,0.1),rgba(13,11,9,0)_50%)]" />
        </div>
        <div className="reveal flex min-w-0 flex-col gap-5" data-reveal="rise">
          <p className={kickerClass}>Quem atende</p>
          <h2 className={`${headingTwoClass} reveal`} data-reveal="mask">
            Advocacia dedicada a um assunto só
          </h2>
          <p className="text-base leading-[1.74]">
            Especialista em Direito do Consumidor, com atuação concentrada em
            fraudes bancárias e conflitos de consumo no ambiente digital.
          </p>
          <p className="text-base leading-[1.74] text-paper/75">
            Casos de golpe exigem familiaridade com o funcionamento dos sistemas
            de pagamento, com a jurisprudência dos tribunais e com o
            comportamento das instituições em cada etapa. É esse repertório que
            define a estratégia do seu caso.
          </p>
          <p className="text-base leading-[1.74] text-paper/75">
            O atendimento é direto com advogado, do primeiro contato ao fim do
            processo, e 100% online: procuração assinada digitalmente e reuniões
            por videochamada.
          </p>
          <span className="block h-px bg-paper/15" />
          <dl className="grid grid-cols-1 gap-6 min-[520px]:grid-cols-3 min-[520px]:gap-5">
            <div className="reveal flex flex-col gap-1" data-reveal="rise-small">
              <dt className="text-[12.5px] font-semibold tracking-[0.14em] text-paper/75 uppercase">
                Inscrição
              </dt>
              <dd className="m-0 font-heading text-lg font-normal text-white">
                {siteConfig.oab}
              </dd>
            </div>
            <div className="reveal flex flex-col gap-1" data-reveal="rise-small">
              <dt className="text-[12.5px] font-semibold tracking-[0.14em] text-paper/75 uppercase">
                Especialização
              </dt>
              <dd className="m-0 font-heading text-lg font-normal text-white">
                Direito do Consumidor
              </dd>
            </div>
            <div className="reveal flex flex-col gap-1" data-reveal="rise-small">
              <dt className="text-[12.5px] font-semibold tracking-[0.14em] text-paper/75 uppercase">
                Atendimento
              </dt>
              <dd className="m-0 font-heading text-lg font-normal text-white">
                {siteConfig.serviceArea}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}

export function FaqSection() {
  return (
    <section
      className={`${sectionClass} border-y border-paper/15 bg-ink-2`}
      id="perguntas-frequentes"
    >
      <Container className="max-w-[940px]">
        <SectionHeading
          kicker="Perguntas frequentes"
          title="O que se pergunta antes de decidir"
        />
        <Faq />
      </Container>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      className={`${sectionClass} relative overflow-hidden border-y border-paper/15 bg-ink-2`}
      id="contato"
    >
      <Image
        className="pointer-events-none absolute bottom-[-20%] left-[-7%] h-auto w-[min(540px,54vw)] opacity-5"
        src="/assets/brand/maestri-monograma-fundo-escuro.svg"
        alt=""
        width={1000}
        height={849}
        style={{ height: "auto" }}
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-start gap-[clamp(36px,5vw,76px)] min-[880px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div
          className="reveal flex min-w-0 flex-col gap-[22px]"
          data-reveal="rise"
        >
          <p className={kickerClass}>Fale com um advogado</p>
          <h2 className={`${headingTwoClass} reveal`} data-reveal="mask">
            Conte o que aconteceu. O resto a gente organiza.
          </h2>
          <p className={introClass}>
            Descreva o caso em poucas linhas. Respondemos com uma avaliação
            inicial honesta: se há caminho, qual seria, e o que você precisa
            reunir. Se não houver, também dizemos.
          </p>
          <span className="block h-px bg-paper/15" />
          <div className="flex flex-col gap-4">
            <a
              className="flex flex-col items-start gap-0.5 text-paper hover:text-gold-bright min-[521px]:inline-flex min-[521px]:flex-row min-[521px]:items-center min-[521px]:gap-3.5"
              href="#contato"
            >
              <span className="min-w-[78px] text-[12.5px] font-semibold tracking-[0.16em] text-paper/75 uppercase">
                WhatsApp
              </span>
              <span className="font-heading text-lg font-normal [overflow-wrap:anywhere] min-[521px]:text-xl min-[521px]:whitespace-nowrap">
                {siteConfig.phoneDisplay}
              </span>
            </a>
            <a
              className="flex flex-col items-start gap-0.5 text-paper hover:text-gold-bright min-[521px]:inline-flex min-[521px]:flex-row min-[521px]:items-center min-[521px]:gap-3.5"
              href={createEmailUrl()}
            >
              <span className="min-w-[78px] text-[12.5px] font-semibold tracking-[0.16em] text-paper/75 uppercase">
                E-mail
              </span>
              <span className="font-heading text-lg font-normal [overflow-wrap:anywhere] min-[521px]:text-xl min-[521px]:whitespace-nowrap">
                {siteConfig.email}
              </span>
            </a>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
