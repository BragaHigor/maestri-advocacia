# Deploy na Vercel

## Configuração do repositório

vercel.json declara framework nextjs. O script de build é npm run build;
npm start serve localmente o build já gerado. Não há output: export ou diretório de
saída personalizado em next.config.ts. A página e metadata são pré-renderizadas;
imagens usam otimização Next/Vercel.

Este guia descreve preparação e verificação; não comprova publicação realizada
nem valores existentes no ambiente Vercel.

## Preparação local

```powershell
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

package.json exige Node.js ^20.19.0 ou >=22.12.0. Escolha no provedor uma versão suportada
compatível com o projeto. Todos os checks devem passar antes de publicar.
Em 01/10/2026 passaram lint, typecheck, build e 45 testes em seis arquivos
após a feature de cidade/estado. A suíte inclui localidade, Ads,
consentimento e GA4:
veja [diagnóstico](../.spec/analysis.md).

Importe o repositório na Vercel, mantendo a raiz deste projeto e o framework
Next.js. Preserve o comando npm run build. Não adicione Output Directory manual
para simular uma exportação que o projeto não configura.

## Variáveis públicas

Use .env.example como modelo local apenas quando .env ainda não existir.
O modelo contém exemplos que devem ser substituídos. Confira no ambiente do
provedor os valores destinados a produção e preview.

| Variável | Default do código quando ausente |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | https://www.maestriadv.com.br |
| NEXT_PUBLIC_WHATSAPP | 5516974075767 |
| NEXT_PUBLIC_PHONE_DISPLAY | (16) 97407-5767 |
| NEXT_PUBLIC_CONTACT_EMAIL | contato.maestriadv@gmail.com |
| NEXT_PUBLIC_OAB | OAB/SP 511954-SP |
| NEXT_PUBLIC_OFFICE_LOCATION | Atendimento 100% online |
| NEXT_PUBLIC_SERVICE_AREA | Todo o Brasil |
| NEXT_PUBLIC_CONTACT_DESTINATION | whatsapp |

URL inválida ou sem HTTPS usa default, exceto hostname localhost. E-mail inválido
usa default. Só o valor exato email muda o formulário para mailto; demais valores
usam WhatsApp. Número configurado é normalizado para dígitos. A validação do link
não confirma conta real nem bloqueia todo número de exemplo.

Esses dados entram no bundle no build; alterações exigem novo deploy.
Nunca use NEXT_PUBLIC para credenciais. .env está ignorado no Git.
Telefone exibido e número de destino são variáveis independentes: mantenha ambos
coerentes. O botão flutuante permanece WhatsApp mesmo com formulário por e-mail.

Ads (`AW-18438128750`) e GA4 (`G-Z1YCKTT9WK`) usam identificadores fixos em
`src/lib/ads.ts` e `src/config/site.ts`, respectivamente. Não existe
`NEXT_PUBLIC_GA4_ID`; trocar os IDs exige alteração no código e novo deploy.

## Domínio e SEO

Conecte o domínio no provedor e configure NEXT_PUBLIC_SITE_URL com a URL canônica
HTTPS. Faça novo deploy e confira canonical, Open Graph, Twitter, JSON-LD,
/robots.txt, /sitemap.xml, /manifest.webmanifest e /opengraph-image.

O sitemap inclui a home e /privacidade, que define canonical próprio.
O canonical global é /. Para adicionar páginas,
defina metadata por rota. O manifest não fornece funcionamento offline.

## Verificação após publicar

- Abrir site em celular e desktop, conferir imagens, overflow, foco e navegação.
- Conferir links de cada seção, menu móvel, Escape, FAQ, calendário e selects.
- Testar cálculo, sincronização de tipo e datas independentes.
- Conferir cidade/estado obrigatórios: UF primeiro, somente municípios da UF,
  limpeza da cidade ao trocar estado e nomes formatados na mensagem. Testar
  Distrito Federal/Brasília, carregamento, falha/retry e reset dos novos campos.
  Clicar em Cidade bloqueada não deve abrir menu vazio. Conferir barra fina,
  quebra de nomes longos e recuo das setas em mobile/desktop. Rolar a página
  com menu aberto deve fechar a lista sem saltar de volta ao campo; rolar as
  opções deve manter a lista aberta.
  O catálogo vem do pacote local, sem API externa; novos municípios exigem
  atualizar a biblioteca e publicar novamente.
- Testar botão flutuante e formulário com relato fictício; envio precisa ser
  confirmado no aplicativo externo. Para verificar ambos os destinos, usar
  builds/ambientes com o destino correspondente.
- Conferir preservação após tentativa, reabertura com dados editados e limpeza
  manual. Abaixo de 521 px, os botões de reabertura e limpeza são empilhados.
  Verificar que nova tentativa inválida mantém os dados e foca o erro; limpeza
  remove erros, zera contador, restaura tipo Pix e foca nome. Conferir o aviso
  curto, que orienta confirmar o envio no aplicativo e informa dados preservados.
- Conferir que números na seção e rodapé navegam para #contato, comportamento
  atual que não abre diretamente WhatsApp.
- Verificar movimento reduzido e conteúdo com JavaScript indisponível: existem
  limitações conhecidas registradas no diagnóstico.
- Inspecionar headers da resposta: CSP, HSTS, nosniff, bloqueio de frames,
  Referrer-Policy, Permissions-Policy, COOP e DNS-prefetch off.
- Revisar logs do deploy e funcionamento dos canais no domínio HTTPS.

CSP autoriza a própria origem e destinos Google para Ads e GA4, incluindo
subdomínios regionais do Analytics. A tag carrega em toda visita; sem aceite
válido salvo, começa negada. O armazenamento é concedido após o aceite. Outras integrações exigem revisão. Produção remove unsafe-eval, mantém
inline para scripts/estilos e acrescenta HSTS e upgrade-insecure-requests.

Após deploy, verificar consentimento, conversões Ads e page_view do GA4 na
carga inicial e nas trocas de rota, conforme
[Google Ads](google-ads.md). Com o consent mode avançado o script deve estar
presente já na primeira visita, antes de qualquer escolha: sua ausência aí, sim,
indica falha de instalação. Não instalar uma segunda cópia pelo painel.

## Reversão

Mantenha um deploy estável identificado para restaurar pela ferramenta do
provedor caso a publicação apresente regressão. Esta documentação não registra
histórico de deploys ou uma reversão executada.
