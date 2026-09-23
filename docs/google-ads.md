# Google Ads e privacidade

## Estado em 18/09/2026

O usuário informou site publicado em https://www.maestriadv.com.br e WhatsApp
(16) 97407-5767. Autorizou consultar a conta e configurar a integração no código,
proibindo qualquer ação relacionada a dinheiro. Não alterar campanhas, orçamento,
lances, pagamentos ou faturamento. Nenhuma alteração na conta foi realizada.

O usuário forneceu a tag AW-18438128750 e o destino de conversão
AW-18438128750/ag1XCKXGgPQcEO6I_tdE por snippets da conta do escritório.
A implementação está no código local; não houve deploy nem alteração na conta.
Não há Google Analytics ou contêiner GTM. gtag.js é servido pelo domínio
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
ad_storage e ad_user_data são concedidos após aceitar; ad_personalization e
analytics_storage permanecem negados. Não habilitamos conversões otimizadas.
Verificado no navegador: sem aceite nenhum cookie é gravado; `_gcl_au` aparece
somente após permitir.

Em modo avançado a tag envia um ping sem cookies a cada carregamento, mesmo sob
recusa, para `pagead2.googlesyndication.com/ccm/collect`. Isso foi observado no
navegador e é esperado; `send_page_view: false` segue evitando o page_view
convencional. O formulário mede somente depois da validação e tentativa de abrir um canal;
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

Lint, typecheck e build finais passaram. Validação: 27 testes em quatro arquivos, incluindo bloqueio antes de consentir,
ordem dos comandos, carregamento único, evento sem valores/query, duplicidade,
revogação e preferência inválida/expirada. No Chrome local a 320 px, não houve
overflow horizontal e os botões empilhados medem mais de 44 px de altura.
No desktop de 1280 px, os botões têm a mesma largura e ficam lado a lado,
também sem overflow horizontal. Recusa persistiu após reload sem tag; permitir inseriu o script correto;
revogar e recarregar bloqueou novamente o script. Não foi disparado evento real
de conversão no navegador. A entrega efetiva do evento exige validação posterior.

## Próximos passos técnicos

1. Validar práticas reais de atendimento e política com a responsável.
2. Publicar quando solicitado e usar Tag Assistant para conferir entrega, CSP
   e diagnóstico da conta, sem enviar relatos reais ou iniciar anúncios.
3. Conferir a configuração existente de Contato: a captura mostra contagem
   “Todas as conversões”, ação principal e valor padrão R$1. Nenhuma dessas
   configurações foi alterada. Omitir value/currency no código não remove o
   valor padrão configurado na conta. Sua alteração depende de autorização
   específica, pois o usuário proibiu ações relacionadas a dinheiro.
4. Se medir visitas, usar uma ação distinta secundária ou GA4 com configuração
   própria. Não reutilizar a conversão Contato para carregamento da home.

## Referências

- [Google: tag e conversões](https://support.google.com/google-ads/answer/7548399)
- [Google: consentimento](https://developers.google.com/tag-platform/security/guides/consent)
- [ANPD: cookies e dados pessoais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais)

Consultar as referências ao alterar a integração. Este documento registra
implementação local; validação no domínio publicado ainda está pendente.
