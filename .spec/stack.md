# Stack técnica

Referência: package.json e package-lock.json, revisão documental em 01/10/2026.
Versões sem prefixo são fixadas no manifesto; `^` permite atualizações compatíveis.
O lockfile registra a resolução usada por npm ci.

## Dependências de produção

| Pacote | Versão declarada | Uso |
| --- | --- | --- |
| @brazilian-utils/brazilian-utils | 2.4.0 | Estados e municípios IBGE, com catálogo local carregado sob demanda |
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
Vitest usa ambiente node e inclui src/**/*.test.ts; há seis arquivos de testes,
para datas, contato, localidade, cálculo, medição/consentimento e configuração GA4.
Em 01/10/2026 passaram 45 testes. Não há suíte DOM/E2E ou workflow CI versionado.
PostCSS carrega @tailwindcss/postcss.

## Runtime e publicação

package.json exige Node.js ^20.19.0 ou >=22.12.0 e não fixa versão de npm.
vercel.json declara framework nextjs. O build atual pré-renderiza home e
metadata; não há exportação estática configurada. Next/Vercel otimiza imagens.
Não há banco, SDK de CRM, serviço de envio de e-mail ou autenticação.
Ads e GA4 compartilham uma gtag.js, sem pacote npm, em consent mode avançado.
Ela carrega em toda visita: sem escolha válida ou com recusa começa negada;
um aceite válido salvo é aplicado antes do carregamento. O aceite concede
ad_storage, ad_user_data e analytics_storage; ad_personalization segue negado.
GA4 usa G-Z1YCKTT9WK fixo em src/config/site.ts, sem variável de ambiente.
WhatsApp e aplicativo de e-mail são destinos externos abertos pelo navegador.

## Interface e convenções

Tokens de cores, fontes, easing e mapeamento da interface vivem no @theme de
globals.css. Classes compartilhadas estão em styles/classes.ts. CSS implementa
marquee, pulso e brilho; Framer Motion implementa entradas e progresso.

components.json configura estilo new-york-v4, TypeScript, RSC, Lucide e aliases.
Os componentes são arquivos locais; não existe dependência chamada shadcn/ui.
O alias @/hooks está declarado nessa configuração e é usado por
src/hooks/use-section-entrance.ts para controlar as entradas por largura e por
src/hooks/use-contact-location.ts para gerenciar UF, município e carregamento.

Código interno usa alias @/, arquivos kebab-case e componentes PascalCase.
Regras de cálculo ficam fora de React. As fronteiras client atuais incluem todas
as seções de landing-sections.tsx; consulte [arquitetura](architecture.md).
