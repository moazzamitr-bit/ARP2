import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  text,
  className,
  compact = false,
  src,
}: {
  text: string;
  className?: string;
  compact?: boolean;
  src?: string;
}) {
  if (src) {
    return (
      <span
        className={cn("brand-logo brand-logo-image", className, compact && "brand-logo-compact")}
        aria-label={text}
      >
        <Image
          src={src}
          alt=""
          width={compact ? 120 : 180}
          height={compact ? 40 : 56}
          className="brand-logo-img"
        />
      </span>
    );
  }

  return (
    <span className={cn("brand-logo", className, compact && "brand-logo-compact")} aria-label={text}>
      {text}
    </span>
  );
}
