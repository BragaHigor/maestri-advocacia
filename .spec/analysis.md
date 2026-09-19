# Diagnóstico atual

Revisão local de 18/09/2026, baseada no código e comandos executados.

## Implementação existente

Landing com uma página, oito seções, menu responsivo, FAQ, calculadora com seis
regras e formulário que prepara mensagens para WhatsApp/mailto no navegador.
Não há backend próprio, persistência de relatos ou autenticação. Há política
/privacidade e Google Ads com consentimento; não há Google Analytics.

Há separação de domínio, conteúdo, configuração e interface; TypeScript estrito;
fontes Bodoni Moda/Manrope auto-hospedadas; Framer Motion; calendários Day Picker;
select/popover Radix; SEO técnico e headers em next.config.ts.

## Verificação executada

| Comando | Resultado em 18/09/2026 |
| --- | --- |
| npm run lint | Passou, sem diagnósticos |
| npm run typecheck | Passou |
| npm test | 27 testes passaram, em 4 arquivos |
| npm run build | Passou; home e rotas de metadata pré-renderizadas |

A saída lista `/`, `/_not-found`, `/manifest.webmanifest`, `/opengraph-image`,
`/privacidade`, `/robots.txt` e `/sitemap.xml`. A geração informou 8/8 páginas;
isso inclui rotas técnicas.

O teste de contato usa mock de siteConfig com telefone e e-mail fixos, sem
depender dos dados institucionais. Cinco novos cenários verificam o dia limite
e o primeiro dia de atraso das regras contadas do fato, incluindo a regra em anos.

O fluxo WhatsApp foi verificado no navegador em desktop e emulação mobile:
preservação de campos, nova tentativa com relato editado, validação de relato
curto e limpeza com remoção de erros/contador e retorno do foco ao nome.
Inspeção em 390 px identificou botões estreitos; o layout foi ajustado para
empilhar ações abaixo de 521 px e conferido no build final em 320 px.
A mensagem foi encurtada, mantendo “Prontinho!” e orientações sobre confirmação
no aplicativo, dados preservados e nova tentativa. Em 320 px, os dois botões
foram conferidos empilhados, com largura total e acesso por rolagem; nova
tentativa com relato curto mostrou erro, e limpeza removeu erro e contador.

Não foram executados auditoria npm, medições de performance,
validação jurídica, envio real de contato ou inspeção de headers em produção.
Não foi verificada abertura do aplicativo de e-mail nem utilizado celular físico.
Não afirmar ausência de vulnerabilidades, overflow global ou erros de console com base
nesta revisão. Não há suíte de componentes/E2E ou workflow de CI versionado.

## Pontos de atenção confirmados no código

- Números de WhatsApp na seção contato e rodapé apontam para #contato; só o
  flutuante abre diretamente o canal. O destino de formulário não altera o float.
- Formulário exige quatro campos: nome, telefone, data e relato. Preserva os
  campos após abrir o aplicativo externo, oferece nova tentativa com dados
  atuais e limpeza manual. Não confirma abertura/envio nem persiste em storage.
- Todas as regras mostram data-limite hoje quando restam zero dias, com tom
  warning. Regras contadas do fato só mostram vencimento quando o saldo é negativo.
- Tipo é compartilhado entre calculadora/formulário; datas não são. Trocar tipo
  mantém a data da ferramenta, inclusive entre vencimento e data do fato.
- Resultado da ferramenta usa useMemo por regra/data, sem atualização na virada
  do dia; CTA não transfere data/resultado nem compõe mensagem contextual.
- Variantes Framer Motion começam com opacity 0, sem fallback explícito sem JS.
  Visibilidade e acessibilidade completas requerem teste no navegador.
- CSS de movimento reduzido não interrompe marquee. MotionProvider respeita
  preferência em produção, mas usa never em desenvolvimento.
- Escape global do header tenta focar toggle com menu fechado e pode interferir
  em popovers/selects.
- WhatsApp só rejeita formato inválido e padrão de zeros: o exemplo numérico
  de .env.example é aceito. A validação não confirma conta existente.
- isDeadlineId usa operador in, que também aceita propriedades herdadas;
  selects atuais fornecem valores controlados.
- Datas somadas em anos seguem rollover de Date em 29/02; parsing não exige
  explicitamente formato exato YYYY-MM-DD. Os testes não definem esses extremos.
- Seções editoriais estão no módulo client de landing-sections.tsx por animação.
- areaServed do JSON-LD é Brasil fixo; serviceArea configura texto do perfil.
- home.html é snapshot Next em desenvolvimento, não fonte de execução.

## Antes de publicar ou ampliar

Conferir dados institucionais e domínio configurados; defaults do código já
contêm dados concretos, enquanto .env.example mantém exemplos. Esta revisão não
inspecionou valores de .env nem comprova o ambiente de produção.

Validar conteúdo jurídico e prazos com a pessoa responsável, definir privacidade
do atendimento posterior e verificar os fluxos
em mobile/desktop e os canais no domínio HTTPS. Novas integrações devem considerar
CSP e a informação atual de que o site não armazena relatos.

A lista detalhada de pontos de extensão está em
[docs/project-context.md](../docs/project-context.md).
