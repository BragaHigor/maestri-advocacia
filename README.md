# Maestri Advocacia

Landing page institucional para Direito do Consumidor e fraudes bancárias,
construída com Next.js App Router, React, TypeScript e Tailwind CSS. Inclui
conteúdo editorial, calculadora informativa de prazos e formulário que prepara
mensagens para WhatsApp ou e-mail no dispositivo do visitante.

Não há API própria, banco de dados, autenticação, CMS ou armazenamento
de relatos. A confirmação do envio acontece no aplicativo externo.
Os campos permanecem preenchidos após a tentativa; o visitante pode abrir
novamente com os dados atuais ou limpar o formulário manualmente. No mobile,
essas ações ocupam a largura inteira, uma abaixo da outra.
Elas aparecem após uma tentativa válida de abrir o canal. A nova tentativa
valida os campos editados; a limpeza apaga os dados e restaura o tipo Pix.
Não há recuperação de dados implementada pelo site após recarregar ou fechar.

## Requisitos e execução

`package.json` exige Node.js >=20.9.0. Use npm compatível com o lockfile
versionado; o projeto não declara versão obrigatória de npm.

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Acesse `http://localhost:3000`. Copie o modelo somente se ainda não houver `.env`,
para preservar sua configuração local.

## Configuração

As variáveis abaixo são públicas e incorporadas ao build. Alterações no ambiente
de produção exigem novo build/deploy. `.env` está ignorado no Git.

| Variável | Default em `src/config/site.ts` |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.maestriadv.com.br` |
| `NEXT_PUBLIC_WHATSAPP` | `5516974075767` |
| `NEXT_PUBLIC_PHONE_DISPLAY` | `(16) 97407-5767` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contato.maestriadv@gmail.com` |
| `NEXT_PUBLIC_OAB` | `OAB/SP 511954-SP` |
| `NEXT_PUBLIC_OFFICE_LOCATION` | `Atendimento 100% online` |
| `NEXT_PUBLIC_SERVICE_AREA` | `Todo o Brasil` |
| `NEXT_PUBLIC_CONTACT_DESTINATION` | `whatsapp` |

O modelo `.env.example` contém exemplos, não os defaults acima. Confira os dados
antes de usá-lo. URL inválida ou sem HTTPS retorna ao default, exceto quando o
hostname é `localhost`. E-mail inválido retorna ao default. Destino só seleciona
e-mail quando o valor é exatamente `email`; qualquer outro valor usa WhatsApp.

O número configurado tem caracteres não numéricos removidos. O helper de link
aceita prefixo 55 e 10 ou 11 dígitos seguintes, rejeitando o padrão de zeros.
Não verifica existência da conta nem bloqueia todos os números de exemplo:
`5511999999999` do modelo é aceito.

Header, hero, calculadora e barra móvel levam à seção `#contato`. Os números no
contato e rodapé também apontam para essa seção. O botão flutuante abre WhatsApp
diretamente e é omitido se o helper rejeitar o número. O destino configurável
altera apenas o formulário.

## Comandos

```powershell
npm run dev        # next dev
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm test           # vitest run
npm run build      # next build
npm start          # next start, após build
```

## Estrutura

```text
src/
├── app/                 página, layout, metadata e estilos globais
├── components/          layout, seções e interface reutilizável
├── config/              dados institucionais e destino de contato
├── context/             sincronização de tipo de caso
├── data/                conteúdo editorial estruturado
├── domain/deadlines/    regras e cálculo puro de prazos
├── lib/                 datas, contato, animações e classes utilitárias
└── styles/              classes Tailwind compartilhadas
public/assets/           marca, favicons e fotografias
.spec/                   arquitetura, stack e diagnóstico
docs/                    deploy e contexto de manutenção
```

`components.json` configura componentes no estilo shadcn/ui e declara o alias
`@/hooks`, mas não existe diretório `src/hooks` atualmente. `home.html` é um
snapshot HTML renderizado em desenvolvimento, com referências a chunks do Next;
não é a fonte da aplicação nem uma versão estática independente.

## Qualidade e publicação

Em 18/09/2026, os 27 testes passaram. A integração Google Ads inclui consentimento
e medição da tentativa de contato; veja o documento específico abaixo. Consulte o
[diagnóstico](.spec/analysis.md) para detalhes e limites da revisão.

Antes de publicar, confira dados institucionais, domínio e canais reais;
valide conteúdo e prazos com a pessoa responsável e revise a política em
`/privacidade`, inclusive a identificação legal e as práticas do atendimento
posterior. Execute os quatro comandos de qualidade e verifique os
fluxos no navegador em mobile e desktop.

Referências: [arquitetura](.spec/architecture.md), [stack](.spec/stack.md),
[contexto para novas features](docs/project-context.md) e
[deploy](docs/deployment.md).

A preparação de medição, os dados necessários da conta e as pendências estão
em [Google Ads e privacidade](docs/google-ads.md). A tag carrega após consentimento;
não há Google Analytics ou medição de visita como conversão.
