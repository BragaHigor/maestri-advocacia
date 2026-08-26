import type { DeadlineId, DeadlineRule } from "./types";

export const deadlineRules = {
  pix: {
    id: "pix",
    amount: 80,
    unit: "days",
    optionLabel: "Caí em um golpe no Pix",
    dateLabel: "Quando o Pix foi feito?",
    hint: "Para o MED, conte a partir da data em que o Pix foi feito.",
    name: "o pedido de devolução do Pix pelo MED",
  },
  cartao: {
    id: "cartao",
    mode: "before-due-date",
    amount: 10,
    unit: "days",
    optionLabel: "Apareceu uma compra no meu cartão que não reconheço",
    dateLabel: "Quando vence essa fatura?",
    hint:
      "Para impedir a cobrança enquanto ela é apurada, avise a administradora " +
      "pelo menos 10 dias antes do vencimento da fatura.",
    name: "a contestação da compra que você não reconhece no cartão",
  },
  compraonline: {
    id: "compraonline",
    amount: 7,
    unit: "days",
    optionLabel: "Quero cancelar uma compra que fiz pela internet",
    dateLabel: "Quando você recebeu ou contratou?",
    hint:
      "Use a data da assinatura do contrato ou do recebimento do produto ou serviço, " +
      "conforme o seu caso.",
    name: "o cancelamento de uma compra feita fora da loja",
  },
  vicio30: {
    id: "vicio30",
    amount: 30,
    unit: "days",
    optionLabel:
      "Tive problema com produto ou serviço de uso rápido (ex.: alimento)",
    dateLabel: "Quando você recebeu ou percebeu o problema?",
    hint:
      "Para produtos e serviços não duráveis, como alimentos, o prazo é de 30 dias. " +
      "Se o problema era aparente, conte da entrega ou do fim do serviço; se estava " +
      "oculto, conte de quando ele ficou evidente.",
    name: "reclamar de problema em produto ou serviço não durável",
  },
  vicio90: {
    id: "vicio90",
    amount: 90,
    unit: "days",
    optionLabel:
      "Tive problema com produto ou serviço de uso prolongado (ex.: celular)",
    dateLabel: "Quando você recebeu ou percebeu o problema?",
    hint:
      "Para produtos e serviços duráveis, como celular ou eletrodoméstico, o prazo " +
      "é de 90 dias. Se o problema era aparente, conte da entrega ou do fim do " +
      "serviço; se estava oculto, conte de quando ele ficou evidente.",
    name: "reclamar de problema em produto ou serviço durável",
  },
  reparacao: {
    id: "reparacao",
    amount: 5,
    unit: "years",
    optionLabel: "Sofri um prejuízo causado por um produto ou serviço",
    dateLabel: "Quando você soube do dano e de quem o causou?",
    hint:
      "Para pedir reparação por dano causado por produto ou serviço, conte a partir " +
      "do conhecimento do dano e de quem foi responsável.",
    name: "pedir reparação por dano causado por produto ou serviço",
  },
} as const satisfies Record<DeadlineId, DeadlineRule>;

export const deadlineOptions = Object.values(deadlineRules);

export function isDeadlineId(value: string): value is DeadlineId {
  return value in deadlineRules;
}
