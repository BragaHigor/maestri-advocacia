import Image from "next/image";

import { siteConfig } from "@/config/site";
import {
  commitmentItems,
  journeySteps,
  practiceAreas,
} from "@/data/content";
import { createEmailUrl, createWhatsappUrl } from "@/lib/contact";
import {
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
import { Faq } from "./faq";

export function HeroSection() {
  return (
    <section id="top">
      <Container className="grid grid-cols-1 items-center gap-[clamp(36px,5vw,72px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(56px,8vw,108px)] min-[960px]:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div
          className="reveal flex min-w-0 flex-col gap-[clamp(22px,2.6vw,32px)]"
          data-reveal="rise"
        >
          <p className={kickerClass}>
            <span className="h-[1.5px] w-[26px] bg-gold" />
            Direito do Consumidor &amp; Fraudes bancárias
          </p>
          <h1
            className={`${headingOneClass} reveal max-w-[15ch] min-[960px]:text-[clamp(48px,5vw,64px)]`}
            data-reveal="mask"
          >
            Especialista em fraudes bancárias para quem quer o seu dinheiro de
            volta.
          </h1>
          <p className="max-w-[58ch] text-[clamp(17px,1.5vw,19.5px)] leading-[1.72]">
            Atendemos pessoas de todo o Brasil vítimas de golpes no Pix, no
            cartão de crédito e em compras online. Atuação exclusiva em Direito
            do Consumidor, com contato direto com advogado do início ao fim.
          </p>
          <div className="flex flex-col items-start gap-4 min-[521px]:flex-row min-[521px]:items-center min-[521px]:gap-6">
            <a className={buttonGold} href="#contato">
              Enviar meu caso
            </a>
            <p className="text-[14.5px] leading-[1.6] text-paper/75">
              Atendimento em todo o Brasil
            </p>
          </div>
        </div>

        <div
          className="reveal relative mx-auto w-full min-w-0 max-w-[680px] min-[960px]:max-w-none"
          data-reveal="fade"
        >
          <div className="relative overflow-hidden rounded-md border border-paper/15">
            <Image
              className="aspect-4/5 w-full object-cover object-[50%_16%] saturate-[0.88] contrast-[1.04]"
              data-parallax="-0.055"
              src="/assets/images/retrato-principal.jpg"
              alt="Advogada responsável pela Maestri Advocacia"
              width={853}
              height={1280}
              sizes="(max-width: 959px) 100vw, 42vw"
              preload
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
  );
}

export function PracticeAreasSection() {
  return (
    <section
      className={`${sectionClass} border-y border-paper/15 bg-ink-2`}
      id="atuacao"
    >
      <Container>
        <SectionHeading
          kicker="Área de atuação"
          title="Como podemos ajudar você"
        />
        <div className="grid grid-cols-1 gap-5 min-[521px]:grid-cols-2 min-[960px]:grid-cols-4">
          {practiceAreas.map((area) => (
            <article
              className={`reveal ${cardClass}`}
              data-reveal="rise"
              key={area.title}
            >
              <h3 className="font-heading text-[25px] leading-[1.16] font-medium text-white">
                {area.title}
              </h3>
              <p className="max-w-[62ch] text-[15.5px] leading-[1.7] text-paper/75">
                {area.text}
              </p>
            </article>
          ))}
        </div>
        <div
          className="reveal mt-[clamp(32px,4vw,48px)] flex justify-center"
          data-reveal="rise-small"
        >
          <a
            className={`${buttonGold} w-full min-[521px]:w-auto min-[521px]:min-w-[300px]`}
            href="#contato"
          >
            Falar com um advogado
          </a>
        </div>
      </Container>
    </section>
  );
}

export function CommitmentSection() {
  return (
    <section className={sectionClass} id="compromisso">
      <Container>
        <div
          className="reveal flex max-w-[920px] flex-col gap-4"
          data-reveal="rise"
        >
          <p className={kickerClass}>Nosso compromisso</p>
          <h2
            className={`${headingTwoClass} reveal`}
            data-reveal="mask"
          >
            Quem cai em um golpe chega sem saber se tem direito, quanto tempo
            tem e o que fazer primeiro. A primeira entrega do escritório é essa
            resposta, em português claro.
          </h2>
        </div>
        <ul className="mt-[clamp(40px,6vw,76px)] grid grid-cols-1 gap-[28px_20px] min-[521px]:grid-cols-2 min-[960px]:grid-cols-4">
          {commitmentItems.map((item) => (
            <li
              className="reveal flex flex-col gap-2 border-t border-gold/35 pt-5"
              data-reveal="rise-small"
              key={item.title}
            >
              <h3 className="font-heading text-[22px] leading-[1.18] font-medium text-white">
                {item.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-paper/60">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
        <p
          className="reveal mt-[clamp(36px,5vw,64px)] max-w-[58ch] text-[17px] leading-[1.75] text-paper/75"
          data-reveal="rise"
        >
          Se houver caminho jurídico, explicamos qual é e quais são os riscos.
          Se não houver, você também vai ouvir isso com franqueza.
        </p>
      </Container>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section
      className={`${sectionClass} border-y border-paper/15 bg-ink-2`}
      id="como-funciona"
    >
      <Container>
        <SectionHeading kicker="O caminho" title="Como funciona" />
        <ol className="grid grid-cols-1 gap-[30px_20px] min-[521px]:grid-cols-2 min-[960px]:grid-cols-4">
          {journeySteps.map((step, index) => (
            <li
              className="reveal flex flex-col gap-2 border-t border-gold/35 pt-5"
              data-reveal="rise-small"
              key={step.title}
            >
              <span className="text-[12px] font-medium tracking-[0.16em] text-gold-bright tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-[24px] leading-[1.16] font-medium text-white">
                {step.title}
              </h3>
              <p className="text-[15.5px] leading-[1.68] text-paper/75">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function AttorneySection() {
  return (
    <section className={sectionClass} id="quem-atende">
      <Container className="grid grid-cols-1 items-center gap-[clamp(32px,5vw,68px)] min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
            sizes="(max-width: 959px) 100vw, 46vw"
          />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(217,174,60,0.1),rgba(13,11,9,0)_50%)]" />
        </div>
        <div
          className="reveal flex min-w-0 flex-col gap-5"
          data-reveal="rise"
        >
          <p className={kickerClass}>Quem atende</p>
          <h2
            className={`${headingTwoClass} reveal`}
            data-reveal="mask"
          >
            Advocacia dedicada a um assunto só
          </h2>
          <p className="text-[17px] leading-[1.74]">
            Especialista em Direito do Consumidor, com atuação concentrada em
            fraudes bancárias e conflitos de consumo no ambiente digital.
          </p>
          <p className="text-[17px] leading-[1.74] text-paper/75">
            Casos de golpe exigem familiaridade com o funcionamento dos sistemas
            de pagamento, com a jurisprudência dos tribunais e com o comportamento
            das instituições em cada etapa. É esse repertório que define a
            estratégia do seu caso.
          </p>
          <p className="text-[17px] leading-[1.74] text-paper/75">
            O atendimento é direto com advogado, do primeiro contato ao fim do
            processo, e 100% online: procuração assinada digitalmente e reuniões
            por videochamada.
          </p>
          <span className="block h-px bg-paper/15" />
          <dl className="grid grid-cols-1 gap-6 min-[521px]:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="text-[11.5px] font-medium tracking-[0.15em] text-paper/75 uppercase">
                Inscrição
              </dt>
              <dd className="m-0 font-heading text-[21px] font-medium text-white">
                {siteConfig.oab}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11.5px] font-medium tracking-[0.15em] text-paper/75 uppercase">
                Especialização
              </dt>
              <dd className="m-0 font-heading text-[21px] font-medium text-white">
                Direito do Consumidor
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11.5px] font-medium tracking-[0.15em] text-paper/75 uppercase">
                Atendimento
              </dt>
              <dd className="m-0 font-heading text-[21px] font-medium text-white">
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
      id="perguntas"
    >
      <Container>
        <SectionHeading kicker="Dúvidas" title="Perguntas frequentes" />
        <Faq />
      </Container>
    </section>
  );
}

export function ContactSection() {
  const whatsappUrl = createWhatsappUrl();

  return (
    <section
      className={`${sectionClass} relative overflow-hidden`}
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
          <h2
            className={`${headingTwoClass} reveal`}
            data-reveal="mask"
          >
            Conte o que aconteceu.
          </h2>
          <p className={introClass}>
            Respondemos com uma avaliação inicial honesta. Se não houver
            caminho, também dizemos.
          </p>
          <span className="block h-px bg-paper/15" />
          <address className="flex flex-col gap-4 not-italic">
            {whatsappUrl ? (
              <a
                className="font-heading text-[20px] font-medium text-paper transition-colors [overflow-wrap:anywhere] hover:text-gold-bright min-[521px]:text-[23px]"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {siteConfig.phoneDisplay}
              </a>
            ) : null}
            <a
              className="font-heading text-[20px] font-medium text-paper transition-colors [overflow-wrap:anywhere] hover:text-gold-bright min-[521px]:text-[23px]"
              href={createEmailUrl()}
            >
              {siteConfig.email}
            </a>
          </address>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
