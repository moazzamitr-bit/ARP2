import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function PageHero({
  title,
  body,
  image,
  label,
  primary,
  secondary,
  className,
}: {
  title: string;
  body: string;
  image?: string;
  label?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section className={cn("page-hero", className)}>
      <Container>
        <div className="breadcrumb">Home / {title.split(" ")[0]}</div>
        <div className="hero-grid">
          <div className="hero-copy">
            {label ? <p className="eyebrow">{label}</p> : null}
            <h1>{highlightGreen(title)}</h1>
            <p>{body}</p>
            {primary || secondary ? (
              <div className="hero-actions">
                {primary ? <LinkButton href={primary.href}>{primary.label}</LinkButton> : null}
                {secondary ? (
                  <LinkButton href={secondary.href} variant="secondary">
                    {secondary.label}
                  </LinkButton>
                ) : null}
              </div>
            ) : null}
          </div>
          {image ? (
            <div className="hero-image">
              <Image src={image} alt="" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function highlightGreen(title: string) {
  const targets = ["UAE", "1969", "Partner", "Branches", "Distribute"];
  const target = targets.find((word) => title.includes(word));
  if (!target) return title;
  const [before, after] = title.split(target);
  return (
    <>
      {before}
      <span>{target}</span>
      {after}
    </>
  );
}
