export const headerNavigationItems = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#como-reconhecer", label: "Como reconhecer" },
  { href: "#o-caminho", label: "O caminho" },
  { href: "#quem-atende", label: "Quem atende" },
  { href: "#perguntas-frequentes", label: "Perguntas" },
  { href: "#ferramenta", label: "Calcule seu prazo" },
] as const;

export const footerNavigationItems = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#como-reconhecer", label: "Como reconhecer" },
  { href: "#o-caminho", label: "O caminho" },
  { href: "#quem-atende", label: "Quem atende" },
  { href: "#perguntas-frequentes", label: "Perguntas frequentes" },
  { href: "#ferramenta", label: "Calcule seu prazo" },
] as const;

export const marqueeItems = [
  "Golpe do Pix",
  "Cartão de crédito",
  "Compras online",
  "Conta invadida",
  "Empréstimo não contratado",
  "Cobrança indevida e negativação",
] as const;

export const caseCards: ReadonlyArray<{
  title: string;
  text: string;
  featured?: boolean;
}> = [
  {
    title: "Golpe do Pix",
    text: "Falso funcionário do banco, falso parente pedindo socorro, boleto adulterado, “Pix errado”, perfil clonado em rede social, central de atendimento falsa. Transferência feita por indução ou sob coação — inclusive quando foi você quem digitou.",
    featured: true,
  },
  {
    title: "Cartão de crédito",
    text: "Compras não reconhecidas, clonagem, cobrança em duplicidade, parcelas que não terminam, assinaturas nunca autorizadas.",
  },
  {
    title: "Compras online",
    text: "Produto que não chegou, loja fantasma, propaganda enganosa, recusa de troca ou de estorno, atraso indefinido.",
  },
  {
    title: "Conta invadida",
    text: "Acesso ao aplicativo por terceiros, celular roubado, transferências e empréstimos no seu nome sem o seu controle.",
  },
  {
    title: "Empréstimo não contratado",
    text: "Consignado indevido, desconto em benefício do INSS, crédito que apareceu na conta sem pedido, refinanciamento por telefone.",
  },
  {
    title: "Cobrança indevida e negativação",
    text: "Dívida que não existe, nome negativado após o pagamento, cobrança vexatória, valor cobrado em dobro.",
  },
];

export const scamSignals = [
  {
    title: "Pressa e sigilo",
    text: "“Resolva agora ou você perde o dinheiro”, “não comente com ninguém”. Urgência e segredo juntos são a assinatura da fraude.",
  },
  {
    title: "O contato partiu deles",
    text: "Banco legítimo não liga pedindo que você transfira dinheiro para uma “conta segura”. Essa conta não existe.",
  },
  {
    title: "Pedido de senha, token ou código de SMS",
    text: "Nenhum funcionário de banco, operadora ou loja precisa desses dados. Nunca. Sem exceção.",
  },
  {
    title: "Link enviado por fora do aplicativo",
    text: "Atualização de cadastro, regularização de dívida, prêmio a resgatar. Abra sempre pelo app oficial, digitando você mesmo.",
  },
  {
    title: "Preço fora da realidade, só no Pix",
    text: "Desconto muito acima do mercado combinado com recusa de cartão ou boleto: o vendedor está evitando rastro e estorno.",
  },
  {
    title: "Loja jurídica, conta de pessoa física",
    text: "Confira o nome do favorecido antes de confirmar. Empresa recebe em CNPJ; nome de pessoa física é sinal de alerta.",
  },
] as const;

export const processSteps = [
  {
    title: "Análise do caso",
    text: "Você envia o que tem em mãos pelo WhatsApp. Avaliamos viabilidade, prazo e quais provas ainda faltam. Sem custo nesta etapa.",
  },
  {
    title: "Estratégia definida com você",
    text: "Via administrativa — banco, MED, Banco Central, consumidor.gov.br — ou judicial. Explicamos o porquê e os riscos de cada caminho.",
  },
  {
    title: "Atuação",
    text: "Notificações, protocolos e, quando cabível, ação com pedido de tutela de urgência para suspender cobrança ou retirar a negativação desde já.",
  },
  {
    title: "Acompanhamento em linguagem clara",
    text: "Atualização a cada movimentação relevante, explicada sem juridiquês, no mesmo canal em que você começou.",
  },
] as const;

export const faqItems = [
  {
    question:
      "O banco disse que a culpa foi minha, porque eu mesmo fiz o Pix. Ainda tenho direito?",
    answer:
      "Provavelmente sim, e é exatamente aqui que a maioria desiste sem precisar. O fato de a transferência ter partido do seu aparelho não encerra a discussão: a jurisprudência reconhece a responsabilidade da instituição por fraudes praticadas por terceiros no ambiente bancário. O que se examina é a falha de segurança e de informação — por que o sistema não identificou uma operação atípica, por exemplo. Cada caso é analisado individualmente, sem garantia de resultado.",
  },
  {
    question: "Preciso ter feito boletim de ocorrência?",
    answer:
      "Ajuda bastante, mas a ausência não impede a análise nem a atuação. Se ainda não registrou, dá para fazer agora, on-line, mesmo dias depois do ocorrido. Se já registrou, tenha o número em mãos no primeiro contato.",
  },
  {
    question: "Quanto tempo leva para resolver?",
    answer:
      "Depende da via. A administrativa costuma responder em dias ou poucas semanas. A judicial varia conforme a comarca e a complexidade da prova, e pode envolver decisão de urgência no início. Nenhum escritório sério promete prazo ou resultado — o que podemos oferecer é clareza sobre o cenário realista do seu caso.",
  },
  {
    question: "Preciso ir até o escritório?",
    answer:
      "Não. Todo o atendimento é 100% online e pode ser feito por WhatsApp, e-mail e videochamada, com procuração assinada digitalmente.",
  },
  {
    question: "Como funcionam os honorários?",
    answer:
      "São definidos na primeira conversa, sempre por contrato escrito e em observância à Tabela de Honorários da OAB. A análise inicial do caso não é cobrada, e você só decide sobre a contratação depois de saber exatamente o que está sendo proposto.",
  },
  {
    question: "O valor que perdi foi pequeno. Vale a pena?",
    answer:
      "Vale avaliar. Além da devolução do valor, pode haver pedido de restituição em dobro e de danos morais, e existem vias de custo reduzido para causas menores. A análise inicial dirá se faz sentido seguir — e, se não fizer, você vai ouvir isso com franqueza.",
  },
] as const;
