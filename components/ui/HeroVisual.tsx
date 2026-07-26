import Image from "next/image";
import { cn } from "@/lib/utils";
import { SkylineArt } from "./SkylineArt";

/**
 * Hero artwork used across the site.
 *
 * The proposal heroes are not plain photographs: the photo sits on a near-white
 * field, fades away at its left edge to reveal a faint line-art skyline, and is
 * crossed by soft diagonal light streaks. Layer order is skyline → photo → streaks.
 */
export function HeroVisual({
  src,
  alt,
  className,
  objectPosition = "right center",
  skyline = true,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 58vw",
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  skyline?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("hero-visual", className)}>
      {skyline ? <SkylineArt className="hero-visual-skyline" /> : null}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="hero-visual-photo"
        style={{ objectPosition }}
      />
      <span className="hero-visual-streaks" aria-hidden="true" />
    </div>
  );
}
