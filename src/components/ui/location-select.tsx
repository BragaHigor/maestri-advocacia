"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";
import { DropdownMenu } from "radix-ui";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

type LocationSelectProps = Omit<ComponentProps<"button">, "value" | "onChange"> & {
  value: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onValueChange: (value: string) => void;
};

// Select locks document scrolling. A non-modal radio menu keeps the page usable.
export function LocationSelect({ value, placeholder, options, onValueChange, disabled = false, ...props }: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closedByScroll = useRef(false);
  const selected = options.find((option) => option.value === value);
  const canOpen = !disabled && options.length > 0;

  useEffect(() => {
    if (!open || !canOpen) return;
    const closeOnPageScroll = () => {
      closedByScroll.current = true;
      setOpen(false);
    };
    // Window receives document scrolling, not scrolling inside the options list.
    window.addEventListener("scroll", closeOnPageScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnPageScroll);
  }, [open, canOpen]);

  return (
    <DropdownMenu.Root modal={false} open={open && canOpen} onOpenChange={(nextOpen) => {
      if (nextOpen) closedByScroll.current = false;
      setOpen(nextOpen && canOpen);
    }}>
      <DropdownMenu.Trigger asChild disabled={!canOpen}>
        <button ref={triggerRef} type="button" disabled={!canOpen} data-placeholder={selected ? undefined : ""} {...props}>
          <span className="min-w-0 flex-1 whitespace-normal">{selected?.label ?? placeholder}</span>
          <ChevronDownIcon className="size-4 shrink-0 opacity-50" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      {canOpen ? <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          collisionPadding={16}
          hideWhenDetached
          onCloseAutoFocus={(event) => {
            if (!closedByScroll.current) return;
            event.preventDefault();
            triggerRef.current?.focus({ preventScroll: true });
            closedByScroll.current = false;
          }}
          aria-labelledby={props.id ? `${props.id}-label` : undefined}
          className="location-options z-50 w-[var(--radix-dropdown-menu-trigger-width)] max-w-[calc(100vw-32px)] max-h-[min(320px,var(--radix-dropdown-menu-content-available-height))] overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none"
        >
          <DropdownMenu.RadioGroup value={value} onValueChange={onValueChange}>
            {options.map((option) => (
              <DropdownMenu.RadioItem
                key={option.value}
                value={option.value}
                textValue={option.label}
                className="relative flex min-h-9 cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm whitespace-normal outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
              >
                {option.label}
                <DropdownMenu.ItemIndicator className="absolute right-2">
                  <CheckIcon className="size-4 text-gold" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal> : null}
    </DropdownMenu.Root>
  );
}
