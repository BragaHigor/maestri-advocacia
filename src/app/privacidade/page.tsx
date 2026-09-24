import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { CookiePreferences } from "@/components/measurement-consent";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Política de privacidade | Maestri Advocacia",
  description: "Como o site da Maestri Advocacia utiliza dados e quais são seus canais de privacidade.",
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Política de privacidade | Maestri Advocacia",
    description: "Informações sobre dados pessoais e privacidade neste site.",
    url: "/privacidade",
  },
};

export default function PrivacyPage() {
  const sectionClass = "mt-8 space-y-3";
  const headingClass = "text-xl font-semibold text-paper";

  return (
    <>
      <Header />
      <Link
        href="/"
        className="group fixed bottom-5 left-5 z-90 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/60 bg-ink/90 px-4 py-2 text-sm text-gold shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-gold-bright hover:bg-ink-2 hover:text-gold-bright hover:shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_28px_6px_rgba(217,174,60,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold min-[1220px]:bottom-6 min-[1220px]:left-6 print:hidden"
      >
        <svg className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Voltar ao site
      </Link>
      <main className="mx-auto max-w-3xl px-5 py-12 text-paper/80 sm:px-8 sm:py-20">
        <h1 className="mt-8 font-serif text-4xl leading-tight text-paper sm:text-5xl">Política de privacidade</h1>
        <p className="mt-4 text-sm">Atualizada em 22 de setembro de 2026.</p>
        <div className="break-words text-base leading-relaxed">
          <section className={sectionClass}>
            <h2 className={headingClass}>Responsável e contato</h2>
            <p>Laura De Freitas Pereira Maestri, responsável pela Maestri Advocacia e identificada neste site pela inscrição {siteConfig.oab}, é a responsável pelo tratamento dos dados no atendimento realizado por seus canais. Para dúvidas sobre privacidade ou solicitações relacionadas aos seus dados, escreva para <a className="text-gold-bright underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ou entre em contato pelo número {siteConfig.phoneDisplay}.</p>
          </section>
          <section className={sectionClass}>
            <h2 className={headingClass}>Formulário e calculadora</h2>
            <p>O formulário utiliza nome, telefone, tipo de caso, data e relato para preparar uma mensagem no seu dispositivo. O código do site não envia esses campos a um servidor próprio nem grava o relato em cookies ou armazenamento local. A calculadora também processa os dados no dispositivo.</p>
            <p>Após tentar abrir o aplicativo, os campos continuam preenchidos na página. Você pode tentar novamente ou usar “Limpar formulário”. Não há recurso do site para recuperar o preenchimento após fechar ou recarregar a página.</p>
            <p>Ao abrir o WhatsApp, os dados preenchidos compõem o endereço de uma mensagem e são encaminhados ao serviço externo. Ao abrir o e-mail, são repassados ao aplicativo escolhido. A confirmação do envio acontece nesses aplicativos. Esses serviços podem tratar dados conforme suas próprias políticas, inclusive antes da confirmação do envio.</p>
            <p>Evite informar senhas, códigos de autenticação, números completos de cartão ou documentos desnecessários no relato inicial.</p>
          </section>
          <section className={sectionClass}>
            <h2 className={headingClass}>Atendimento pelos canais externos</h2>
            <p>As informações efetivamente recebidas pelo escritório são utilizadas para responder ao contato e avaliar a solicitação de atendimento. Conforme o caso, o tratamento poderá se apoiar em procedimentos preliminares solicitados por você, execução de contrato, cumprimento de obrigações legais ou exercício regular de direitos. O contato inicial não constitui contratação automática.</p>
            <p>A conservação das mensagens e de eventuais documentos depende da finalidade do atendimento e das obrigações aplicáveis. Solicitações de exclusão serão avaliadas considerando também hipóteses legais de conservação.</p>
          </section>
          <section className={sectionClass}>
            <h2 className={headingClass}>Navegação, hospedagem e cookies</h2>
            <p>O site carrega em todas as visitas a tag do Google, usada para duas finalidades: o Google Ads, que mede tentativas de contato pelo formulário ou botão de WhatsApp, e o Google Analytics, que mede a audiência do site — quantas pessoas acessam, quais páginas visitam e por qual caminho chegaram. Antes de você decidir, e também se você recusar, a tag opera em modo restrito: não grava cookies de publicidade, não utiliza identificadores para criar perfil e envia ao Google apenas uma medição agregada, com redução de dados de anúncios ativada. Ao aceitar, passam a ser utilizados cookies de medição. Essa medição não confirma envio de mensagem, atendimento ou contratação. Em nenhuma dessas situações o código transmite os campos do formulário ou o endereço da mensagem do WhatsApp ao Google.</p>
            <p>Após o aceite, a tag pode tratar identificadores de publicidade, cookies como _gcl_aw, endereço IP e informações técnicas do navegador. Sem o aceite, permanecem o endereço IP e informações técnicas do navegador inerentes à requisição, sem cookies de publicidade. Esses dados são destinados ao Google para medição publicitária e podem ser processados fora do Brasil. O Google Analytics recebe o endereço da página, o título, o endereço de origem que trouxe você e parâmetros de campanha presentes no link, além de dados técnicos do navegador; é assim que conseguimos saber de onde vem o tráfego. Não habilitamos personalização de anúncios, remarketing ou conversões otimizadas: o sinal de personalização permanece negado mesmo depois do aceite. Consulte também a <a href="https://policies.google.com/privacy?hl=pt-BR" className="text-gold-bright underline" target="_blank" rel="noopener noreferrer">política de privacidade do Google</a>.</p>
            <p>Após o aceite, o Analytics também grava cookies próprios, como _ga, para distinguir visitas e sessões. Sua escolha é conservada no armazenamento local por até 180 dias. Após aceitar, um indicador no armazenamento da sessão evita repetir o evento de contato na mesma visita. Os cookies de medição têm duração controlada pelo Google. Você pode mudar a escolha abaixo. Ao revogar, a tag recebe imediatamente a atualização para negar consentimento e volta ao modo restrito, sem cookies de publicidade; o script permanece carregado, e eventuais tentativas de contato seguintes continuam sendo medidas nesse formato agregado. A revogação não apaga dados já recebidos pelo Google. Cookies existentes também podem ser removidos pelas configurações do navegador.</p>
            <CookiePreferences />
            <p>Para disponibilizar o site, o serviço de hospedagem pode processar informações técnicas, como endereço IP, data e hora, páginas solicitadas e informações do navegador, em registros de operação e segurança. A ausência de armazenamento dos relatos pelo site não significa ausência de todo tratamento técnico durante a navegação.</p>
            <p>Links para WhatsApp, Instagram e outros serviços levam a ambientes com políticas próprias. Fontes e imagens do site são servidas pela própria aplicação.</p>
          </section>
          <section className={sectionClass}>
            <h2 className={headingClass}>Seus direitos</h2>
            <p>Você pode solicitar confirmação do tratamento, acesso, correção e informações sobre compartilhamento, além de anonimização, bloqueio ou exclusão quando cabíveis. Quando o tratamento depender de consentimento, poderá solicitar sua revogação. Use o canal de contato acima; poderá ser necessária confirmação de identidade para proteger seus dados.</p>
            <p>Também é possível apresentar uma petição à Autoridade Nacional de Proteção de Dados (ANPD). Esta política poderá ser atualizada para refletir alterações no funcionamento do site e no atendimento.</p>
          </section>
        </div>
      </main>
  </>
  );
}
