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
  const linkClass = "text-[15px] text-paper hover:text-gold-bright";

  return (
    <footer className="border-t border-paper/15 bg-[#080706] pt-[clamp(44px,6vw,76px)] pb-[calc(114px+env(safe-area-inset-bottom))] text-paper/75 min-[1220px]:pb-[clamp(32px,4vw,48px)]">
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
            <a
              className={linkClass}
              href="#contato"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a className={linkClass} href={createEmailUrl()}>
              {siteConfig.email}
            </a>
            <a
              className={`-ml-2 mt-1 inline-flex items-center gap-2 rounded-full pl-2 ${linkClass}`}
              href="https://www.instagram.com/maestri.adv/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Maestri Advocacia (abre em nova aba)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span
                aria-hidden="true"
                className="h-5 shrink-0 bg-current"
                style={{
                  aspectRatio: "408 / 112",
                  WebkitMaskImage:
                    "url(/assets/logo/instagram-wordmark-mask.png)",
                  maskImage: "url(/assets/logo/instagram-wordmark-mask.png)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                }}
              />
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
                className="border-b border-gold/30 text-paper/50 hover:border-gold hover:text-gold-bright"
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
