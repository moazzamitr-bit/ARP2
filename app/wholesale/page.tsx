import { BadgeCheck, Box, ClipboardCheck, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import { ResellerForm } from "@/components/forms/ResellerForm";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Panel } from "@/components/ui/Panel";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Become an ARP Retail Partner",
  "Apply to work with ARP for official products, reliable supply, brand support and long-term wholesale partnership.",
  "/wholesale",
);

const benefits = [
  {
    title: "Official Products",
    body: "Access 100% authentic products from global brands we represent.",
    Icon: ShieldCheck,
  },
  {
    title: "Reliable Supply",
    body: "Consistent stock availability and efficient nationwide delivery.",
    Icon: Box,
  },
];

const legacyProof = [
  { value: "55+", label: "Years of Experience", Icon: ShieldCheck },
  { value: "Official", label: "Distribution Partner", Icon: BadgeCheck },
  { value: "3", label: "Strategic Locations", detail: "Across UAE", Icon: MapPin },
];

export default function WholesalePage() {
  return (
    <>
      <section id="benefits" className="wholesale-first">

        <Container>
          <div className="breadcrumb">Home / Partner With Us / Application</div>

          <div className="contentwholesalevisPar">
            <HeroVisual
              className="wholesale-visual"
              src={site.assets.wholesaleHero}
              alt=""
              objectPosition="center right"
              priority
              sizes="100vw"
            />
            <div className="contentwholesalevis">
              <p className="proposal-eyebrow">
                <span className="proposal-eyebrow-rule" aria-hidden="true" />
                Partner With ARP
              </p>
              <h1>
                Become an
                <br />
                ARP <span>Retail Partner</span>
              </h1>
              <p>
                Join a trusted legacy of distribution excellence in the UAE. Grow your business with
                world-class brands, reliable supply, and dedicated partner support.
              </p>
            </div>
          </div>



          <div className="wholesale-first-grid">
            <div className="wholesale-copy">
              <div className="benefit-column compact-benefits">
                {benefits.map(({ title, body, Icon }) => (
                  <Panel key={title} className="benefit-card">
                    <Icon size={28} aria-hidden="true" />
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </Panel>
                ))}
              </div>

              <Panel className="legacy-stack">
                <p className="legacy-stack-label">A Legacy You Can Trust</p>
                <ul>
                  {legacyProof.map(({ value, label, detail, Icon }) => (
                    <li key={value}>
                      <span className="legacy-stack-icon" aria-hidden="true">
                        <Icon size={17} />
                      </span>
                      <span className="legacy-stack-copy">
                        <strong>{value}</strong>
                        <small>{label}</small>
                        {detail ? <small>{detail}</small> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>

            <Panel id="application" className="form-panel first-form">
              <h2>Partner &amp; Reseller Application</h2>
              <p>
                Complete the form below and <strong>our team will get in touch with you.</strong>
              </p>
              <ResellerForm />
            </Panel>
          </div>
        </Container>
      </section>

      <Section className="surface-band">
        <SectionIntro label="Process" title="A simple three-step application path." />
        <div className="process-row">
          {[
            { step: "1", title: "Submit Application", Icon: ClipboardCheck },
            { step: "2", title: "ARP Reviews the Request", Icon: ShieldCheck },
            { step: "3", title: "Commercial Team Contacts You", Icon: PhoneCall },
          ].map(({ step, title, Icon }) => (
            <Panel key={title} className="process-step">
              <Icon size={24} aria-hidden="true" />
              <em>{step}</em>
              <span>{title}</span>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
