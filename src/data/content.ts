export const navigationItems = [
  { href: "#prazo", label: "Calcule seu prazo" },
  { href: "#golpes", label: "Tipos de golpe" },
  { href: "#lei", label: "Seus direitos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#perguntas", label: "Dúvidas" },
] as const;

export const stats = [
  {
    value: 80,
    unit: "dias",
    text: "para acionar a devolução especial do Pix (MED) junto ao banco.",
  },
  {
    value: 10,
    unit: "dias",
    text: "antes do vencimento da fatura para contestar a cobrança e impedir seu débito enquanto ela é apurada.",
  },
  {
    value: 7,
    unit: "dias",
    text: "de arrependimento em qualquer compra feita pela internet.",
  },
  {
    value: 5,
    unit: "anos",
    text: "para pedir reparação por dano causado por produto ou serviço, conforme o Código de Defesa do Consumidor.",
  },
] as const;

export const marqueeItems = [
  "Golpe do Pix",
  "Falso funcionário do banco",
  "Cartão clonado",
  "Site fantasma",
  "Empréstimo não contratado",
  "Conta invadida",
  "Boleto adulterado",
  "Cobrança em dobro",
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

export const lawCards = [
  {
    reference: "Súmula 297 · STJ",
    title: "O CDC vale para bancos",
    text: "Instituições financeiras são fornecedoras de serviço. Toda a proteção do Código de Defesa do Consumidor se aplica à relação.",
  },
  {
    reference: "CDC · art. 14",
    title: "Responsabilidade sem culpa",
    text: "Quem presta o serviço responde pelo defeito, ainda que não tenha agido de má-fé. A discussão é sobre falha de segurança.",
  },
  {
    reference: "CDC · art. 6º, VIII",
    title: "A prova não é sua obrigação",
    text: "Reconhecida a verossimilhança, o ônus se inverte: cabe à instituição demonstrar que a operação partiu de você.",
  },
  {
    reference: "CDC · art. 42",
    title: "Cobrança indevida volta em dobro",
    text: "Valor cobrado indevidamente pode ser restituído em dobro, com correção e juros — além de eventual dano moral.",
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

export const glossaryItems = [
  {
    term: "MED",
    definition: "Mecanismo Especial de Devolução. Ferramenta do Pix que permite ao banco bloquear e devolver valores em caso de fraude, sem precisar de processo.",
  },
  {
    term: "Chargeback",
    definition: "Contestação de compra junto à bandeira do cartão. O valor é estornado enquanto a operação é apurada entre banco, bandeira e loja.",
  },
  {
    term: "Ônus da prova",
    definition: "Quem tem o dever de provar. No consumo, o juiz pode inverter esse dever: em vez de você provar a fraude, o banco prova que foi você.",
  },
  {
    term: "Tutela de urgência",
    definition: "Decisão provisória tomada no começo do processo, antes do julgamento final — para retirar a negativação ou suspender parcelas já agora.",
  },
  {
    term: "Fortuito interno",
    definition: "Risco que faz parte da própria atividade da empresa. Fraude no sistema bancário entra nessa conta — e por isso o banco responde.",
  },
  {
    term: "Repetição do indébito",
    definition: "Devolução do que foi cobrado indevidamente. No Código de Defesa do Consumidor, em dobro e com correção.",
  },
] as const;

export const faqItems = [
  {
    question: "O banco disse que a culpa foi minha, porque eu mesmo fiz o Pix. Ainda tenho direito?",
    answer: "Provavelmente sim, e é exatamente aqui que a maioria desiste sem precisar. O fato de a transferência ter partido do seu aparelho não encerra a discussão: a jurisprudência reconhece a responsabilidade da instituição por fraudes praticadas por terceiros no ambiente bancário. O que se examina é a falha de segurança e de informação — por que o sistema não identificou uma operação atípica, por exemplo. Cada caso é analisado individualmente, sem garantia de resultado.",
  },
  {
    question: "Preciso ter feito boletim de ocorrência?",
    answer: "Ajuda bastante, mas a ausência não impede a análise nem a atuação. Se ainda não registrou, dá para fazer agora, on-line, mesmo dias depois do ocorrido. Se já registrou, tenha o número em mãos no primeiro contato.",
  },
  {
    question: "Quanto tempo leva para resolver?",
    answer: "Depende da via. A administrativa costuma responder em dias ou poucas semanas. A judicial varia conforme a comarca e a complexidade da prova, e pode envolver decisão de urgência no início. Nenhum escritório sério promete prazo ou resultado — o que podemos oferecer é clareza sobre o cenário realista do seu caso.",
  },
  {
    question: "Preciso ir até o escritório?",
    answer: "Não. Todo o atendimento é 100% online e pode ser feito por WhatsApp, e-mail e videochamada, com procuração assinada digitalmente.",
  },
  {
    question: "Como funcionam os honorários?",
    answer: "São definidos na primeira conversa, sempre por contrato escrito e em observância à Tabela de Honorários da OAB. A análise inicial do caso não é cobrada, e você só decide sobre a contratação depois de saber exatamente o que está sendo proposto.",
  },
  {
    question: "O valor que perdi foi pequeno. Vale a pena?",
    answer: "Vale avaliar. Além da devolução do valor, pode haver pedido de restituição em dobro e de danos morais, e existem vias de custo reduzido para causas menores. A análise inicial dirá se faz sentido seguir — e, se não fizer, você vai ouvir isso com franqueza.",
  },
] as const;
