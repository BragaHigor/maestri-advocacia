# Stack técnica

Referência: package.json e package-lock.json, revisão em 18/09/2026.
Versões sem prefixo são fixadas no manifesto; `^` permite atualizações compatíveis.
O lockfile registra a resolução usada por npm ci.

## Dependências de produção

| Pacote | Versão declarada | Uso |
| --- | --- | --- |
| next | 16.3.3 | App Router, renderização, metadata e imagens |
| react / react-dom | 19.2.8 | Componentes e interações |
| @fontsource/bodoni-moda | ^5.3.0 | Fonte de títulos auto-hospedada |
| @fontsource/manrope | ^5.3.0 | Fonte de corpo auto-hospedada |
| framer-motion | ^13.2.0 | Entradas, stagger, rolagem e movimento reduzido |
| radix-ui | ^1.6.7 | Select, popover e Slot de botão |
| react-day-picker | ^10.0.1 | Calendários |
| date-fns | ^4.4.0 | Locale pt-BR dos calendários |
| lucide-react | ^1.34.0 | Ícones |
| class-variance-authority | ^0.7.1 | Variantes de botão |
| clsx | ^2.1.1 | Composição condicional de classes |
| tailwind-merge | ^3.6.0 | Resolução de conflitos de classes |

## Desenvolvimento

| Pacote | Versão declarada |
| --- | --- |
| typescript | 6.0.3 |
| tailwindcss / @tailwindcss/postcss | 4.3.3 |
| postcss | 8.5.26 |
| eslint | 9.39.5 |
| eslint-config-next | 16.3.3 |
| vitest | 4.1.11 |
| @types/node | 26.3.0 |
| @types/react | 19.2.18 |
| @types/react-dom | 19.2.5 |

TypeScript usa strict, moduleResolution bundler, JSX react-jsx e alias @/* para
src/*. ESLint compõe configurações Next Core Web Vitals e TypeScript.
Vitest usa ambiente node e inclui src/**/*.test.ts; há três arquivos de testes,
para datas, contato e cálculo. Não há suíte DOM/E2E ou workflow CI versionado.
PostCSS carrega @tailwindcss/postcss.

## Runtime e publicação

package.json exige Node.js >=20.9.0 e não fixa versão de npm.
vercel.json declara framework nextjs. O build atual pré-renderiza home e
metadata; não há exportação estática configurada. Next/Vercel otimiza imagens.
Não há banco, SDK de CRM, serviço de envio de e-mail, autenticação ou analytics.
WhatsApp e aplicativo de e-mail são destinos externos abertos pelo navegador.

## Interface e convenções

Tokens de cores, fontes, easing e mapeamento da interface vivem no @theme de
globals.css. Classes compartilhadas estão em styles/classes.ts. CSS implementa
marquee, pulso e brilho; Framer Motion implementa entradas e progresso.

components.json configura estilo new-york-v4, TypeScript, RSC, Lucide e aliases.
Os componentes são arquivos locais; não existe dependência chamada shadcn/ui.
O alias @/hooks está declarado nessa configuração, mas src/hooks não existe.

Código interno usa alias @/, arquivos kebab-case e componentes PascalCase.
Regras de cálculo ficam fora de React. As fronteiras client atuais incluem todas
as seções de landing-sections.tsx; consulte [arquitetura](architecture.md).
