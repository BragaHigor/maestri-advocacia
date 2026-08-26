export type DeadlineId =
  | "pix"
  | "cartao"
  | "compraonline"
  | "vicio30"
  | "vicio90"
  | "reparacao";

export type DeadlineUnit = "days" | "years";

export interface DeadlineRule {
  readonly id: DeadlineId;
  readonly amount: number;
  readonly unit: DeadlineUnit;
  readonly mode?: "before-due-date";
  readonly optionLabel: string;
  readonly dateLabel: string;
  readonly hint: string;
  readonly name: string;
}

export type DeadlineTone = "normal" | "warning" | "alert";

export interface DeadlineResult {
  readonly number: number;
  readonly unit: string;
  readonly progress: number;
  readonly tone: DeadlineTone;
  readonly title: string;
  readonly text: string;
}
