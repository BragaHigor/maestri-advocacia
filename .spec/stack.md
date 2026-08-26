# Stack técnica

## Produção

| Tecnologia | Versão | Responsabilidade |
| --- | ---: | --- |
| Next.js | 16.3.3 | App Router, build, metadata e otimizações |
| React | 19.2.8 | Componentes e interações |
| TypeScript | 6.0.3 | Tipagem estrita e contratos |
| Tailwind CSS | 4.3.3 | Design system e responsividade |
| Fontsource | 5.3.0 | Cormorant Garamond e Lora auto-hospedadas |

As versões completas ficam fixadas em `package.json` e `package-lock.json`.

## Desenvolvimento e qualidade

- ESLint 9 com `eslint-config-next` e Core Web Vitals;
- Vitest para regras puras de data, prazo e contato;
- PostCSS com `@tailwindcss/postcss`;
- scripts separados para lint, typecheck, testes e build.

## Runtime e deploy

- Node.js 20.9 ou superior;
- deploy alvo: Vercel com framework `nextjs`;
- página e metadados pré-renderizados;
- otimização de imagens executada pelo Next/Vercel;
- sem serviços externos obrigatórios além do destino final WhatsApp/e-mail.

## Design system

Tokens vivem no bloco `@theme` de `src/app/globals.css`: cores, fontes e easing.
Classes compartilhadas de botões, inputs, títulos e containers ficam em
`src/styles/classes.ts`. Animações que não cabem bem em utilitários permanecem no
CSS global.

## Convenções

- imports internos pelo alias `@/`;
- componentes e arquivos em kebab-case; componentes em PascalCase;
- funções e regras puras fora de componentes React;
- Server Components por padrão;
- estado local e client boundaries mínimos;
- UTF-8, LF e indentação de dois espaços.

