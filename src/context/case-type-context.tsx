"use client";

import { createContext, useContext, useMemo, useState } from "react";

import type { DeadlineId } from "@/domain/deadlines/types";

type ContactCaseId = DeadlineId | "outro";

interface CaseTypeContextValue {
  deadlineType: DeadlineId;
  contactCaseType: ContactCaseId;
  setDeadlineType: (value: DeadlineId) => void;
  setContactCaseType: (value: ContactCaseId) => void;
}

const CaseTypeContext = createContext<CaseTypeContextValue | null>(null);

export function CaseTypeProvider({ children }: { children: React.ReactNode }) {
  const [deadlineType, setDeadlineTypeState] = useState<DeadlineId>("pix");
  const [contactCaseType, setContactCaseTypeState] =
    useState<ContactCaseId>("pix");
  const value = useMemo(
    () => ({
      deadlineType,
      contactCaseType,
      setDeadlineType(value: DeadlineId) {
        setDeadlineTypeState(value);
        setContactCaseTypeState(value);
      },
      setContactCaseType(value: ContactCaseId) {
        setContactCaseTypeState(value);
        if (value !== "outro") setDeadlineTypeState(value);
      },
    }),
    [contactCaseType, deadlineType],
  );

  return (
    <CaseTypeContext.Provider value={value}>{children}</CaseTypeContext.Provider>
  );
}

export function useCaseType(): CaseTypeContextValue {
  const context = useContext(CaseTypeContext);
  if (!context) {
    throw new Error("useCaseType deve ser usado dentro de CaseTypeProvider.");
  }
  return context;
}
