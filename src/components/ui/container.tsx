import { containerClass } from "@/styles/classes";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${containerClass} ${className}`}>{children}</div>;
}
