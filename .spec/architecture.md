# Arquitetura do projeto

## Visão geral

A aplicação usa Next.js App Router. A única página é pré-renderizada como
conteúdo estático, mas mantém componentes client apenas onde existe interação.
Não há API própria, banco de dados, autenticação ou persistência de relatos.

```text
app -> components -> context/domain/data/lib/config
                    domain -> lib
```

Dependências devem apontar para camadas mais internas. Regras de negócio não
dependem de React nem do DOM.

## Camadas

### `src/app`

- `layout.tsx`: idioma, fontes locais e Metadata API.
- `page.tsx`: composição da landing e providers globais.
- `globals.css`: Tailwind, tokens, base e animações especiais.
- `robots.ts`, `sitemap.ts` e `manifest.ts`: SEO técnico e PWA metadata.
- `opengraph-image.tsx`: imagem social gerada no build.

### `src/components`

- `layout`: cabeçalho, rodapé e CTA fixo.
- `sections`: seções editoriais e ferramentas interativas.
- `ui`: peças reutilizáveis pequenas, sem regra jurídica.

Componentes são Server Components por padrão. Apenas cabeçalho, formulário,
calculadora, efeitos de movimento e provider de sincronização usam
`"use client"`.

### `src/domain/deadlines`

- `types.ts`: contratos da regra e do resultado.
- `data.ts`: seis regras de prazo e textos associados.
- `calculate.ts`: função pura de cálculo e estados de apresentação.

Alterações em quantidade, unidade, termo inicial ou texto jurídico exigem
validação profissional. A interface não deve duplicar essas regras.

### `src/lib`

- `date.ts`: parsing e operações com datas locais de calendário.
- `contact.ts`: normalização de texto e criação segura de `wa.me`/`mailto:`.

### `src/config`

`site.ts` lê diretamente as variáveis públicas, aplica defaults seguros e
restringe URL, e-mail e destino de contato. Dados institucionais nunca devem ser
duplicados nos componentes.

### `src/context`

O provider mantém separadamente a seleção da calculadora e do formulário. Tipos
compartilhados são sincronizados nos dois sentidos; `Outro` existe somente no
formulário e não altera a calculadora.

## Fluxos

### Calculadora

1. o usuário seleciona uma regra e informa a data;
2. `calculateDeadline` recebe regra, valor e data atual;
3. a função retorna número, unidade, progresso, tom e mensagens;
4. o componente renderiza o resultado e cria um CTA contextual codificado.

Casos cobertos: vazio, inválido, futuro, vigente, urgente, limite e vencido.

### Contato

1. o formulário valida os três campos obrigatórios;
2. entradas são normalizadas, caracteres de controle são removidos e o tamanho
   total é limitado;
3. a mensagem é construída apenas no navegador;
4. `URLSearchParams` ou `encodeURIComponent` codifica todo conteúdo;
5. abre-se exclusivamente o e-mail configurado ou `https://wa.me/<número>`.

O projeto não recebe, registra, retransmite nem armazena a mensagem.

### Movimento

`MotionEffects` inicializa revelação com `IntersectionObserver`, contadores,
barra de progresso e parallax com `requestAnimationFrame`. Sem JavaScript, o
conteúdo continua visível. `prefers-reduced-motion` desativa movimento não
essencial.

### FAQ

O FAQ usa `details`/`summary` nativos com o atributo `name`, permitindo teclado,
semântica e funcionamento sem JavaScript, com apenas uma resposta aberta.

## Responsividade

- até 520 px: grids compactos, tipografia e contato ajustados;
- abaixo de 880 px: hero, calculadora, conteúdo dividido, perfil e contato em
  uma coluna;
- abaixo de 1220 px: menu móvel e CTA fixo;
- em 1220 px ou mais: navegação completa no cabeçalho.

O layout foi validado em 390, 520, 879, 880, 1219 e 1220 px sem overflow
horizontal.

## Segurança

- CSP limita scripts, estilos, imagens, fontes, conexões, forms e frames.
- `unsafe-eval` existe somente no desenvolvimento, conforme exigência do React.
- HSTS é enviado em produção.
- `frame-ancestors 'none'` e `X-Frame-Options: DENY` bloqueiam clickjacking.
- MIME sniffing, permissões do navegador e referrer são restringidos.
- não há `dangerouslySetInnerHTML` com entrada do visitante; o único uso contém
  JSON-LD controlado e escapa `<`.
- links externos usam `noopener noreferrer` quando abertos em nova aba.
- nenhuma variável presente no navegador deve ser tratada como segredo.

