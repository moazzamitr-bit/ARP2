import { Building2, Check, PackageCheck, Store } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { SkylineArt } from "@/components/ui/SkylineArt";
import { solutionsContent } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Wholesale, Retail & Institutional Supply",
  "ARP business solutions for retailers, wholesale buyers and institutional sports supply across the UAE.",
  "/solutions",
);

const icons = [Store, PackageCheck, Building2];

export default function SolutionsPage() {
  return (
    <>
      <section className="page-hero solutions-hero">
        <div className="faq-hero-bg" aria-hidden="true">
          <img src="/assets/samples/heroes/dubai-skyline.webp" alt="dubai-skyline" />
        </div>
        <Container>
          <div className="breadcrumb">Home / Solutions</div>
          <div className="sports-hero-copy">
            <p className="proposal-eyebrow">
              <span className="proposal-eyebrow-rule" aria-hidden="true" />
              {solutionsContent.hero.eyebrow}
            </p>
            <h1>
              {solutionsContent.hero.titleLead} <span>{solutionsContent.hero.titleAccent}</span>
            </h1>
            <p>{solutionsContent.hero.body}</p>
            <div className="hero-actions">
              <LinkButton href="/wholesale">Become a Retailer</LinkButton>
              <LinkButton href="/faq" variant="secondary">
                Help Centre
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="solutions-grid">
          {solutionsContent.pathways.map((pathway, index) => {
            const Icon = icons[index] ?? Store;
            return (
              <Panel key={pathway.title} className="solutions-card solutions-card-modern">
                <span className="sports-card-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <p className="solutions-card-audience">{pathway.audience}</p>
                <h2>{pathway.title}</h2>
                <p>{pathway.description}</p>
                <ul className="solutions-card-points">
                  {pathway.points.map((point) => (
                    <li key={point}>
                      <Check size={15} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <LinkButton href={pathway.href} variant={index === 0 ? "primary" : "secondary"}>
                  {pathway.cta}
                </LinkButton>
              </Panel>
            );
          })}
        </div>
      </Section>

      <Section className="surface-band">
        <SectionIntro label="How it works" title="From application to first order in three steps." />
        <div className="process-row">
          {solutionsContent.process.map((item) => (
            <Panel key={item.step} className="process-step">
              <em>{item.step}</em>
              <span>{item.title}</span>
              <p className="process-step-detail">{item.detail}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <div className="solutions-highlights">
          <div>
            <p className="eyebrow">Why partner through ARP</p>
            <h2>Commercial pathways built for trust and scale.</h2>
          </div>
          <ul className="check-list">
            {solutionsContent.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
