import { ArrowRight, Building2, Check, ClipboardCheck, PackageCheck, Store, UserCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Container, Section } from "@/components/ui/Section";
import { solutionsContent } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Wholesale, Retail & Institutional Supply",
  "ARP business solutions for retailers, wholesale buyers and institutional sports supply across the UAE.",
  "/solutions",
);

const pathwayIcons = [Store, PackageCheck, Building2];
const processIcons = [ClipboardCheck, UserCheck, PackageCheck];

export default function SolutionsPage() {
  return (
    <>
      <section className="page-hero solutions-hero">
        <div className="faq-hero-bg" aria-hidden="true"><img src="/assets/samples/heroes/dubai-skyline.webp" alt="" /></div>
        <Container>
          <div className="breadcrumb">Home / Solutions</div>
          <div className="sports-hero-copy">
            <p className="proposal-eyebrow"><span className="proposal-eyebrow-rule" aria-hidden="true" />{solutionsContent.hero.eyebrow}</p>
            <h1>{solutionsContent.hero.titleLead} <span>{solutionsContent.hero.titleAccent}</span></h1>
            <p>{solutionsContent.hero.body}</p>
            <div className="hero-actions">
              <LinkButton href="/wholesale">Become a Retailer</LinkButton>
              <LinkButton href="/contact" variant="secondary">Contact ARP</LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="solutions-grid">
          {solutionsContent.pathways.map((pathway, index) => {
            const Icon = pathwayIcons[index] ?? Store;
            return (
              <Panel key={pathway.title} className="solutions-card solutions-card-modern">
                <span className="sports-card-icon" aria-hidden="true"><Icon size={22} /></span>
                <p className="solutions-card-audience">{pathway.audience}</p>
                <h2>{pathway.title}</h2>
                <p>{pathway.description}</p>
                <ul className="solutions-card-points">
                  {pathway.points.map((point) => <li key={point}><Check size={15} aria-hidden="true" />{point}</li>)}
                </ul>
                <LinkButton href={pathway.href} variant={index === 0 ? "primary" : "secondary"}>{pathway.cta}</LinkButton>
              </Panel>
            );
          })}
        </div>
      </Section>

      <section className="revision-process">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">How it works</p>
            <h2>From application to first order</h2>
            <p>A clear, accountable onboarding path with a defined owner at every stage.</p>
          </div>
          <ol className="revision-process-list">
            {solutionsContent.process.map((item, index) => {
              const Icon = processIcons[index] ?? ClipboardCheck;
              return (
                <li key={item.step}>
                  <div className="revision-process-number">{item.step}</div>
                  <div className="revision-process-icon"><Icon size={22} aria-hidden="true" /></div>
                  <div>
                    <span>Step {item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  {index < solutionsContent.process.length - 1 ? <ArrowRight className="revision-process-arrow" size={22} aria-hidden="true" /> : null}
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
    </>
  );
}
