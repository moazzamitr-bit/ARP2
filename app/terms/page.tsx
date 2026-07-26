import { AlertTriangle, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { termsLastUpdated, termsSections } from "@/content/legal";
import { storeSupport } from "@/content/storeNetwork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Terms & Conditions",
  "The terms governing use of the ARP Group website, orders, delivery, returns, warranty and partner accounts in the UAE.",
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <section className="page-hero legal-hero">
        <Container>
          <div className="breadcrumb">Home / Legal / Terms &amp; Conditions</div>
          <div className="legal-hero-copy">
            <span className="title-accent-line" aria-hidden="true" />
            <h1>Terms &amp; Conditions</h1>
            <p>
              The terms that apply when you use this website, place an order, or hold a partner account
              with ARP.
            </p>
            <p className="legal-updated">Last updated: {termsLastUpdated}</p>
          </div>
        </Container>
      </section>

      <Section className="legal-section">
        <div className="legal-layout">
          <aside className="legal-toc">
            <p className="legal-toc-label">On this page</p>
            <ol>
              {termsSections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="legal-body">
            <p className="legal-notice">
              <AlertTriangle size={17} aria-hidden="true" />
              <span>
                This is a drafting starting point prepared for the site build. ARP&apos;s legal counsel
                should review and approve this wording before publication.
              </span>
            </p>

            {termsSections.map((section, index) => (
              <section key={section.id} id={section.id} className="legal-block">
                <h2>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className="legal-contact">
              <h2>Questions about these terms</h2>
              <p>
                Read the <Link href="/faq">help centre</Link> for everyday questions, or reach the team
                directly.
              </p>
              <div className="legal-contact-actions">
                <a className="btn btn-primary" href={storeSupport.phoneHref}>
                  <Phone size={16} aria-hidden="true" />
                  <span>{storeSupport.phone}</span>
                </a>
                <a className="btn btn-secondary" href={`mailto:${storeSupport.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  <span>{storeSupport.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
