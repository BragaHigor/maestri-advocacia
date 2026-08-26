import {
  addCalendarDays,
  addCalendarYears,
  differenceInCalendarDays,
  parseDateInput,
  startOfToday,
} from "@/lib/date";

import type { DeadlineResult, DeadlineRule } from "./types";

function pluralize(value: number, singular: string, plural: string): string {
  return Math.abs(value) === 1 ? singular : plural;
}

function formatDeadline(rule: DeadlineRule): string {
  const labels = rule.unit === "years" ? ["ano", "anos"] : ["dia", "dias"];
  return `${rule.amount} ${pluralize(rule.amount, labels[0], labels[1])}`;
}

function addDeadline(date: Date, rule: DeadlineRule): Date {
  return rule.unit === "years"
    ? addCalendarYears(date, rule.amount)
    : addCalendarDays(date, rule.amount);
}

export function createDefaultDeadlineResult(
  rule: DeadlineRule,
): DeadlineResult {
  if (rule.mode === "before-due-date") {
    return {
      number: rule.amount,
      unit: "dias antes do vencimento",
      progress: 0,
      tone: "normal",
      title: "Informe o vencimento da fatura.",
      text:
        "O Código de Defesa do Consumidor prevê que a administradora seja " +
        "avisada com pelo menos 10 dias de antecedência para que o valor " +
        "contestado não seja cobrado enquanto a situação é apurada.",
    };
  }

  const unit =
    rule.unit === "years"
      ? pluralize(rule.amount, "ano", "anos")
      : pluralize(rule.amount, "dia", "dias");

  return {
    number: rule.amount,
    unit,
    progress: 0,
    tone: "normal",
    title: "Informe a data para calcular quanto tempo resta.",
    text:
      `O prazo previsto para ${rule.name} é de ${formatDeadline(rule)}. ` +
      rule.hint,
  };
}

function calculateCardResult(
  rule: DeadlineRule,
  dueDate: Date,
  today: Date,
): DeadlineResult {
  const noticeDeadline = addCalendarDays(dueDate, -rule.amount);
  const remainingDays = differenceInCalendarDays(noticeDeadline, today);

  if (remainingDays > 0) {
    return {
      number: remainingDays,
      unit: `${pluralize(remainingDays, "dia", "dias")} para avisar`,
      progress: 0,
      tone: "normal",
      title: "Ainda dá tempo de avisar com a antecedência prevista.",
      text:
        `Para cumprir a antecedência mínima de 10 dias, conteste a compra ` +
        `nos próximos ${remainingDays} ${pluralize(remainingDays, "dia", "dias")}. ` +
        "Mesmo assim, quanto antes você avisar o banco, melhor.",
    };
  }

  if (remainingDays === 0) {
    return {
      number: 0,
      unit: "dias restantes",
      progress: 100,
      tone: "warning",
      title: "A data-limite é hoje.",
      text:
        "Avise a administradora do cartão hoje para cumprir a antecedência " +
        "mínima de 10 dias antes do vencimento da fatura.",
    };
  }

  const overdueDays = Math.abs(remainingDays);
  return {
    number: overdueDays,
    unit: `${pluralize(overdueDays, "dia", "dias")} após a data-limite`,
    progress: 100,
    tone: "alert",
    title: "Avise a administradora imediatamente.",
    text:
      "A antecedência de 10 dias para impedir a cobrança durante a apuração " +
      "não foi atendida pela data informada. Isso não impede que você peça " +
      "o bloqueio, a anulação ou a restituição em caso de uso fraudulento.",
  };
}

export function calculateDeadline(
  rule: DeadlineRule,
  inputValue: string,
  now = new Date(),
): DeadlineResult {
  if (!inputValue) return createDefaultDeadlineResult(rule);

  const startDate = parseDateInput(inputValue);
  const today = startOfToday(now);

  if (!startDate) {
    return {
      ...createDefaultDeadlineResult(rule),
      title: "Data inválida.",
      text: "Confira a data informada.",
    };
  }

  if (rule.mode === "before-due-date") {
    return calculateCardResult(rule, startDate, today);
  }

  if (startDate > today) {
    return {
      ...createDefaultDeadlineResult(rule),
      title: "Essa data está no futuro.",
      text: "Informe o dia em que o fato realmente aconteceu.",
    };
  }

  const deadlineDate = addDeadline(startDate, rule);
  const totalDays = Math.max(
    1,
    differenceInCalendarDays(deadlineDate, startDate),
  );
  const elapsedDays = differenceInCalendarDays(today, startDate);
  const remainingDays = differenceInCalendarDays(deadlineDate, today);
  const progress = Math.max(0, Math.min(100, (elapsedDays / totalDays) * 100));

  if (remainingDays <= 0) {
    const overdueDays = Math.abs(remainingDays);
    return {
      number: overdueDays,
      unit: `${pluralize(overdueDays, "dia", "dias")} de atraso`,
      progress: 100,
      tone: "alert",
      title: "Este prazo específico venceu.",
      text:
        "Isso não encerra o caso. Outras vias podem seguir abertas, " +
        "inclusive a discussão judicial da responsabilidade do banco. " +
        "O prazo aplicável deve ser confirmado em uma análise individual.",
    };
  }

  const isUrgent = remainingDays <= Math.max(3, totalDays * 0.25);
  return {
    number: remainingDays,
    unit: `${pluralize(remainingDays, "dia", "dias")} restantes`,
    progress,
    tone: isUrgent ? "warning" : "normal",
    title: isUrgent ? "O prazo está apertado." : "Você está dentro do prazo.",
    text: isUrgent
      ? `Restam ${remainingDays} ${pluralize(remainingDays, "dia", "dias")} ` +
        `do prazo estimado de ${formatDeadline(rule)} para ${rule.name}. ` +
        "Vale buscar orientação hoje."
      : `Do prazo estimado de ${formatDeadline(rule)} para ${rule.name}, ` +
        `já se passaram ${elapsedDays} ${pluralize(elapsedDays, "dia", "dias")}. ` +
        "Há tempo para reunir as provas e buscar orientação.",
  };
}
