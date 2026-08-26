"use client";

import { useMemo, useRef, useState } from "react";

import { useCaseType } from "@/context/case-type-context";
import { calculateDeadline } from "@/domain/deadlines/calculate";
import {
  deadlineOptions,
  deadlineRules,
  isDeadlineId,
} from "@/domain/deadlines/data";
import type { DeadlineTone } from "@/domain/deadlines/types";
import { useFitSelectText } from "@/hooks/use-fit-select-text";
import { startOfToday, toLocalIsoDate } from "@/lib/date";
import {
  buttonGold,
  fieldClass,
  inputClass,
  labelClass,
} from "@/styles/classes";

const toneClasses: Record<
  DeadlineTone,
  { number: string; border: string; progress: string }
> = {
  normal: {
    number: "text-gold-bright",
    border: "border-gold/40",
    progress: "bg-gold-bright",
  },
  warning: {
    number: "text-warning",
    border: "border-warning/50",
    progress: "bg-warning",
  },
  alert: {
    number: "text-alert",
    border: "border-alert/50",
    progress: "bg-alert",
  },
};

export function DeadlineCalculator() {
  const { deadlineType, setDeadlineType } = useCaseType();
  const [date, setDate] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);
  useFitSelectText(selectRef);

  const rule = deadlineRules[deadlineType];
  const result = useMemo(() => calculateDeadline(rule, date), [date, rule]);
  const tone = toneClasses[result.tone];
  const maximumDate =
    "mode" in rule && rule.mode === "before-due-date"
      ? undefined
      : toLocalIsoDate(startOfToday());

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,3vw,40px)] min-[880px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex min-w-0 flex-col gap-5 rounded-md border border-paper/15 bg-ink-2 p-[clamp(18px,3vw,36px)] min-[521px]:p-[clamp(24px,3vw,36px)]">
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="calc-tipo">
            Qual problema você está enfrentando?
          </label>
          <select
            ref={selectRef}
            className={`${inputClass} text-[clamp(13px,1vw,14px)] whitespace-nowrap`}
            id="calc-tipo"
            value={deadlineType}
            onChange={(event) => {
              if (isDeadlineId(event.target.value)) {
                setDeadlineType(event.target.value);
              }
            }}
          >
            {deadlineOptions.map((option) => (
              <option value={option.id} key={option.id}>
                {option.optionLabel}
              </option>
            ))}
          </select>
        </p>
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="calc-data">
            {rule.dateLabel}
          </label>
          <input
            className={inputClass}
            id="calc-data"
            type="date"
            value={date}
            max={maximumDate}
            onChange={(event) => setDate(event.target.value)}
            onInput={(event) => setDate(event.currentTarget.value)}
          />
        </p>
        <p className="text-[13.5px] leading-[1.6] text-paper/60">{rule.hint}</p>
      </div>

      <div
        className={`flex min-w-0 flex-col gap-5 rounded-md border bg-ink-2 p-[clamp(18px,3vw,36px)] transition-colors min-[521px]:p-[clamp(24px,3vw,36px)] ${tone.border}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="flex flex-wrap items-baseline gap-3.5">
          <span
            className={`font-heading text-[clamp(46px,6vw,72px)] leading-none font-semibold tabular-nums transition-colors ${tone.number}`}
          >
            {result.number}
          </span>
          <span className="font-heading text-[22px] font-semibold text-paper">
            {result.unit}
          </span>
        </p>
        <span
          className="block h-1.5 overflow-hidden rounded-[3px] bg-paper/12"
          role="progressbar"
          aria-label="Prazo decorrido"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(result.progress)}
        >
          <span
            className={`block h-full rounded-[3px] transition-[width] duration-450 ease-fluid ${tone.progress}`}
            style={{ width: `${result.progress.toFixed(1)}%` }}
          />
        </span>
        <p className="text-[16.5px] leading-[1.68] font-medium">{result.title}</p>
        <p className="text-[15px] leading-[1.68] text-paper/75">{result.text}</p>
        <a
          className={`${buttonGold} flex w-full`}
          href="#contato"
        >
          Solicitar avaliação jurídica inicial
        </a>
      </div>
    </div>
  );
}
