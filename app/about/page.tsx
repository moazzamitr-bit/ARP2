import {
  Award,
  Building2,
  CalendarDays,
  FileCheck2,
  Globe,
  Handshake,
  Quote,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import { ChannelPartnersCarousel } from "@/components/revision/RevisionBlocks";
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
  "Learn about ARP's operating history, values, channel partners and official distribution credentials.",
  "/about",
);

const timelineIcons = [CalendarDays, Handshake, Globe, Building2, Rocket];
const valueIcons = [Target, ShieldCheck, Users, Star];
const documents = [
  { title: "Partnership Agreements", detail: "Formal agreements with international sporting-goods partners.", icon: Handshake },
  { title: "Distributor Certificates", detail: "Official distributor appointment and authorization records.", icon: Award },
  { title: "Yonex Documentation", detail: "Partnership documentation supporting ARP's Yonex relationship.", icon: FileCheck2 },
  { title: "International Brand Approvals", detail: "Approvals and credentials from ARP's global brand portfolio.", icon: Globe },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero-proposal proposal-about">
        <Container>
          <div className="breadcrumb">Home / About Us</div>
          <div className="proposal-about-hero">
            <div className="proposal-about-copy">
              <p className="proposal-eyebrow"><span className="proposal-eyebrow-rule" aria-hidden="true" />{aboutContent.hero.eyebrow}</p>
              <h1>{aboutContent.hero.titleLead}<br /><span>{aboutContent.hero.titleAccent}</span></h1>
              <p>{aboutContent.hero.body}</p>
            </div>
            <HeroVisual className="proposal-about-visual" src={site.assets.aboutHero} alt="ARP building and UAE skyline" objectPosition="center right" priority sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <div className="proposal-about-metrics"><Metrics /></div>
        </Container>
      </section>

      <section className="revision-ceo">
        <Container>
          <div className="revision-ceo-card">
            <div className="revision-ceo-mark" aria-hidden="true"><Quote size={36} /></div>
            <div>
              <p className="revision-section-kicker">Leadership</p>
              <h2>Message from the CEO</h2>
              <p>For more than five decades, ARP has grown through trust, long-term partnerships and a shared passion for sport. We remain committed to bringing authentic global brands, dependable service and new opportunities to athletes, retailers and communities across the UAE.</p>
              <small>Final approved CEO message and portrait can be added here when supplied.</small>
            </div>
          </div>
        </Container>
      </section>

      <Section id="timeline" className="revision-about-timeline">
        <div className="revision-section-head">
          <p className="revision-section-kicker">Our journey</p>
          <h2>Milestones that define our legacy</h2>
          <p>More than fifty years of steady growth, official partnerships and service to the UAE sports community.</p>
        </div>
        <div className="revision-timeline">
          {aboutContent.timeline.map((item, index) => {
            const Icon = timelineIcons[index] ?? Building2;
            return (
              <article key={item.year}>
                <div className="revision-timeline-icon"><Icon size={22} aria-hidden="true" /></div>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <section className="revision-channel-partners">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Channel partners</p>
            <h2>Trusted across the UAE retail network</h2>
            <p>Our brands reach customers through leading sports retailers, hypermarkets and marketplaces.</p>
          </div>
          <ChannelPartnersCarousel />
        </Container>
      </section>

      <section className="revision-documents">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Official credentials</p>
            <h2>Partnerships built on formal trust</h2>
            <p>A dedicated gallery for ARP&apos;s agreements, distributor certificates and official international brand approvals.</p>
          </div>
          <div className="revision-document-grid">
            {documents.map((document) => {
              const Icon = document.icon;
              return (
                <article key={document.title}>
                  <span><Icon size={28} aria-hidden="true" /></span>
                  <h3>{document.title}</h3>
                  <p>{document.detail}</p>
                  <small>Approved document image to be added</small>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

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
              return <Panel key={value.title} className="value-card"><Icon size={26} aria-hidden="true" /><h3>{value.title}</h3><p>{value.body}</p></Panel>;
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
