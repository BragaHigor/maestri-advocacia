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

O formulário exige nome, WhatsApp, estado, cidade, data do ocorrido e relato.
Escolha o estado antes da cidade; trocar a UF limpa o município. Ambos entram
na mensagem com nomes oficiais, por exemplo `*Cidade:* Ribeirão Preto` e
`*Estado:* São Paulo (SP)`. Os dados são fornecidos por
`@brazilian-utils/brazilian-utils` 2.4.0, com catálogo de municípios carregado
sob demanda da própria aplicação, sem API externa.
Os menus Radix não modais permitem rolar a página e fecham ao rolar o documento.
Cidade permanece bloqueada sem estado, sem abrir menu vazio. As listas têm
barra de rolagem fina e discreta; nomes longos se ajustam à largura do campo.

## Requisitos e execução

`package.json` exige Node.js ^20.19.0 ou >=22.12.0. Use npm compatível com o lockfile
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
├── hooks/               modo de entrada das seções por largura
├── lib/                 datas, contato, medição, animações e classes utilitárias
└── styles/              classes Tailwind compartilhadas
public/assets/           marca, favicons e fotografias
.spec/                   arquitetura, stack e diagnóstico
docs/                    deploy e contexto de manutenção
```

`components.json` configura componentes no estilo shadcn/ui e declara o alias
`@/hooks`, usado por `src/hooks/use-section-entrance.ts`. `home.html` é um
snapshot HTML renderizado em desenvolvimento, com referências a chunks do Next;
não é a fonte da aplicação nem uma versão estática independente.
Esse snapshot é ignorado pelo Git porque pode incluir caminhos locais da máquina.

## Qualidade e publicação

Em 01/10/2026 passaram lint, typecheck, build e 45 testes em seis arquivos. Google Ads
mede tentativas de contato e GA4 mede audiência, com consentimento compartilhado;
veja o documento específico abaixo. Consulte o
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
em [Google Ads e privacidade](docs/google-ads.md). A tag usa consent mode avançado: carrega em toda visita já negada e sem cookies,
e concede armazenamento de anúncios e Analytics após o aceite. Uma escolha
válida salva é aplicada antes do carregamento. O GA4 mede visitas; elas não são
conversões de contato no Ads. O ID GA4 `G-Z1YCKTT9WK` está fixo em
`src/config/site.ts`, sem variável de ambiente.

As entradas de seção são removidas abaixo de 880 px após a hidratação.
Marquee, pulso e progresso de rolagem são independentes dessa largura.
Consulte o diagnóstico para os limites sem JavaScript e durante redimensionamentos.
