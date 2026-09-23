# Arquitetura do projeto

## Visão geral

A aplicação usa Next.js App Router, com home `/` e política `/privacidade`.
O build local de 18/09/2026 pré-renderizou a home e as rotas de metadata.
Não há `output: export`; otimização de imagens utiliza Next/Vercel.
Não existem API própria, banco de dados, autenticação ou persistência de relatos.

`src/app` compõe componentes, que consomem contexto, domínio, conteúdo,
utilitários e configuração. O domínio de prazos depende de utilitários de datas,
sem React ou DOM.

## Camadas e fronteiras de renderização

- `src/app/layout.tsx`: idioma pt-BR, fontes Fontsource, metadata, viewport e
  MotionProvider. `page.tsx`: CaseTypeProvider, JSON-LD, link de acesso ao conteúdo,
  header, oito seções, footer e contatos fixos.
- `src/app/globals.css`: Tailwind, tokens, base, efeitos de botão, marquee,
  pulso de WhatsApp, regras de movimento reduzido e impressão.
- `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`:
  rotas técnicas de SEO e metadata. Manifest não implementa suporte offline.
- `src/components/layout`: header responsivo, footer, barra móvel e botão
  flutuante de WhatsApp.
- `src/components/sections`: composição editorial, FAQ, formulário e calculadora.
- `src/components/ui`: marca, container, títulos animados, botão, select,
  popover e calendário. Select/popover usam Radix UI; calendário usa Day Picker.
- `src/data/content.ts`: navegações, cards, marquee, sinais, etapas e FAQ.
  Há textos adicionais inline nas seções e no layout.
- `src/config/site.ts`: variáveis públicas e defaults institucionais.
- `src/domain/deadlines`: tipos, catálogo e cálculo puro de prazos.
- `src/lib`: datas, validação/links de contato, variantes Framer Motion e `cn`.
- `src/styles/classes.ts`: classes de layout, tipografia, cards e campos.

Page, layout, footer, contatos fixos, marca, container e JSON-LD não declaram
`use client`. Header, providers, progresso, FAQ, formulário, calculadora,
títulos animados, select, popover e calendário são módulos client.
`landing-sections.tsx` inteiro também declara `use client`, incluindo as seções
editoriais. Componentes importados por módulos client participam dessa fronteira.

## Jornada e navegação

A ordem é hero (`top`), atuação (`atuacao`), sinais (`como-reconhecer`), processo
(`o-caminho`), perfil (`quem-atende`), FAQ (`perguntas-frequentes`), calculadora
(`ferramenta`) e contato (`contato`). Header e footer têm arrays de links separados.

CTAs principais e números exibidos em contato/rodapé navegam para `#contato`.
Só o botão flutuante abre diretamente WhatsApp. E-mail usa mailto; Instagram
no rodapé e LinkedIn do desenvolvedor têm URLs fixas.

## Estado compartilhado

CaseTypeProvider começa calculadora e formulário em `pix`. Selecionar um tipo
compartilhado atualiza os dois. `outro` existe apenas no formulário e mantém a
última seleção da calculadora. As datas são estados locais independentes.

## Calculadora

O catálogo define `pix` (80 dias), `cartao` (10 dias antes do vencimento),
`compraonline` (7 dias), `vicio30` (30 dias), `vicio90` (90 dias) e `reparacao`
(5 anos). São valores implementados, sujeitos à confirmação jurídica individual.

`calculateDeadline(rule, inputValue, now)` retorna número, unidade, progresso,
tom, título e texto. Processa entrada vazia/inválida, data futura nas regras
contadas do fato, prazo vigente, urgente e vencido. Cartão permite vencimento
futuro e calcula antecedência. Zero dias é data-limite hoje com tom warning em
todas as regras; as regras contadas do fato só mostram atraso no dia seguinte.

A interface memoriza o resultado por regra/data e não tem atualização automática
na virada do dia. Trocar tipo mantém a data selecionada. O CTA do resultado
apenas leva ao formulário: não envia data ou resultado nem cria mensagem
contextual. Os selects da calculadora e do formulário compartilham o catálogo.

Datas são locais; diferença de dias converte componentes de calendário para
UTC. Soma de anos segue o comportamento de Date, inclusive rollover em 29/02.

## Contato

O formulário valida quatro campos obrigatórios: nome, telefone, data do ocorrido
e relato. Nome aceita 2 a 80 caracteres sem números; relato aceita 20 a 1500
caracteres com alguma letra/número. Telefone tem máscara brasileira e aceita
celular ou fixo. Data não pode estar no futuro. O foco vai ao primeiro erro.

Nome/telefone/relato são lidos de FormData. Tipo e data usam campos hidden
controlados. A mensagem inclui nome, telefone, tipo, data e relato. Texto é
normalizado em NFKC, tem controles removidos e é limitado a 3500 caracteres
pelo helper de sanitização. URLs usam encodeURIComponent ou URLSearchParams.

Destino `email` chama `window.location.assign` com mailto; WhatsApp chama
`window.open` com wa.me. O formulário preserva os campos após tentar abrir o
aplicativo, sem confirmação de envio/recebimento. Após uma tentativa válida,
oferece nova abertura, que revalida e usa os dados atuais, e limpeza manual.
As ações são botões `submit` e `reset`, exibidos após a primeira tentativa
válida de abrir o canal. Continuam disponíveis durante a revisão dos campos;
erros de validação impedem a nova abertura. A limpeza oculta essas ações.
Limpar restaura o tipo Pix (também na calculadora), apaga data, relato, contador
e erros, fecha calendário e foca nome. Se o número for rejeitado, exibe aviso e
preserva os campos. Não há persistência em storage ou envio ao servidor do site.

Mensagem de WhatsApp atual:

> Prontinho! Abrimos o WhatsApp com sua mensagem já preenchida — é só confirmar
> o envio por lá. Seus dados continuam aqui. Se não abrir, tente novamente abaixo.

E-mail segue a mesma estrutura, citando o aplicativo correspondente. O aviso
não confirma entrega. Os dados são mantidos apenas na página atual; recarregar
ou fechar não oferece recuperação implementada pelo site.

Os botões “Abrir novamente o WhatsApp/e-mail” e “Limpar formulário” ocupam
largura total em uma coluna até 520 px e duas colunas a partir de 521 px.

## Movimento, FAQ e acessibilidade

Framer Motion aplica variantes de entrada, stagger e animação por visibilidade.
ScrollProgress usa useScroll/useSpring; header acompanha scrollY para reduzir
altura após 40 px. Não há componente MotionEffects, contadores ou parallax.

MotionProvider usa reducedMotion="user" em produção e "never" em desenvolvimento.
CSS reduzido desliga rolagem suave, brilho e pulso do WhatsApp, mas não o marquee.
Variantes de entrada começam com opacity 0, sem fallback explícito para ausência
de JavaScript. Visibilidade sem JS não foi validada nesta revisão.

FAQ usa details/summary com name para exclusividade; seus wrappers são animados.
Há link de pular para o conteúdo, labels, foco visível e mensagens de estado/erro.
Menu móvel foca o primeiro link ao abrir; fecha por link, Escape ou resize para
>=1220 px. O listener de Escape é global e tenta focar o toggle mesmo com menu
fechado, ponto a revisar em conjunto com popovers/selects.

## Responsividade

Até 520 px há layouts compactos; a partir de 521 px alguns grids expandem.
A partir de 880 px hero, conteúdo dividido, perfil, calculadora e contato usam
colunas. A partir de 1220 px há navegação desktop e a barra móvel fica oculta.
Há ajustes adicionais em 520/621 px. Esses limites foram lidos do código;
esta revisão não comprova ausência de overflow em todo o site. O formulário
foi inspecionado em desktop e emulação mobile; detalhes no diagnóstico.

## Configuração e segurança

Defaults e regras de parsing estão em site.ts e descritos no README.
Variáveis NEXT_PUBLIC são públicas e incorporadas ao build.
JSON-LD usa dados controlados, escapa `<` e fixa areaServed em Brasil.

next.config.ts define CSP, Referrer-Policy, nosniff, bloqueio de frames,
DNS-prefetch off, COOP e Permissions-Policy. CSP permite inline em scripts e
estilos; unsafe-eval só em desenvolvimento. Produção acrescenta HSTS e
upgrade-insecure-requests. Conexões autorizam a própria origem e os destinos
Google necessários ao Ads; novas
integrações exigem revisar diretivas. Headers foram inspecionados no código,
não verificados na resposta de um deploy nesta revisão.

## Manutenção

`src/lib/ads.ts` centraliza o snippet de consentimento, a atualização de estado e o
evento de tentativa de contato. `MeasurementTag` renderiza, no layout raiz e com
`beforeInteractive`, o bootstrap inline e o gtag.js: consent mode avançado, tag
presente em toda visita e negada até o aceite. `MeasurementConsent` apenas decide a
exibição do aviso e aplica mudanças de escolha; escolhas ficam
em localStorage por 180 dias, e sessionStorage limita o evento a um por visita.
Formulário validado e botão flutuante usam o mesmo evento, sem campos pessoais.
`CookiePreferences` permite reabrir as escolhas na política de privacidade.
Não há conversão de visita, GA4 ou campos monetários no evento.
Veja [integração Ads](../docs/google-ads.md) para limites e validação.

Consulte [stack](stack.md), [diagnóstico](analysis.md) e
[contexto de features](../docs/project-context.md). Leia o guia relevante de
node_modules/next/dist/docs antes de escrever código Next, conforme AGENTS.md.
