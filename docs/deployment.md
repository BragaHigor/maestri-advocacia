# Deploy na Vercel

## Configuração do repositório

vercel.json declara framework nextjs. O script de build é npm run build;
npm start executa o build localmente. Não há output: export ou diretório de
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

package.json exige Node.js >=20.9.0. Escolha no provedor uma versão suportada
compatível com o projeto. Todos os checks devem passar antes de publicar.
Em 18/09/2026, a suíte tem 27 testes, incluindo cinco cenários de medição Ads:
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

CSP autoriza a própria origem e destinos Google para medição Ads; nenhuma
diretiva precisou mudar para o consent mode avançado. A tag carrega em toda
visita, negada por padrão, e só grava cookies após o aceite. Outras integrações exigem revisão. Produção remove unsafe-eval, mantém
inline para scripts/estilos e acrescenta HSTS e upgrade-insecure-requests.

Após deploy, verificar consentimento e evento com Tag Assistant conforme
[Google Ads](google-ads.md). Com o consent mode avançado o script deve estar
presente já na primeira visita, antes de qualquer escolha: sua ausência aí, sim,
indica falha de instalação. Não instalar uma segunda cópia pelo painel.

## Reversão

Mantenha um deploy estável identificado para restaurar pela ferramenta do
provedor caso a publicação apresente regressão. Esta documentação não registra
histórico de deploys ou uma reversão executada.
