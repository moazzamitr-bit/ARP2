import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-shell", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionIntro({
  label,
  title,
  body,
  align = "left",
}: {
  label?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("section-intro", align === "center" && "section-intro-center")}>
      {label ? <p className="eyebrow">{label}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
