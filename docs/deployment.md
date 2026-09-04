# Deploy na Vercel

## 1. Preparação

Na máquina local:

```powershell
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Todos os comandos devem terminar sem erro.

## 2. Importar o projeto

1. envie o projeto para um repositório Git;
2. no painel da Vercel, escolha **Add New → Project**;
3. importe o repositório;
4. confirme o preset **Next.js**;
5. mantenha `npm run build` como Build Command e a raiz como Root Directory.

`vercel.json` já declara o framework. Não é necessário configurar Output
Directory.

## 3. Variáveis de ambiente

No desenvolvimento local, o projeto utiliza o arquivo `.env`. Use
`.env.example` apenas como modelo e nunca armazene credenciais nele.

Cadastre em **Settings → Environment Variables** para Production e Preview:

| Variável | Exemplo |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.maestriadvocacia.com.br` |
| `NEXT_PUBLIC_WHATSAPP` | `5516991554260` |
| `NEXT_PUBLIC_PHONE_DISPLAY` | `(16) 99155-4260` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contato@maestriadvocacia.com.br` |
| `NEXT_PUBLIC_OAB` | `OAB/SP 123.456` |
| `NEXT_PUBLIC_OFFICE_LOCATION` | `Franca/SP — atendimento 100% online` |
| `NEXT_PUBLIC_SERVICE_AREA` | `Todo o Brasil` |

Esses dados são públicos por natureza e entram no bundle. Não armazene tokens,
senhas ou credenciais em variáveis `NEXT_PUBLIC_*`.

## 4. Domínio e SEO

1. conecte o domínio em **Settings → Domains**;
2. atualize `NEXT_PUBLIC_SITE_URL` para o domínio canônico HTTPS;
3. faça novo deploy, pois variáveis públicas são fixadas no build;
4. confirme `/robots.txt`, `/sitemap.xml` e `/opengraph-image`;
5. cadastre o sitemap no Google Search Console quando o domínio estiver ativo.

## 5. Verificação pós-deploy

- abrir o site em janela anônima e celular real;
- conferir canonical e imagem ao compartilhar uma URL;
- testar CTAs do cabeçalho, hero, contato, rodapé e barra móvel;
- enviar um relato fictício pelo WhatsApp configurado;
- verificar teclado, Escape do menu, FAQ e movimento reduzido;
- confirmar que resposta contém CSP, HSTS, `nosniff` e bloqueio de frames;
- revisar logs de build e Runtime Logs da Vercel.

## Rollback

Se uma publicação apresentar problema, use **Deployments → menu do último deploy
estável → Promote to Production**. Não altere DNS durante um rollback comum.
