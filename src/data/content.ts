export const mainNavigationItems = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#compromisso", label: "Compromisso" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#quem-atende", label: "Quem atende" },
  { href: "#perguntas", label: "Dúvidas" },
] as const;

export const footerNavigationItems = [
  { href: "#top", label: "Início" },
  ...mainNavigationItems,
  { href: "#contato", label: "Contato" },
] as const;

export const practiceAreas = [
  {
    title: "Golpe do Pix",
    text: "Falso funcionário, boleto adulterado, perfil clonado.",
  },
  {
    title: "Cartão de crédito",
    text: "Compras não reconhecidas, clonagem, cobrança em dobro.",
  },
  {
    title: "Compras online",
    text: "Produto que não chegou, loja fantasma, estorno negado.",
  },
  {
    title: "Conta e crédito",
    text: "Conta invadida, empréstimo não contratado, negativação.",
  },
] as const;

export const commitmentItems = [
  {
    title: "Atuação exclusiva em fraudes bancárias",
    text: "Um assunto só, do começo ao fim.",
  },
  {
    title: "Contato direto com advogado",
    text: "Sem intermediários e no mesmo canal em que você começou.",
  },
  {
    title: "Análise inicial sem custo",
    text: "Você decide depois de saber o cenário real.",
  },
  {
    title: "Honorários em contrato escrito",
    text: "Conforme a Tabela da OAB, sem surpresa.",
  },
] as const;

export const journeySteps = [
  {
    title: "Análise do caso",
    text: "Avaliamos viabilidade e prazo.",
  },
  {
    title: "Estratégia",
    text: "Via administrativa ou judicial, definida com você.",
  },
  {
    title: "Atuação",
    text: "Notificações, protocolos e ação judicial quando cabível.",
  },
  {
    title: "Acompanhamento",
    text: "Atualização a cada movimentação, sem juridiquês.",
  },
] as const;

export const faqItems = [
  {
    question: "Eu mesmo fiz o Pix. Ainda tenho direito?",
    answer:
      "Provavelmente sim. O que se examina é a falha de segurança da instituição. Cada caso é analisado individualmente, sem garantia de resultado.",
  },
  {
    question: "Preciso ter feito boletim de ocorrência?",
    answer:
      "Ajuda, mas a ausência não impede a análise. Se ainda não registrou, dá para fazer on-line agora.",
  },
  {
    question: "Como funcionam os honorários?",
    answer:
      "Definidos na primeira conversa, por contrato escrito e conforme a Tabela da OAB.",
  },
  {
    question: "Preciso ir até o escritório?",
    answer:
      "Não. O atendimento é 100% online, com procuração assinada digitalmente.",
  },
] as const;
