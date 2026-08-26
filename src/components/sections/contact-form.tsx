"use client";

import { type FormEvent, useState } from "react";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useCaseType } from "@/context/case-type-context";
import {
  deadlineOptions,
  deadlineRules,
  isDeadlineId,
} from "@/domain/deadlines/data";
import {
  createEmailUrl,
  createWhatsappUrl,
  sanitizeMessage,
} from "@/lib/contact";
import {
  formatDateInputPtBr,
  parseDateInput,
  startOfToday,
  toLocalIsoDate,
} from "@/lib/date";
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

type FieldName = "name" | "phone" | "report";

const wrapSelectTriggerClass =
  "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 text-left font-body text-[14.5px] leading-[1.5] text-paper whitespace-normal shadow-none outline-none transition-colors hover:border-paper/30 focus-visible:border-gold focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold data-[state=open]:border-gold";

export function ContactForm() {
  const { contactCaseType, setContactCaseType } = useCaseType();
  const [invalidFields, setInvalidFields] = useState<Set<FieldName>>(new Set());
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const selectedCaseLabel =
    contactCaseType === "outro"
      ? "Outro"
      : deadlineRules[contactCaseType].optionLabel;
  const selectedDate = parseDateInput(date);
  const maximumDate = startOfToday();

  const clearInvalid = (field: FieldName) => {
    setInvalidFields((current) => {
      if (!current.has(field)) return current;
      const next = new Set(current);
      next.delete(field);
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
    const nextInvalid = new Set<FieldName>();
    if (!values.name) nextInvalid.add("name");
    if (!values.phone) nextInvalid.add("phone");
    if (!values.report) nextInvalid.add("report");
    setInvalidFields(nextInvalid);

    if (nextInvalid.size > 0) {
      const first = nextInvalid.values().next().value as FieldName;
      const firstInvalidElement = form.elements.namedItem(
        first === "name" ? "nome" : first === "phone" ? "fone" : "relato",
      );
      if (firstInvalidElement instanceof HTMLElement) {
        firstInvalidElement.focus();
      }
      setStatus("Preencha os campos obrigatórios destacados.");
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
  };

  return (
    <form
      className="reveal flex min-w-0 flex-col gap-[18px] rounded-md border border-paper/15 bg-ink-2 p-[clamp(18px,3vw,38px)] min-[521px]:p-[clamp(24px,3vw,38px)]"
      data-reveal="rise"
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
            maxLength={120}
            required
            aria-invalid={invalidFields.has("name")}
            onInput={() => clearInvalid("name")}
          />
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
            inputMode="tel"
            maxLength={30}
            placeholder="(00) 00000-0000"
            required
            aria-invalid={invalidFields.has("phone")}
            onInput={() => clearInvalid("phone")}
          />
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(178px,1fr))] gap-[18px]">
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="f-tipo">
            Tipo de caso
          </label>
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
                defaultMonth={selectedDate ?? maximumDate}
                disabled={{ after: maximumDate }}
                onSelect={(selected) => {
                  setDate(selected ? toLocalIsoDate(selected) : "");
                  setCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
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
          maxLength={2_000}
          required
          placeholder="Em poucas linhas: descreva o que aconteceu, o valor envolvido e o que a empresa ou o banco respondeu até agora."
          aria-invalid={invalidFields.has("report")}
          onInput={() => clearInvalid("report")}
        />
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
    </form>
  );
}
