import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = {
  children: ReactNode;
  className?: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "id">;

export function Panel({ children, className, id }: PanelProps) {
  return (
    <div id={id} className={cn("panel", className)}>
      {children}
    </div>
  );
}
