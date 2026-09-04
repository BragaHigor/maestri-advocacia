# Arquitetura do projeto

## Visão geral

A aplicação usa Next.js App Router e entrega uma landing page pré-renderizada.
Não há API própria, banco de dados, autenticação ou persistência de relatos.

```text
app -> components -> data/lib/config
```

Componentes são Server Components por padrão. Apenas as interações que dependem
do navegador formam limites cliente.

## Camadas

### `src/app`

- `layout.tsx`: idioma, fontes locais e Metadata API;
- `page.tsx`: composição das seções na ordem da navegação;
- `globals.css`: Tailwind, tokens, estilos-base e animações especiais;
- `robots.ts`, `sitemap.ts` e `manifest.ts`: SEO técnico e PWA metadata;
- `opengraph-image.tsx`: imagem social gerada pelo Next.js.

### `src/components`

- `layout`: header, footer, CTA móvel e atalho de WhatsApp;
- `sections`: conteúdo editorial, FAQ e formulário de contato;
- `ui`: componentes reutilizáveis sem regra de negócio.

`Header`, `ContactForm`, `Select` e `MotionEffects` usam `"use client"` por
necessitarem de estado, eventos ou APIs do navegador. O restante permanece no
servidor.

### `src/data`

`content.ts` é a fonte única dos itens de navegação e dos conteúdos repetitivos.
Os IDs da página seguem a sequência:

```text
#top -> #atuacao -> #compromisso -> #como-funciona ->
#quem-atende -> #perguntas -> #contato
```

### `src/lib`

`contact.ts` normaliza texto e cria URLs seguras de `wa.me` e `mailto:`.

### `src/config`

`site.ts` lê as variáveis públicas, aplica valores padrão e valida URL e e-mail.
Dados institucionais não devem ser duplicados nos componentes.

## Fluxo de contato

1. o formulário valida nome, WhatsApp e relato no dispositivo;
2. os valores são normalizados e têm o tamanho limitado;
3. a mensagem é montada apenas no navegador;
4. `encodeURIComponent` codifica o conteúdo;
5. uma nova aba segura é aberta em `https://wa.me/<número>`.

O projeto não recebe, registra, retransmite nem armazena a mensagem.

## Movimento

`MotionEffects` controla revelação progressiva, barra de leitura e parallax com
`IntersectionObserver` e `requestAnimationFrame`. Sem JavaScript, o conteúdo
permanece visível. `prefers-reduced-motion` reduz movimentos não essenciais.

## Responsividade

- até 520 px: tipografia, botões, formulário e dados profissionais compactos;
- abaixo de 880 px: contato em uma coluna;
- abaixo de 960 px: hero e perfil em uma coluna, cards em até duas colunas;
- abaixo de 1220 px: menu recolhido e CTA fixo;
- em 1220 px ou mais: navegação completa na header.

O deslocamento global de âncoras considera a header sticky, e o menu móvel limita
sua altura à viewport com rolagem própria.

## Segurança e privacidade

- CSP limita scripts, estilos, imagens, fontes, conexões, formulários e frames;
- HSTS é enviado em produção;
- proteção contra clickjacking, MIME sniffing e permissões indevidas;
- JSON-LD controlado escapa o caractere `<`;
- links externos em nova aba usam `noopener noreferrer`;
- nenhuma variável `NEXT_PUBLIC_*` deve conter segredo.
