# Instruções do projeto Maestri Advocacia

Leia `.spec/architecture.md`, `.spec/stack.md` e `.spec/analysis.md` antes de
alterar o código. Para APIs do Next instalado, consulte também a documentação em
`node_modules/next/dist/docs`.

## Arquitetura

- Preserve Next.js App Router, TypeScript estrito e Tailwind CSS.
- Use Server Components por padrão e `"use client"` apenas para interação.
- Mantenha regras jurídicas puras em `src/domain`, sem React ou DOM.
- Centralize dados institucionais em `src/config/site.ts` e conteúdo repetitivo em
  `src/data`.
- Não crie API, persistência, analytics ou nova dependência sem necessidade
  explícita.
- Não use `dangerouslySetInnerHTML` com entrada externa.

## Interface

- Preserve conteúdo, identidade visual, breakpoints e comportamento existentes.
- Mantenha um único `h1`, landmarks, foco visível e operação por teclado.
- Prefira elementos nativos (`details`, `button`, `label`) a ARIA customizada.
- Todo conteúdo essencial deve permanecer visível sem animações.
- Respeite `prefers-reduced-motion` e evite overflow horizontal.
- Use os tokens de `globals.css` e classes compartilhadas de `styles/classes.ts`.

## Prazos e conteúdo jurídico

- Não altere prazo, termo inicial, fundamento, promessa ou aviso jurídico sem
  sinalizar validação profissional obrigatória.
- Trate a calculadora como estimativa informativa.
- Cubra vazio, inválido, futuro, vigente, urgente, limite e vencido em testes.

## Contato e segurança

- Nunca interpole texto do visitante em HTML ou em uma URL sem codificação.
- Preserve normalização, limites, `encodeURIComponent`/`URLSearchParams` e o
  domínio fixo `wa.me`.
- Não envie ou armazene relatos no servidor.
- Links em nova aba devem usar `noopener noreferrer`.
- Não relaxe CSP ou outros headers sem justificar e testar em produção.
- Variáveis `NEXT_PUBLIC_*` são públicas; nunca coloque segredos nelas.

## Verificação obrigatória

Após qualquer mudança relevante, execute:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Também teste o fluxo alterado em mobile e desktop. Atualize `.spec`, `README.md`
e `docs/deployment.md` quando arquitetura, stack, configuração ou deploy mudarem.

