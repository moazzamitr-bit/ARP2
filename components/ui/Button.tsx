import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  showArrow?: boolean;
};

export function Button({
  className,
  variant = "primary",
  children,
  showArrow = true,
  ...props
}: ButtonProps) {
  return (
    <button className={cn("btn", `btn-${variant}`, className)} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  showArrow?: boolean;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  showArrow = true,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn("btn", `btn-${variant}`, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </Link>
  );
}
