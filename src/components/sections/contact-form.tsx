"use client";

import { type FormEvent, useState } from "react";

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
import { formatDateInputPtBr, startOfToday, toLocalIsoDate } from "@/lib/date";
import {
  buttonGold,
  fieldClass,
  inputClass,
  labelClass,
} from "@/styles/classes";

type FieldName = "name" | "phone" | "report";

export function ContactForm() {
  const { contactCaseType, setContactCaseType } = useCaseType();
  const [invalidFields, setInvalidFields] = useState<Set<FieldName>>(new Set());
  const [status, setStatus] = useState("");
  const selectedCaseLabel =
    contactCaseType === "outro"
      ? "Outro"
      : deadlineRules[contactCaseType].optionLabel;

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
          <span className="relative block min-w-0">
            <select
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer bg-ink-3 text-paper opacity-0 [color-scheme:dark] [&>option]:bg-ink-3 [&>option]:text-paper"
              id="f-tipo"
              name="tipo"
              value={contactCaseType}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "outro" || isDeadlineId(value)) {
                  setContactCaseType(value);
                }
              }}
            >
              {deadlineOptions.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.optionLabel}
                </option>
              ))}
              <option value="outro">Outro</option>
            </select>
            <span
              className={`${inputClass} pointer-events-none flex h-auto min-w-0 items-center whitespace-normal wrap-break-word py-2.5 pr-12 text-[clamp(12.5px,0.9vw,13.5px)] leading-[1.4] peer-hover:border-paper/30 peer-focus-visible:border-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold`}
              aria-hidden="true"
            >
              {selectedCaseLabel}
            </span>
            <span
              className="pointer-events-none absolute top-1/2 right-[18px] size-2 -translate-y-[70%] rotate-45 border-r-2 border-b-2 border-paper"
              aria-hidden="true"
            />
          </span>
        </p>
        <p className={fieldClass}>
          <label className={labelClass} htmlFor="f-quando">
            Quando aconteceu
          </label>
          <input
            className={inputClass}
            id="f-quando"
            name="quando"
            type="date"
            max={toLocalIsoDate(startOfToday())}
          />
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
