"use client";

import { type FormEvent, useState } from "react";

import {
  createWhatsappUrl,
  sanitizeMessage,
} from "@/lib/contact";
import {
  buttonGold,
  fieldClass,
  inputClass,
  labelClass,
} from "@/styles/classes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const contactCaseOptions = [
  { id: "pix", label: "Golpe no Pix" },
  { id: "cartao", label: "Cartão de crédito" },
  { id: "compra-online", label: "Compra online" },
  { id: "conta-credito", label: "Conta invadida ou empréstimo" },
  { id: "outro", label: "Outro" },
] as const;

type ContactCaseId = (typeof contactCaseOptions)[number]["id"];
type FieldName = "name" | "phone" | "report";

const selectTriggerClass =
  "flex min-h-[52px] w-full items-center justify-between gap-2 rounded-sm border border-paper/15 bg-ink-3 px-[15px] py-3 text-left font-body text-[14.5px] leading-[1.5] text-paper whitespace-normal shadow-none outline-none transition-colors hover:border-paper/30 focus-visible:border-gold focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold data-[state=open]:border-gold";

function isContactCaseId(value: string): value is ContactCaseId {
  return contactCaseOptions.some((option) => option.id === value);
}

export function ContactForm() {
  const [caseType, setCaseType] = useState<ContactCaseId>("pix");
  const [invalidFields, setInvalidFields] = useState<Set<FieldName>>(new Set());
  const [status, setStatus] = useState("");
  const selectedCaseLabel =
    contactCaseOptions.find((option) => option.id === caseType)?.label ??
    contactCaseOptions[0].label;

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

    const message = [
      "Olá! Vim pelo site da Maestri Advocacia.",
      "",
      `*Nome:* ${values.name}`,
      `*WhatsApp:* ${values.phone}`,
      `*Tipo de caso:* ${selectedCaseLabel}`,
      "",
      "*O que aconteceu:*",
      values.report,
    ].join("\n");

    const whatsappUrl = createWhatsappUrl(message);
    if (!whatsappUrl) {
      setStatus("O número de WhatsApp ainda não foi configurado neste site.");
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("Abrimos o WhatsApp com sua mensagem preenchida.");
    form.reset();
    setCaseType("pix");
  };

  return (
    <form
      className="reveal flex min-w-0 flex-col gap-[18px] rounded-md border border-paper/15 bg-ink-2 p-[clamp(18px,3vw,38px)] min-[521px]:p-[clamp(24px,3vw,38px)]"
      data-reveal="rise"
      aria-describedby="form-privacy"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className={fieldClass}>
        <label className={labelClass} htmlFor="f-nome">Seu nome</label>
        <input className={inputClass} id="f-nome" name="nome" type="text" autoComplete="name" maxLength={120} required aria-invalid={invalidFields.has("name")} onInput={() => clearInvalid("name")} />
      </p>
      <p className={fieldClass}>
        <label className={labelClass} htmlFor="f-fone">WhatsApp</label>
        <input className={inputClass} id="f-fone" name="fone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} required aria-invalid={invalidFields.has("phone")} onInput={() => clearInvalid("phone")} />
      </p>
      <p className={fieldClass}>
        <label className={labelClass} htmlFor="f-tipo">Tipo de caso</label>
        <Select value={caseType} onValueChange={(value) => { if (isContactCaseId(value)) setCaseType(value); }}>
          <SelectTrigger id="f-tipo" className={selectTriggerClass} style={{ height: "auto" }}>
            <span className="min-w-0 flex-1 text-left whitespace-normal">{selectedCaseLabel}</span>
          </SelectTrigger>
          <SelectContent position="popper" className="max-w-[min(92vw,32rem)]">
            {contactCaseOptions.map((option) => (
              <SelectItem value={option.id} key={option.id}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </p>
      <p className={fieldClass}>
        <label className={labelClass} htmlFor="f-relato">O que aconteceu</label>
        <textarea className={`${inputClass} min-h-[136px] resize-y`} id="f-relato" name="relato" rows={5} maxLength={2_000} required aria-invalid={invalidFields.has("report")} onInput={() => clearInvalid("report")} />
      </p>
      <button className={`${buttonGold} flex min-h-[58px] w-full text-[16.5px]`} type="submit">
        Enviar pelo WhatsApp
      </button>
      {status ? (
        <p className="text-[14.5px] leading-[1.6] text-gold-bright" role="status" aria-live="polite">{status}</p>
      ) : null}
      <p className="text-[13.5px] leading-[1.64] text-paper/60" id="form-privacy">
        Seus dados são usados apenas para compor a mensagem no seu dispositivo. Nada é armazenado neste site.
      </p>
    </form>
  );
}
