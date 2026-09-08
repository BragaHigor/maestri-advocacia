# Mapeamento das correções de motion e tipografia

Este documento foi produzido a partir de `git diff --cached` e descreve somente as alterações presentes em **Staged Changes**. Ele serve como guia para reaplicar as correções em outra branch sem precisar transportar, por engano, toda a mudança de tema claro que está no mesmo staging.

## Resumo objetivo

- **Motion:** a animação `maskUp` deixou de animar `clip-path`. Agora ela usa apenas `opacity` e deslocamento vertical (`y`).
- **Fontes:** o staging **não adiciona uma nova família, pacote ou arquivo de fonte**. As famílias continuam sendo **Bodoni Moda** para títulos e **Manrope** para corpo/interface.
- **Tipografia:** o texto selecionado na calculadora deixa de encolher dinamicamente e passa a quebrar linha; telefone e e-mail da seção de contato deixam de usar a fonte de título e ficam menores.
- **Cores de texto:** vários destaques tipográficos mudam de `gold-bright`/`gold` para `gold-deep`. Isso pertence principalmente à adaptação de contraste para o tema claro, não à troca de fonte.

## 1. Correção de motion

### Arquivo alterado

`src/lib/motion.ts`

### Alteração

Antes, `maskUp` combinava opacidade, deslocamento e recorte:

```ts
export const maskUp: Variants = {
  hidden: { opacity: 0, y: 16, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 -6% 0)",
    transition: { duration: 0.75, ease: EASE },
  },
};
```

Depois da correção:

```ts
export const maskUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
```

### Efeito prático

- elimina o recorte criado por `clip-path` durante a entrada;
- evita que partes das letras, especialmente ascendentes/descendentes e fontes serifadas, sejam cortadas;
- mantém a mesma sensação de entrada: `opacity: 0 → 1`, `y: 16 → 0`, duração de `0.75s` e a mesma curva `EASE`;
- não altera `fadeUp`, `fadeUpSmall`, `fadeIn`, `staggerContainer` ou `VIEWPORT`.

### Onde a correção aparece

No staging, `maskUp` continua aplicado ao título principal (`motion.h1`) em `src/components/sections/landing-sections.tsx`. Não foi necessário alterar o componente consumidor: a correção é centralizada no variant.

## 2. Famílias de fontes existentes

Não há inclusão ou substituição de fontes no diff staged. A branch já possui estas importações em `src/app/layout.tsx`:

```ts
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/bodoni-moda/500-italic.css";
import "@fontsource/bodoni-moda/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
```

Os tokens também já existiam em `src/app/globals.css` e permanecem iguais:

```css
--font-heading: "Bodoni Moda", Didot, "Times New Roman", serif;
--font-body: "Manrope", Arial, sans-serif;
```

Portanto, ao aplicar em outra branch:

- confirme que os pacotes `@fontsource/bodoni-moda` e `@fontsource/manrope` estão instalados;
- mantenha os pesos `400`, `500` e `600` importados;
- use `font-heading` para Bodoni Moda e `font-body` para Manrope.

## 3. Correções tipográficas

### 3.1 Ferramenta — campo “Qual problema você está enfrentando?”

Arquivos envolvidos:

- `src/components/sections/deadline-calculator.tsx`
- `src/hooks/use-fit-text.ts` — removido integralmente

O campo exibido na seção **Ferramenta**, abaixo do rótulo **“Qual problema você está enfrentando?”**, é um `Select` (e não um `<input>` nativo). A correção foi feita especificamente no `SelectTrigger` de id `calc-tipo`, que mostra `rule.optionLabel`.

#### Problema anterior

O gatilho obrigava todo o valor a ficar em uma única linha com `whitespace-nowrap`. O span interno também usava `truncate`, ocultando parte do texto quando necessário. Para compensar, `useFitText` media o overflow no navegador e diminuía progressivamente o tamanho da fonte — em passos de `0.5px`, podendo chegar a apenas `6px`.

Além da perda de legibilidade, isso tornava a apresentação dependente de medição do DOM, `ResizeObserver`, evento de resize e do carregamento assíncrono das fontes.

#### Correções aplicadas

Mudanças necessárias:

1. Remover `useRef` do import de React.
2. Remover o import e a chamada de `useFitText`.
3. Remover `valueRef`.
4. Trocar `whitespace-nowrap` por `whitespace-normal` no gatilho do select.
5. Trocar o span de `truncate` para quebra normal de linha.
6. Excluir o hook `src/hooks/use-fit-text.ts` se ele não tiver outros consumidores.

Classe do gatilho antes:

```tsx
const selectTriggerClass =
  "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 text-left font-body text-base text-paper whitespace-nowrap shadow-none outline-none transition-colors hover:border-paper/30 focus-visible:border-gold focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold data-[state=open]:border-gold";
```

Classe do gatilho depois:

```tsx
const selectTriggerClass =
  "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 text-left font-body text-base text-paper whitespace-normal shadow-none outline-none transition-colors hover:border-paper/30 focus-visible:border-gold focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold data-[state=open]:border-gold";
```

A alteração efetiva nessa classe é:

```diff
- whitespace-nowrap
+ whitespace-normal
```

O `SelectTrigger` também mantém explicitamente a altura automática para crescer quando o valor ocupar duas ou mais linhas:

```tsx
<SelectTrigger
  id="calc-tipo"
  className={selectTriggerClass}
  style={{ height: "auto" }}
>
```

Trecho final do valor:

```tsx
<span className="min-w-0 flex-1 text-left whitespace-normal">
  {rule.optionLabel}
</span>
```

O hook removido reduzia a fonte em passos de `0.5px`, até o mínimo de `6px`, enquanto houvesse overflow. A nova solução preserva o tamanho legível e permite que rótulos longos ocupem mais de uma linha.

#### O que permanece igual

- fonte do controle: `font-body` (**Manrope**);
- tamanho: `text-base`;
- altura mínima: `min-h-[52px]`;
- espaçamento interno: `px-[15px] py-3`;
- opções provenientes de `deadlineOptions` e valor proveniente de `rule.optionLabel`;
- comportamento de seleção e validação por `isDeadlineId`;
- largura máxima do menu: `max-w-[min(92vw,32rem)]`.

#### Resultado esperado

- o texto selecionado aparece por inteiro;
- rótulos longos quebram naturalmente em mais de uma linha;
- o controle aumenta sua altura sem comprimir a fonte;
- o tamanho tipográfico fica consistente entre as opções;
- não há mais JavaScript de medição ou redimensionamento de fonte para esse campo.

### 3.2 Contato: telefone e e-mail

Arquivo: `src/components/sections/landing-sections.tsx`

Antes:

```txt
font-heading text-lg font-normal ... min-[521px]:text-xl
```

Depois:

```txt
text-[12.5px] font-normal ...
```

Resultado:

- remove `font-heading`, fazendo os valores herdarem a fonte de corpo (**Manrope**);
- reduz o tamanho de `text-lg`/`text-xl` para `12.5px` em todos os breakpoints;
- mantém `overflow-wrap:anywhere` e `min-[521px]:whitespace-nowrap`.

Essa é a única mudança staged que troca efetivamente a família aplicada a um conteúdo: de Bodoni Moda para a fonte corporal herdada.

## 4. Estilização de texto ligada ao tema claro

As mudanças abaixo não alteram família ou peso. Elas criam variantes escuras para melhorar o contraste sobre fundos claros:

```css
--color-gold-deep: #8d670a;
--color-warning-deep: #a9701a;
--color-alert-deep: #b14a30;
```

Principais substituições:

| Uso | Antes | Depois |
| --- | --- | --- |
| Destaques, kickers, links e hover | `text-gold-bright` | `text-gold-deep` |
| Numeração do processo | `text-gold/60` | `text-gold-deep/60` |
| Estado normal da calculadora | `text-gold-bright` | `text-gold-deep` |
| Aviso da calculadora | `text-warning` | `text-warning-deep` |
| Alerta e erros do formulário | `text-alert` | `text-alert-deep` |
| Check do select e controles do calendário | `text-gold` | `text-gold-deep` |
| Foco de inputs e botão flutuante | `outline-gold` | `outline-gold-deep` |

Arquivos atingidos:

- `src/app/globals.css`
- `src/components/layout/footer.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/whatsapp-float.tsx`
- `src/components/sections/contact-form.tsx`
- `src/components/sections/deadline-calculator.tsx`
- `src/components/sections/faq.tsx`
- `src/components/sections/landing-sections.tsx`
- `src/components/ui/brand.tsx`
- `src/components/ui/calendar.tsx`
- `src/components/ui/select.tsx`
- `src/styles/classes.ts`

> Atenção: leve essas trocas para outra branch somente se ela também usar o novo tema claro. No tema escuro anterior, `gold-bright`, `warning` e `alert` podem oferecer contraste mais adequado.

## 5. Ativo visual relacionado à tipografia da marca

Foi adicionado:

`public/assets/brand/maestri-nome-escuro.svg`

Características:

- wordmark “Maestri” convertido em paths SVG;
- preenchimento `#1c140b`;
- dimensões/viewBox equivalentes ao ativo nominal existente (`1000 × 152.35`).

Em `src/components/ui/brand.tsx`, o nome muda de:

```txt
/assets/brand/maestri-nome-creme.svg
```

para:

```txt
/assets/brand/maestri-nome-escuro.svg
```

Também o monograma passa de `maestri-monograma-fundo-escuro.svg` para `maestri-monograma.svg`. Essas substituições são próprias do fundo claro e não representam carregamento de uma nova webfont.

## 6. Checklist para aplicar em outra branch

### Apenas a correção de motion

- atualizar somente `maskUp` em `src/lib/motion.ts`;
- confirmar visualmente que o H1 entra sem recorte;
- testar com `prefers-reduced-motion`, conforme o provider já existente.

### Motion + correções tipográficas

- aplicar a mudança de `maskUp`;
- remover `useFitText` da calculadora;
- permitir quebra de linha no SelectTrigger e no span do valor;
- excluir `src/hooks/use-fit-text.ts` após verificar que não há outros imports;
- ajustar telefone/e-mail para a fonte de corpo e `12.5px`.

### Se a branch também receber o tema claro

- adicionar os tokens `gold-deep`, `warning-deep` e `alert-deep`;
- aplicar as substituições de cor listadas acima;
- copiar `maestri-nome-escuro.svg` e atualizar os ativos da marca;
- transportar também os novos tokens base de tema, `viewport`, `manifest` e demais ajustes de contraste presentes no staging.

## 7. Validações recomendadas

- H1 do hero sem letras cortadas no início e no fim da animação.
- Rótulos longos da calculadora quebrando linha sem reduzir a fonte.
- Select com altura automática e ícone alinhado quando houver duas linhas.
- Telefone e e-mail legíveis em larguras menores e maiores que `521px`.
- Ausência de imports para `@/hooks/use-fit-text` após excluir o arquivo.
- Contraste dos tons `*-deep` somente em superfícies claras.
