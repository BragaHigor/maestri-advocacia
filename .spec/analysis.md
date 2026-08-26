# Análise atual do projeto

## Estado

A migração da landing estática para Next.js, TypeScript e Tailwind foi concluída.
Todo conteúdo e comportamento anterior foi portado, com separação entre domínio,
configuração, conteúdo editorial e interface.

## Ganhos obtidos

- regras de prazo tipadas, puras e cobertas por testes;
- conteúdo repetitivo transformado em dados estruturados;
- imagens otimizadas e fontes auto-hospedadas;
- SEO com canonical, Open Graph, Twitter Card, JSON-LD, sitemap e robots;
- segurança por CSP e headers adicionais;
- mensagens do visitante processadas somente no dispositivo;
- configuração por ambiente pronta para Vercel;
- FAQ nativo e interface utilizável por teclado;
- build totalmente pré-renderizado e cacheável na CDN.

## Validações executadas

- ESLint sem avisos;
- TypeScript estrito sem erros;
- 13 testes unitários aprovados;
- build de produção aprovado em sete rotas estáticas;
- auditoria npm sem vulnerabilidades conhecidas;
- navegador de produção sem erro ou warning;
- menu mobile, Escape, FAQ, calculadora, sincronização e fallback de contato
  verificados;
- larguras de 390 a 1220 px sem overflow horizontal;
- CSP, HSTS, clickjacking, MIME, referrer e permissions policy conferidos.

## Pendências de negócio antes do domínio público

1. substituir URL, telefone, e-mail, OAB e localização pelos dados reais;
2. validar prazos, fundamentos e redação com a pessoa responsável;
3. definir a política de privacidade do atendimento posterior no WhatsApp/e-mail;
4. testar o canal real após configurar as variáveis na Vercel;
5. decidir se analytics será necessário; ele não foi incluído por privacidade e
   por não fazer parte do escopo atual.

## Decisões conscientes

- A CSP mantém `unsafe-inline` para scripts/estilos porque a alternativa com
  nonce exige renderização dinâmica e elimina as vantagens de CDN desta landing.
  É a configuração sem nonce documentada pelo Next.js. `unsafe-eval` é removido
  em produção.
- Não foi criada API intermediária para WhatsApp. Isso reduz superfície de
  ataque, armazenamento de dados pessoais, spam e custo operacional.
- Não foram adicionados bibliotecas de formulário, animação ou estado: o React e
  APIs nativas cobrem o requisito com menos dependências.

