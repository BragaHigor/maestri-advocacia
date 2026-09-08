"use client";

import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";

import { useCaseType } from "@/context/case-type-context";
import { calculateDeadline } from "@/domain/deadlines/calculate";
import {
  deadlineOptions,
  deadlineRules,
  isDeadlineId,
} from "@/domain/deadlines/data";
import type { DeadlineTone } from "@/domain/deadlines/types";
import {
  formatDateInputPtBr,
  parseDateInput,
  startOfToday,
  toLocalIsoDate,
} from "@/lib/date";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { buttonGold, fieldClass, inputClass, labelClass } from "@/styles/classes";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const toneClasses: Record<
  DeadlineTone,
  { number: string; border: string; progress: string }
> = {
  normal: {
    number: "text-gold-deep",
    border: "border-gold/40",
    progress: "bg-gold-bright",
  },
  warning: {
    number: "text-warning-deep",
    border: "border-warning/50",
    progress: "bg-warning",
  },
  alert: {
    number: "text-alert-deep",
    border: "border-alert/50",
    progress: "bg-alert",
  },
};

const selectTriggerClass =
  "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 text-left font-body text-base text-paper whitespace-normal shadow-none outline-none transition-colors hover:border-paper/30 focus-visible:border-gold focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold data-[state=open]:border-gold";

export function DeadlineCalculator() {
  const { deadlineType, setDeadlineType } = useCaseType();
  const [date, setDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const rule = deadlineRules[deadlineType];
  const result = useMemo(() => calculateDeadline(rule, date), [date, rule]);
  const tone = toneClasses[result.tone];
  const maximumDate =
    "mode" in rule && rule.mode === "before-due-date"
      ? undefined
      : startOfToday();
  const selectedDate = parseDateInput(date);

  return (
    <motion.div
      className="grid grid-cols-1 items-start gap-[clamp(24px,3vw,40px)] min-[880px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.div
        className="flex min-w-0 flex-col gap-5 rounded-md border border-paper/15 bg-ink-2 p-[clamp(18px,3vw,36px)] min-[521px]:p-[clamp(24px,3vw,36px)]"
        variants={fadeUp}
      >
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="calc-tipo">
            Qual problema você está enfrentando?
          </label>
          <Select
            value={deadlineType}
            onValueChange={(value) => {
              if (isDeadlineId(value)) setDeadlineType(value);
            }}
          >
            <SelectTrigger
              id="calc-tipo"
              className={selectTriggerClass}
              style={{ height: "auto" }}
            >
              <span className="min-w-0 flex-1 text-left whitespace-normal">
                {rule.optionLabel}
              </span>
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-w-[min(92vw,32rem)]"
            >
              {deadlineOptions.map((option) => (
                <SelectItem value={option.id} key={option.id}>
                  {option.optionLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </p>
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="calc-data">
            {rule.dateLabel}
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                id="calc-data"
                type="button"
                className={`${inputClass} flex items-center justify-between gap-2 text-left`}
              >
                <span className={date ? "" : "text-paper/40"}>
                  {date ? formatDateInputPtBr(date) : "dd/mm/aaaa"}
                </span>
                <CalendarIcon
                  className="size-4.5 shrink-0 text-paper/50"
                  aria-hidden="true"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={ptBR}
                captionLayout="dropdown"
                selected={selectedDate ?? undefined}
                defaultMonth={selectedDate ?? maximumDate ?? undefined}
                disabled={maximumDate ? { after: maximumDate } : undefined}
                onSelect={(selected) => {
                  setDate(selected ? toLocalIsoDate(selected) : "");
                  setCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </p>
        <p className="text-[13.5px] leading-[1.6] text-paper/60">{rule.hint}</p>
      </motion.div>

      <motion.div
        className={`flex min-w-0 flex-col gap-5 rounded-md border bg-ink-2 p-[clamp(18px,3vw,36px)] transition-colors min-[521px]:p-[clamp(24px,3vw,36px)] ${tone.border}`}
        variants={fadeUp}
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="flex flex-wrap items-baseline gap-3.5">
          <span
            className={`font-heading text-[clamp(42px,5.4vw,64px)] leading-none font-normal tabular-nums transition-colors ${tone.number}`}
          >
            {result.number}
          </span>
          <span className="font-heading text-xl font-normal text-paper">
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
      </motion.div>
    </motion.div>
  );
}
