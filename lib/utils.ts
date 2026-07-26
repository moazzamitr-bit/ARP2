import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function required(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validEmail(value: FormDataEntryValue | null) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
