# Google Ads, GA4 e privacidade

Revisão documental do código em 01/10/2026. Registros de conta e navegador
abaixo são históricos; não houve acesso à conta, deploy ou nova verificação no
domínio publicado nesta revisão.

## Implementação atual e histórico

O usuário informou site publicado em https://www.maestriadv.com.br e WhatsApp
(16) 97407-5767. Autorizou consultar a conta e configurar a integração no código,
proibindo qualquer ação relacionada a dinheiro. Não alterar campanhas, orçamento,
lances, pagamentos ou faturamento. Nenhuma alteração na conta foi realizada.

O usuário forneceu a tag AW-18438128750 e o destino de conversão
AW-18438128750/ag1XCKXGgPQcEO6I_tdE por snippets da conta do escritório.
Na implementação registrada em setembro não houve deploy nem alteração na
conta por esta integração. GA4 também está implementado desde 23/09/2026,
conforme a seção abaixo. Não há contêiner GTM. gtag.js é servido pelo domínio
googletagmanager.com, o que não significa instalação de contêiner GTM.

A integração usa **consent mode avançado** desde 22/09/2026. `MeasurementTag`
injeta, pelo layout raiz e com `strategy="beforeInteractive"`, um snippet inline
de consentimento seguido do gtag.js. A tag passa a existir em toda visita, o que
permite a verificação pelo Google, mas inicia negada: `ad_storage`, `ad_user_data`,
`ad_personalization` e `analytics_storage` começam em `denied`, com
`ads_data_redaction` em `true`. O snippet lê a escolha salva antes do gtag.js, de
modo que quem já aceitou nunca mede uma página no estado errado. O aviso oferece recusar
e permitir com aparência equivalente; seu texto descreve a finalidade sem
nomear a ferramenta, e a identificação do Google Ads está na política; a preferência fica em localStorage por
180 dias. O controle de preferências na política permite mudar a escolha,
sincronizada entre abas. Sem acesso ao armazenamento, vale apenas na página.
ad_storage, ad_user_data e analytics_storage são concedidos após aceitar;
ad_personalization permanece negado. Não habilitamos conversões otimizadas.
Na verificação histórica do Ads no navegador: sem aceite nenhum cookie foi
gravado; `_gcl_au` apareceu somente após permitir.

Em modo avançado a tag envia um ping sem cookies a cada carregamento, mesmo sob
recusa, para `pagead2.googlesyndication.com/ccm/collect`. Isso foi observado no
navegador e é esperado; `send_page_view: false` segue evitando o page_view
convencional no Ads. GA4 tem page_view habilitado. O formulário mede após
validação: no WhatsApp, depois de window.open; no e-mail, antes de
window.location.assign. Isso registra intenção de abrir, sem confirmar abertura;
o botão flutuante mede ao clicar. Desde 22/09/2026 a deduplicação é **por
origem**, não global: cada origem tem sua própria chave em sessionStorage, com
fallback em memória. As origens são rótulos fixos, `whatsapp_float` e
`contact_form`, e viajam no evento como `contact_source`.

Antes havia uma única chave compartilhada, então a primeira origem a disparar
bloqueava todas as outras na mesma aba. Como o botão flutuante aparece desde o
primeiro instante, na prática o formulário quase nunca era contabilizado.

São no máximo duas conversões por visita. O botão "Abrir novamente o WhatsApp"
é um submit do mesmo formulário e reutiliza `contact_form`, então repetir uma
tentativa que não abriu não gera conversão nova.

Atenção ao ler relatórios: o Google Ads não segmenta uma mesma ação de conversão
por `contact_source`. O parâmetro serve para diagnóstico no Tag Assistant. Para
separar os canais no painel seria preciso criar ações de conversão distintas na
conta e apontar cada origem para o seu `send_to` — alteração de configuração da
conta, não realizada. Não se mede
carregamento da página como Contato. Nenhum campo do formulário, link wa.me,
valor ou moeda entra no evento. page_location usa origem e caminho sem query
ou fragmento; page_referrer é vazio. Identificadores publicitários e dados
técnicos do Google ainda podem ser tratados após consentimento.

Revogar atualiza a tag para denied e religa `ads_data_redaction`, de imediato.
O script permanece carregado por definição do modo avançado. Diferente da
implementação anterior, revogar **não** bloqueia mais o evento de contato: ele
continua sendo enviado sem cookies, em formato agregado; não apagamos o formulário
nem recarregamos automaticamente. Isso não desfaz dados já enviados nem garante
eliminação automática de cookies Google existentes. A política explica o limite.
A CSP autoriza destinos específicos documentados pelo Google, incluindo .com.br.

Foi criada /privacidade com canonical próprio, incluída no sitemap e vinculada
no formulário e no rodapé. A página repete o cabeçalho do site e traz um botão
flutuante de retorno; fora da home, as âncoras do cabeçalho apontam para `/#...`. O texto descreve processamento local, transferência
dos campos ao serviço externo, possíveis registros técnicos de hospedagem e
canais para direitos dos titulares. O usuário identificou a responsável como
Laura De Freitas Pereira Maestri, nome incluído na política. As práticas reais
de retenção/atendimento precisam de validação antes do deploy.
O texto não declara certificação de conformidade com a LGPD.

## Verificações e limites

Em 01/10/2026 lint passou e 39 testes passaram em cinco arquivos. A suíte
exercita bootstrap e ordem de consentimento, escolha salva, recusa, expiração,
revogação, conversão sob recusa, deduplicação por origem, ausência de campos
pessoais/monetários no evento Ads e configuração/page_view do GA4. Ela não
verifica entrega de rede, cookies reais, carregamento único do script ou layout.
Typecheck, build, navegador e domínio publicado não foram revalidados agora.

As verificações de navegador registradas em setembro incluem botões a 320 px
e 1280 px. Os registros de recusa sem tag e bloqueio do script após revogar
eram da implementação anterior ao consent mode avançado e não descrevem o
código atual: a tag permanece carregada sob recusa e revogação. Não foi
disparada conversão real no navegador nessa validação histórica; a entrega
efetiva exige conferência posterior.

## Google Analytics 4

Desde 23/09/2026 a mesma tag do Google também configura o GA4. O ID de medição
é `G-Z1YCKTT9WK`, fixo em `src/config/site.ts` como acontece com a tag do Ads.
Não há variável de ambiente: trocar o destino exige alterar o código e publicar.

São duas configurações para uma única gtag.js: a do Ads mantém
`send_page_view: false`, sem query string e sem referenciador; a do Analytics usa
`send_page_view: true` e recebe URL e referenciador reais, sem os quais não há
como apurar a origem do tráfego. `analytics_storage` passa a ser concedido no
aceite; `ad_personalization` continua negado sempre.

O App Router navega sem recarregar, e nesses casos o Analytics não registra
sozinho. `AnalyticsPageViews` dispara `page_view` apenas em troca de rota, nunca
na carga inicial, que já é contada pelo `config`.

A CSP passou a autorizar `google-analytics.com` e `analytics.google.com`, com
curinga para os subdomínios regionais.

Na verificação histórica de setembro, registrada com ID de teste: sem aceite,
quatro sinais negados, nenhum cookie e ping sem cookies para `google-analytics.com/g/collect`; com aceite,
`analytics_storage` concedido e cookies `_ga` e `_gcl_au` presentes. Navegação
sem recarregamento disparou exatamente um `page_view`. Nenhum bloqueio de CSP.

## Próximos passos técnicos

1. Validar práticas reais de atendimento e política com a responsável.
2. Publicar quando solicitado e usar Tag Assistant para conferir entrega, CSP
   e diagnóstico da conta, sem enviar relatos reais ou iniciar anúncios.
3. Conferir a configuração existente de Contato: a captura mostra contagem
   “Todas as conversões”, ação principal e valor padrão R$1. Nenhuma dessas
   configurações foi alterada. Omitir value/currency no código não remove o
   valor padrão configurado na conta. Sua alteração depende de autorização
   específica, pois o usuário proibiu ações relacionadas a dinheiro.
4. Conferir page_view do GA4 na carga inicial e nas trocas de rota. GA4 já mede
   visitas; não reutilizar a conversão Contato para carregamento da home.

## Referências

- [Google: tag e conversões](https://support.google.com/google-ads/answer/7548399)
- [Google: consentimento](https://developers.google.com/tag-platform/security/guides/consent)
- [ANPD: cookies e dados pessoais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais)

Consultar as referências ao alterar a integração. Este documento registra
implementação local; validação no domínio publicado ainda está pendente.
