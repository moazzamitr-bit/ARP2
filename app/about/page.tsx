import {
  Building2,
  CalendarDays,
  Globe,
  Handshake,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import { Metrics } from "@/components/sections/Metrics";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Panel } from "@/components/ui/Panel";
import { Container, Section } from "@/components/ui/Section";
import { aboutContent } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Built on Trust Since 1969",
  "Learn about ARP's operating history, values, business model and official sports distribution role in the UAE.",
  "/about",
);

const timelineIcons = [CalendarDays, Handshake, Globe, Building2, Rocket];
const valueIcons = [Target, ShieldCheck, Users, Star];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero-proposal proposal-about">
        <Container>
          <div className="breadcrumb">Home / About Us</div>
          <div className="proposal-about-hero">
            <div className="proposal-about-copy">
              <p className="proposal-eyebrow">
                <span className="proposal-eyebrow-rule" aria-hidden="true" />
                {aboutContent.hero.eyebrow}
              </p>
              <h1>
                {aboutContent.hero.titleLead}
                <br />
                <span>{aboutContent.hero.titleAccent}</span>
              </h1>
              <p>{aboutContent.hero.body}</p>
            </div>
            <HeroVisual
              className="proposal-about-visual"
              src={site.assets.aboutHero}
              alt="ARP building and UAE skyline"
              objectPosition="center right"
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
          <div className="proposal-about-metrics">
            <Metrics />
          </div>
        </Container>
      </section>

      <Section id="timeline" className="surface-band proposal-tight-section">
        <p className="eyebrow">Our Journey</p>
        <h2>Milestones That Define Our Legacy</h2>
        <div className="timeline timeline-about">
          {aboutContent.timeline.map((item, index) => {
            const Icon = timelineIcons[index] ?? Building2;
            return (
              <article key={item.year}>
                <span>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <strong>{item.year}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="values" className="surface-band proposal-tight-section values-section">
        <div className="values-layout">
          <div className="values-intro">
            <p className="eyebrow">Our Purpose</p>
            <h2>Driven by Purpose. Guided by Values.</h2>
            <p>{aboutContent.purpose}</p>
            <LinkButton href="/wholesale">Partner With Us</LinkButton>
          </div>
          <div className="value-grid value-grid-four">
            {aboutContent.values.map((value, index) => {
              const Icon = valueIcons[index] ?? Target;
              return (
                <Panel key={value.title} className="value-card">
                  <Icon size={26} aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </Panel>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
