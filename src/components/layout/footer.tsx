import { siteConfig } from "@/config/site";
import { footerNavigationItems } from "@/data/content";
import { createEmailUrl } from "@/lib/contact";

import { Container } from "../ui/container";
import { Brand } from "../ui/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const columnClass = "flex flex-col gap-2.5";
  const titleClass =
    "text-[11.5px] font-semibold tracking-[0.18em] text-paper/50 uppercase";
  const linkClass = "text-[15px] text-paper hover:text-gold-deep";

  return (
    <footer className="border-t border-paper/15 bg-ink-2 pt-[clamp(44px,6vw,76px)] pb-[calc(114px+env(safe-area-inset-bottom))] text-paper/75 min-[1220px]:pb-[clamp(32px,4vw,48px)]">
      <Container>
        <div className="mb-[34px] grid grid-cols-[repeat(auto-fit,minmax(214px,1fr))] items-start gap-[34px]">
          <div className={columnClass}>
            <a href="#top" aria-label="Maestri Advocacia — início">
              <Brand footer />
            </a>
            <p className="text-[14.5px] leading-[1.6]">
              Direito do Consumidor e fraudes bancárias.
            </p>
          </div>
          <div className={columnClass}>
            <p className={titleClass}>Contato</p>
            <a className={linkClass} href="#contato">
              {siteConfig.phoneDisplay}
            </a>
            <a className={linkClass} href={createEmailUrl()}>
              {siteConfig.email}
            </a>
          </div>
          <div className={columnClass}>
            <p className={titleClass}>Escritório</p>
            <p className="text-[15px] leading-[1.6] text-paper">
              {siteConfig.location}
            </p>
            <p className="text-[15px] leading-[1.6] text-paper">
              {siteConfig.oab}
            </p>
          </div>
          <div className={columnClass}>
            <p className={titleClass}>Navegação</p>
            {footerNavigationItems.map((item) => (
              <a className={linkClass} href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <span className="block h-px bg-paper/15" />

        <div className="mt-[34px] flex flex-col items-start gap-[18px_40px] min-[521px]:flex-row min-[521px]:flex-wrap min-[521px]:items-end min-[521px]:justify-between">
          <p className="max-w-[76ch] text-[13px] leading-[1.72] text-paper/50">
            Este site tem caráter exclusivamente informativo, em conformidade
            com o Código de Ética e Disciplina e com o Provimento nº 205/2021 do
            Conselho Federal da OAB. Não constitui oferta de serviços, captação
            de clientela nem promessa de resultado. As informações e os prazos
            apresentados são de ordem geral e não substituem a análise
            individual de cada caso.
          </p>
          <div className="flex flex-col items-start gap-0.5 text-left min-[521px]:items-end min-[521px]:text-right">
            <p className="text-[13px] text-paper/45">
              © {currentYear} Maestri Advocacia
            </p>
            <p className="text-[11.5px] tracking-[0.01em] text-paper/35">
              Desenvolvido por{" "}
              <a
                className="border-b border-gold/30 text-paper/50 hover:border-gold hover:text-gold-deep"
                href="https://www.linkedin.com/in/higor-braga-99010ba1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Higor Braga
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
