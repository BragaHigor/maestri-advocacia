"use client";

import { type FormEvent, useState } from "react";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useCaseType } from "@/context/case-type-context";
import {
  deadlineOptions,
  deadlineRules,
  isDeadlineId,
} from "@/domain/deadlines/data";
import {
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_REPORT_MAX_LENGTH,
  CONTACT_REPORT_MIN_LENGTH,
  createEmailUrl,
  createWhatsappUrl,
  formatBrazilianPhone,
  isValidBrazilianPhone,
  isValidContactName,
  isValidContactReport,
  sanitizeMessage,
} from "@/lib/contact";
import {
  formatDateInputPtBr,
  parseDateInput,
  startOfToday,
  toLocalIsoDate,
} from "@/lib/date";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import {
  buttonGold,
  fieldClass,
  inputClass,
  labelClass,
} from "@/styles/classes";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type FieldName = "name" | "phone" | "date" | "report";
type FieldErrors = Partial<Record<FieldName, string>>;

const wrapSelectTriggerClass =
  "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 text-left font-body text-[14.5px] leading-[1.5] text-paper whitespace-normal shadow-none outline-none transition-colors hover:border-paper/30 focus-visible:border-gold focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold data-[state=open]:border-gold";

export function ContactForm() {
  const { contactCaseType, setContactCaseType } = useCaseType();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [reportLength, setReportLength] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const selectedCaseLabel =
    contactCaseType === "outro"
      ? "Outro"
      : deadlineRules[contactCaseType].optionLabel;
  const selectedDate = parseDateInput(date);
  const maximumDate = startOfToday();

  const clearInvalid = (field: FieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: sanitizeMessage(String(formData.get("nome") ?? "")),
      phone: sanitizeMessage(String(formData.get("fone") ?? "")),
      date: sanitizeMessage(String(formData.get("quando") ?? "")),
      report: sanitizeMessage(String(formData.get("relato") ?? "")),
    };
    const nextErrors: FieldErrors = {};
    if (!values.name) {
      nextErrors.name = "Informe seu nome.";
    } else if (!isValidContactName(values.name)) {
      nextErrors.name = "Use de 2 a 80 caracteres, sem números ou símbolos.";
    }
    if (!values.phone) {
      nextErrors.phone = "Informe seu WhatsApp com DDD.";
    } else if (!isValidBrazilianPhone(values.phone)) {
      nextErrors.phone = "Digite um número válido com DDD.";
    }
    const occurrenceDate = parseDateInput(values.date);
    if (!values.date || !occurrenceDate) {
      nextErrors.date = "Informe quando o caso aconteceu.";
    } else if (occurrenceDate > maximumDate) {
      nextErrors.date = "A data não pode estar no futuro.";
    }
    if (!values.report) {
      nextErrors.report = "Conte brevemente o que aconteceu.";
    } else if (!isValidContactReport(values.report)) {
      nextErrors.report = `Escreva entre ${CONTACT_REPORT_MIN_LENGTH} e ${CONTACT_REPORT_MAX_LENGTH} caracteres.`;
    }
    setFieldErrors(nextErrors);

    const invalidFieldOrder: FieldName[] = ["name", "phone", "date", "report"];
    const first = invalidFieldOrder.find((field) => nextErrors[field]);
    if (first) {
      const fieldIds: Record<FieldName, string> = {
        name: "f-nome",
        phone: "f-fone",
        date: "f-quando",
        report: "f-relato",
      };
      const firstInvalidElement = form.querySelector(`#${fieldIds[first]}`);
      if (firstInvalidElement instanceof HTMLElement) {
        firstInvalidElement.focus();
      }
      setStatus("Revise os campos destacados antes de continuar.");
      return;
    }

    const formattedDate = formatDateInputPtBr(values.date);
    const caseDetails = [
      `*Nome:* ${values.name}`,
      `*WhatsApp:* ${values.phone}`,
      `*Tipo de caso:* ${selectedCaseLabel}`,
    ];
    if (formattedDate) {
      caseDetails.push(`*Quando aconteceu:* ${formattedDate}`);
    }

    const message = [
      "Olá! Acessei o site da Maestri Advocacia e gostaria de solicitar uma avaliação jurídica inicial do meu caso.",
      "",
      "Seguem abaixo as informações preenchidas:",
      "",
      ...caseDetails,
      "",
      "*Relato do caso:*",
      values.report,
    ].join("\n");

    if (siteConfig.contactDestination === "email") {
      window.location.assign(
        createEmailUrl({
          subject: `Solicitação de avaliação jurídica inicial — ${selectedCaseLabel}`,
          body: message,
        }),
      );
      setStatus("Abrimos seu aplicativo de e-mail com o relato preenchido.");
      form.reset();
      setDate("");
      setReportLength(0);
      return;
    }

    const whatsappUrl = createWhatsappUrl(message);
    if (!whatsappUrl) {
      setStatus("O número de WhatsApp ainda não foi configurado neste site.");
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus(
      "Prontinho! Abrimos o WhatsApp com sua mensagem já preenchida — é só confirmar o envio por lá. Se a janela não abrir, use o número ou e-mail ao lado para falar com a gente.",
    );
    form.reset();
    setDate("");
    setReportLength(0);
  };

  return (
    <motion.form
      className="flex min-w-0 flex-col gap-[18px] rounded-md border border-paper/15 bg-ink-2 p-[clamp(18px,3vw,38px)] min-[521px]:p-[clamp(24px,3vw,38px)]"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      aria-describedby="form-privacy"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(178px,1fr))] gap-[18px]">
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="f-nome">
            Seu nome
          </label>
          <input
            className={inputClass}
            id="f-nome"
            name="nome"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={CONTACT_NAME_MAX_LENGTH}
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "f-nome-error" : undefined}
            onInput={(event) => {
              const value = event.currentTarget.value.slice(0, CONTACT_NAME_MAX_LENGTH);
              event.currentTarget.value = value;
              clearInvalid("name");
            }}
          />
          {fieldErrors.name ? (
            <span className="text-[13px] leading-[1.45] text-alert" id="f-nome-error" role="alert">
              {fieldErrors.name}
            </span>
          ) : null}
        </p>
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="f-fone">
            WhatsApp
          </label>
          <input
            className={inputClass}
            id="f-fone"
            name="fone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={15}
            pattern="[0-9 ()+\-]*"
            placeholder="(00) 00000-0000"
            required
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "f-fone-error" : undefined}
            onKeyDown={(event) => {
              if (
                event.key.length === 1 &&
                !/\d/.test(event.key) &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey
              ) {
                event.preventDefault();
              }
            }}
            onInput={(event) => {
              event.currentTarget.value = formatBrazilianPhone(
                event.currentTarget.value,
              );
              clearInvalid("phone");
            }}
            onPaste={(event) => {
              event.preventDefault();
              event.currentTarget.value = formatBrazilianPhone(
                event.clipboardData.getData("text"),
              );
              clearInvalid("phone");
            }}
            onBlur={(event) => {
              event.currentTarget.value = formatBrazilianPhone(
                event.currentTarget.value,
              );
              clearInvalid("phone");
            }}
          />
          {fieldErrors.phone ? (
            <span className="text-[13px] leading-[1.45] text-alert" id="f-fone-error" role="alert">
              {fieldErrors.phone}
            </span>
          ) : null}
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(178px,1fr))] gap-[18px]">
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="f-tipo">
            Tipo de caso
          </label>
          <input type="hidden" name="tipo" value={contactCaseType} readOnly />
          <Select
            value={contactCaseType}
            onValueChange={(value) => {
              if (value === "outro" || isDeadlineId(value)) {
                setContactCaseType(value);
              }
            }}
          >
            <SelectTrigger
              id="f-tipo"
              className={wrapSelectTriggerClass}
              style={{ height: "auto" }}
              aria-required="true"
            >
              <span className="min-w-0 flex-1 text-left whitespace-normal">
                {selectedCaseLabel}
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
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </p>
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="f-quando">
            Quando aconteceu
          </label>
          <input type="hidden" name="quando" value={date} readOnly />
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                id="f-quando"
                type="button"
                className={`${inputClass} flex items-center justify-between gap-2 text-left ${fieldErrors.date ? "border-alert" : ""}`}
                aria-label="Quando aconteceu (obrigatório)"
                aria-describedby={fieldErrors.date ? "f-quando-error" : undefined}
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
                defaultMonth={selectedDate ?? maximumDate}
                disabled={{ after: maximumDate }}
                onSelect={(selected) => {
                  setDate(selected ? toLocalIsoDate(selected) : "");
                  if (selected) clearInvalid("date");
                  setCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {fieldErrors.date ? (
            <span className="text-[13px] leading-[1.45] text-alert" id="f-quando-error" role="alert">
              {fieldErrors.date}
            </span>
          ) : null}
        </p>
      </div>
      <p className={fieldClass}>
        <label className={labelClass} htmlFor="f-relato">
          O que aconteceu
        </label>
        <textarea
          className={`${inputClass} min-h-[136px] resize-y`}
          id="f-relato"
          name="relato"
          rows={5}
          minLength={CONTACT_REPORT_MIN_LENGTH}
          maxLength={CONTACT_REPORT_MAX_LENGTH}
          required
          placeholder="Em poucas linhas: descreva o que aconteceu, o valor envolvido e o que a empresa ou o banco respondeu até agora."
          aria-invalid={Boolean(fieldErrors.report)}
          aria-describedby={fieldErrors.report ? "f-relato-error f-relato-count" : "f-relato-count"}
          onInput={(event) => {
            const value = event.currentTarget.value.slice(0, CONTACT_REPORT_MAX_LENGTH);
            event.currentTarget.value = value;
            setReportLength(value.length);
            clearInvalid("report");
          }}
        />
        <span className="flex items-start justify-between gap-3 text-[13px] leading-[1.45]">
          {fieldErrors.report ? (
            <span className="text-alert" id="f-relato-error" role="alert">
              {fieldErrors.report}
            </span>
          ) : <span />}
          <span className="ml-auto shrink-0 text-paper/50" id="f-relato-count">
            {reportLength}/{CONTACT_REPORT_MAX_LENGTH}
          </span>
        </span>
      </p>
      <button
        className={`${buttonGold} flex min-h-[58px] w-full text-[16.5px]`}
        type="submit"
      >
        {siteConfig.contactDestination === "email"
          ? "Enviar por e-mail"
          : "Enviar pelo WhatsApp"}
      </button>
      {status ? (
        <p
          className="text-[14.5px] leading-[1.6] text-gold-bright"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      ) : null}
      <p
        className="text-[13.5px] leading-[1.64] text-paper/60"
        id="form-privacy"
      >
        Seus dados são usados apenas para compor a mensagem no seu dispositivo.
        Nada é armazenado neste site. O envio não cria, por si só, relação de
        cliente e advogado.
      </p>
    </motion.form>
  );
}
