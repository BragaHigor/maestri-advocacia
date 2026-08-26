# Maestri Advocacia

Landing page da Maestri Advocacia construída com Next.js, React, TypeScript e
Tailwind CSS. O projeto preserva a experiência da versão estática e acrescenta
SEO técnico, testes automatizados, otimização de imagens/fontes, headers de
segurança e configuração para deploy na Vercel.

## Requisitos

- Node.js 20.9 ou superior;
- npm 11 ou compatível com o lockfile.

## Executar localmente

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Acesse `http://localhost:3000`.

## Configuração

Preencha `.env` antes de testar contatos reais:

```dotenv
NEXT_PUBLIC_SITE_URL=https://www.seudominio.com.br
NEXT_PUBLIC_WHATSAPP=5511999999999
NEXT_PUBLIC_PHONE_DISPLAY=(11) 99999-9999
NEXT_PUBLIC_CONTACT_EMAIL=contato@seudominio.com.br
NEXT_PUBLIC_OAB=OAB/SP 000.000
NEXT_PUBLIC_OFFICE_LOCATION=Cidade/UF — atendimento 100% online
NEXT_PUBLIC_SERVICE_AREA=Todo o Brasil
NEXT_PUBLIC_CONTACT_DESTINATION=whatsapp
```

`NEXT_PUBLIC_WHATSAPP` aceita somente DDI 55, DDD e número. Enquanto o valor for
placeholder, os CTAs levam à seção de contato e o formulário não abre uma URL
inválida. O destino aceita `whatsapp` ou `email`.

Variáveis `NEXT_PUBLIC_*` são incorporadas ao bundle durante o build. Alterações
na Vercel exigem um novo deploy.

## Comandos

```powershell
npm run dev        # desenvolvimento
npm run lint       # análise estática
npm run typecheck  # tipos sem emissão
npm test           # testes unitários
npm run build      # build de produção
npm start          # executa o build localmente
```

## Estrutura

```text
src/
├── app/                 rotas, metadata, SEO e estilos globais
├── components/          layout, seções e componentes de interface
├── config/              configuração tipada do site
├── context/             sincronização de tipo de caso
├── data/                conteúdo editorial estruturado
├── domain/deadlines/    regras e cálculo puro de prazos
├── hooks/               comportamentos reutilizáveis do navegador
├── lib/                 datas e criação segura de links
└── styles/              combinações reutilizáveis de classes Tailwind
public/assets/           marca, favicons e fotografias
.spec/                   arquitetura, stack e análise técnica
docs/deployment.md       publicação na Vercel
```

## Antes da publicação

1. configure os dados reais do escritório e o domínio;
2. valide todo conteúdo e prazo com a pessoa profissionalmente responsável;
3. defina a política de privacidade aplicável ao atendimento;
4. execute `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`;
5. teste WhatsApp/e-mail no domínio HTTPS.

Consulte [.spec/architecture.md](.spec/architecture.md) para manutenção e
[docs/deployment.md](docs/deployment.md) para publicar na Vercel.
