# Contexto do projeto

Revisão do código e verificações locais em 18/09/2026.

## Produto e escopo atual

Site institucional da Maestri Advocacia, focado em Direito do Consumidor e
fraudes bancárias, com atendimento online em todo o Brasil. A jornada apresenta
áreas de atuação, sinais de fraude, processo de atendimento, perfil profissional,
perguntas frequentes, calculadora informativa e formulário de contato.

As páginas públicas são `/` e `/privacidade`. Não existem API própria, banco de dados,
autenticação, painel administrativo, CMS, armazenamento de leads, upload,
Google Analytics ou integração de envio de e-mail no servidor. Há medição de tentativas de contato pelo Google Ads em consent mode avançado,
descrita em [Google Ads](google-ads.md): a tag carrega em toda visita já negada,
sem cookies, e passa a gravar apenas após o aceite. O formulário prepara
uma mensagem no dispositivo; o visitante confirma o envio no WhatsApp ou no
aplicativo de e-mail. O manifest não implica suporte offline: não há service
worker no código do projeto.

## Stack e execução

- Next.js 16.3.3, App Router, React 19.2.8 e TypeScript 6.0.3 estrito.
- Tailwind CSS 4.3.3 com PostCSS; tokens em `src/app/globals.css`.
- Framer Motion para animações e progresso de rolagem.
- Componentes de interface locais com Radix UI, React Day Picker, Lucide,
  class-variance-authority e tailwind-merge; date-fns fornece locale pt-BR.
- Fontes auto-hospedadas via Fontsource: Bodoni Moda e Manrope.
- npm e package-lock; scripts de dev, lint, typecheck, test, build e start.
- Deploy previsto na Vercel; `vercel.json` declara o framework.

O build atual pré-renderiza a página e as rotas de metadata. A otimização de
imagens continua sendo responsabilidade do runtime Next/Vercel. Não confundir
pré-renderização com configuração de exportação estática.

## Mapa de responsabilidades

| Local | Responsabilidade e ponto de extensão |
| --- | --- |
| `src/app/page.tsx` | Ordem das oito seções, layout da página, provider e CTAs fixos |
| `src/app/layout.tsx` | Idioma, fontes, metadata, viewport e MotionProvider |
| `src/components/sections/landing-sections.tsx` | Hero, atuação, sinais, processo, perfil, FAQ, ferramenta e contato |
| `src/data/content.ts` | Navegações, cards de atuação, marquee, sinais, etapas e perguntas |
| `src/config/site.ts` | Dados institucionais, URL canônica e destino do formulário por ambiente |
| `src/context/case-type-context.tsx` | Sincronização do tipo selecionado na ferramenta e no formulário |
| `src/domain/deadlines/` | Tipos, catálogo das seis regras e função pura de cálculo |
| `src/lib/date.ts` | Datas locais, parsing, formatação e operações de calendário |
| `src/lib/contact.ts` | Validação de entradas, máscara de telefone, normalização e links wa.me/mailto |
| `src/components/sections/contact-form.tsx` | Campos, erros, calendário, composição da mensagem e abertura do canal |
| `src/components/sections/deadline-calculator.tsx` | Seleção de regra/data e apresentação de número, progresso e tom |
| `src/components/layout/` | Menu responsivo, rodapé, barra móvel e botão flutuante de WhatsApp |
| `src/components/ui/` | Marca, container, títulos, botão, select, popover e calendário |
| `src/styles/classes.ts` | Classes compartilhadas de tipografia, botões, campos, cards e espaçamento |
| `src/lib/motion.ts` | Variantes e configuração de entrada das animações |
| `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx` | Rotas técnicas de metadata |
| `src/components/structured-data.tsx` | JSON-LD LegalService com dados controlados |
| `next.config.ts` | CSP e headers de segurança |
| `public/assets/` | SVGs de marca, favicons, duas fotos e máscara da marca Instagram |

`page.tsx` e `layout.tsx` compõem a aplicação no servidor. Entretanto,
`landing-sections.tsx` inteiro é um módulo client por causa das animações;
as seções editoriais também entram nessa fronteira. Header, FAQ, formulário,
calculadora, títulos animados, contexto e progresso são client.

## Fluxos e contratos

### Navegação e layout

Seções: `top`, `atuacao`, `como-reconhecer`, `o-caminho`, `quem-atende`,
`perguntas-frequentes`, `ferramenta` e `contato`. Header e footer usam arrays
de navegação separados. A maioria dos CTAs leva a `#contato`; o botão flutuante
abre diretamente o WhatsApp configurado. Instagram e LinkedIn são links fixos.

Identidade: fundo escuro, creme e dourado, Bodoni Moda nos títulos e Manrope no
corpo. Largura principal máxima de 1240 px, espaçamento e fontes fluidos.
Breakpoints centrais: 520/521 px, 880 px e 1220 px. Abaixo de 1220 px há menu
móvel e barra fixa de contato. O menu abre com foco no primeiro link e fecha
por navegação, Escape e redimensionamento para desktop.

### Calculadora

IDs atuais: `pix`, `cartao`, `compraonline`, `vicio30`, `vicio90`, `reparacao`.
O catálogo contém, respectivamente, 80 dias, antecedência de 10 dias,
7 dias, 30 dias, 90 dias e 5 anos. Estes valores descrevem o código;
esta revisão não valida legislação nem a aplicação jurídica dos prazos.

`calculateDeadline(rule, inputValue, now)` retorna número, unidade, progresso,
tom (`normal`, `warning`, `alert`), título e texto. A injeção de `now` permite
testes determinísticos. Datas usam calendário local e diferença entre dias
calculada por UTC para evitar efeitos da duração de um dia no horário local.

A seleção de tipo sincroniza com o formulário nos dois sentidos. `outro` só
existe no formulário e mantém a última regra da calculadora. Datas são estados
independentes: data e resultado da ferramenta não são enviados ao formulário.
O CTA do resultado apenas navega para `#contato`.

### Formulário

Exige nome, telefone, data do ocorrido e relato; tipo começa como Pix.
Nome: 2 a 80 caracteres, sem números. Relato: 20 a 1500 caracteres.
Telefone recebe máscara e validação; aceita também formatos de telefone fixo.
Calendário e validação impedem data futura. Erros direcionam o foco ao primeiro
campo inválido. Nome, telefone e relato são lidos de FormData; data e tipo usam
campos hidden sincronizados com estado.

O relato é normalizado, limitado e codificado na URL. Destino `email` usa
`window.location.assign(mailto)`; destino `whatsapp` usa `window.open(wa.me)`.
Os campos são preservados após a tentativa de abertura; não há confirmação de
envio ou recebimento. Nova tentativa revalida os dados atuais. Limpeza manual
restaura o tipo Pix, apaga campos, contador e erros, fecha calendário e foca nome.
Não há persistência em storage. Alterar o destino não altera o botão flutuante.
As ações aparecem após tentativa válida de abertura e permanecem disponíveis
durante a edição. Limpar oculta as ações. Até 520 px os botões ocupam largura
total em uma coluna; a partir de 521 px ficam lado a lado. A mensagem curta
mantém “Prontinho!” e informa confirmação no aplicativo, preservação dos dados
e opção de nova tentativa. Texto exato em [arquitetura](../.spec/architecture.md).

## Configuração, SEO e segurança

`siteConfig` centraliza variáveis `NEXT_PUBLIC_*` e defaults institucionais.
Variáveis públicas são incorporadas ao build. `.env` está ignorado no Git;
seu conteúdo não foi exposto nesta revisão. Defaults do código, modelo de env
e exemplos de deploy não devem ser confundidos com configuração de produção.

SEO inclui canonical, Open Graph, Twitter, imagem social gerada, robots,
sitemap, manifest, favicons e JSON-LD LegalService. O sitemap inclui a home
e /privacidade; a política define canonical próprio. `areaServed` do JSON-LD está fixo em Brasil, embora exista serviceArea
configurável para o conteúdo visual.

CSP autoriza a própria origem e destinos Google necessários à medição Ads;
scripts e estilos permitem
inline, e unsafe-eval só é habilitado em desenvolvimento. Produção acrescenta
HSTS e upgrade de requisições inseguras. Há bloqueio de frames, nosniff,
Referrer-Policy e Permissions-Policy. Integrações externas de analytics,
CRM, vídeo, fontes, imagens ou APIs exigem avaliar as diretivas relevantes.

## Verificação atual

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou |
| `npm run typecheck` | Passou |
| `npm test` | 27 testes passaram, em 4 arquivos |
| `npm run build` | Passou; página e metadata estáticas |

Os testes de contato usam mock de siteConfig com dados fixos, independente da
configuração institucional. A calculadora tem cenários de dia limite e dia
seguinte para as cinco regras contadas do fato.

O formulário WhatsApp foi verificado no navegador em desktop e emulação mobile
de 390 px; após ajuste de layout das ações, o build final foi conferido em 320 px.
Foram verificados preservação, nova tentativa, validação e limpeza manual.
Não foram executados auditoria de dependências, validação jurídica,
verificação de deploy, medições de performance, abertura de aplicativo de e-mail
ou testes em celular físico. Não há suíte de componentes ou E2E configurada,
nem workflow de CI versionado em `.github/workflows`.

## Achados para priorização

1. **Teste de contato corrigido:** configuração isolada por mock de siteConfig;
   não depende mais do telefone institucional.
2. **Links de WhatsApp na seção e rodapé:** o número aponta para `#contato`,
   inclusive dentro da própria seção. Esses links não abrem diretamente o canal;
   o formulário oferece um botão de nova tentativa após abertura válida.
3. **Dia limite corrigido:** todas as regras mostram data-limite hoje com zero
   dias restantes e tom warning. Regras contadas do fato só mostram atraso
   quando remainingDays é negativo; limites cobertos por testes.
4. **Mudança de tipo mantém data:** uma data de vencimento de fatura pode ser
   reutilizada como data do fato ao selecionar outra regra. O resultado pode
   virar data futura; decidir se a seleção deve limpar ou separar datas.
5. **Resultado fica memorizado:** cálculo depende apenas de regra/data no
   useMemo; uma página aberta durante a virada do dia não atualiza o prazo
   automaticamente.
6. **Movimento e conteúdo sem JS:** variantes começam em opacity 0 com
   `initial="hidden"`, e o HTML servido carrega 61 elementos assim. Sem
   JavaScript o conteúdo editorial permanece invisível — pendência em aberto.
   Um fallback `<noscript>` com `<style>` foi tentado em 22/09/2026 e revertido:
   no site real as informações pararam de carregar em toda visita, mesmo com
   JavaScript ativo. Antes de tentar de novo, reproduzir a regressão em build de
   produção, com JavaScript habilitado, e confirmar que o React hidrata.
   Movimento reduzido não causa invisibilidade: `opacity` não está entre as
   chaves que o Framer Motion torna instantâneas, então o fade ocorre e só o
   deslocamento é suprimido. CSS de movimento reduzido continua não desativando
   a animação contínua do marquee; em desenvolvimento MotionProvider usa
   reducedMotion="never".
7. **Escape global no header:** o listener tenta focar o botão do menu mesmo
   com menu fechado, podendo interferir no fechamento de calendário/select.
8. **Preservação do contato corrigida:** campos mantidos na página após a
   tentativa, com nova abertura e limpeza manual, sem persistência em storage.
9. **Validação de placeholders:** helper de WhatsApp aceita o exemplo
   `5511999999999` de `.env.example`. Só o padrão de zeros tem bloqueio
   explícito, conforme descrito no README atual.
10. **Guard de IDs:** `isDeadlineId` usa `value in deadlineRules`, incluindo
    propriedades herdadas; usar teste de propriedade própria se receber valores
    externos. Hoje os selects são alimentados pelo catálogo controlado.
11. **Casos de datas:** soma de anos em 29/02 segue rollover de Date; parsing
    não exige explicitamente o formato exato YYYY-MM-DD. Cobertura atual não
    define a expectativa desses extremos.
12. **Snapshot e documentação:** `home.html` contém snapshot renderizado do
    Next em dev, com referências a chunks; não é fonte de execução nem uma
    landing independente. README, `.spec` e guia de deploy foram atualizados
    nesta revisão para refletir fontes, animações, campos e CTAs reais.

## Como integrar novas features

- Conteúdo e FAQs: começar por `src/data/content.ts`; verificar textos inline
  das seções e metadata para evitar divergências.
- Nova seção: criar componente, compor em `page.tsx`, atualizar navegações e
  preservar tokens, âncoras, semântica e espaçamento.
- Novo prazo: atualizar tipos e catálogo no domínio, cálculo se necessário e
  testes de limites; selects compartilham o catálogo e o contexto.
- Novo tipo de atendimento sem prazo: separar catálogo de casos do catálogo
  de regras; atualmente o formulário depende dos IDs da calculadora.
- Nova página ou blog: adicionar rotas, definir metadata e canonical por
  página, atualizar sitemap e navegação. O canonical global atual é `/`.
- CRM, agendamento, uploads ou leads: definir primeiro fluxo, destino e
  armazenamento; isso amplia a arquitetura e altera a afirmação atual de que
  nada é armazenado no site. Segredos devem ficar no servidor.
- Analytics ou conteúdo externo: definir eventos e serviço necessários,
  considerar privacidade e atualizar CSP conforme a integração concreta.
- Animações: usar variantes compartilhadas e garantir conteúdo acessível
  quando movimento é reduzido ou JavaScript está indisponível.

Antes de escrever código Next, ler o guia pertinente da versão instalada em
`node_modules/next/dist/docs/`, conforme AGENTS.md. Para dúvidas e uso de APIs
de bibliotecas, buscar documentação atual pelo Context7 conforme as instruções
do projeto. Após mudanças relevantes, executar as verificações e validar no
navegador os fluxos afetados em mobile e desktop.
