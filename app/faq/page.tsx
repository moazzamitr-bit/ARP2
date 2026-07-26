import { Headphones, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Container, Section } from "@/components/ui/Section";
import { SkylineArt } from "@/components/ui/SkylineArt";
import { faqGroups } from "@/content/faq";
import { storeSupport } from "@/content/storeNetwork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Frequently Asked Questions",
  "Answers on ARP products and authenticity, orders and delivery, wholesale partnership, returns and warranty, and finding a store in the UAE.",
  "/faq",
);

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };

  return (
    <>
      <section className="page-hero faq-hero">
        <div className="faq-hero-bg" aria-hidden="true">
          <SkylineArt />
        </div>
        <Container>
          <div className="breadcrumb">Home / Support / FAQs</div>
          <div className="faq-hero-copy">
            <span className="title-accent-line" aria-hidden="true" />
            <h1>
              Questions?
              <br />
              <span>We Have Answers.</span>
            </h1>
            <p>
              Everything on genuine products, delivery, wholesale partnership and after-sales support —
              in one place.
            </p>
          </div>
        </Container>
      </section>

      <Section className="faq-section">
        <FaqAccordion groups={faqGroups} />
      </Section>

      <Section className="surface-band faq-help-section">
        <div className="faq-help">
          <span className="faq-help-icon" aria-hidden="true">
            <Headphones size={26} />
          </span>
          <div className="faq-help-copy">
            <h2>Still need help?</h2>
            <p>Our team answers calls and emails during branch opening hours.</p>
          </div>
          <div className="faq-help-actions">
            <a className="btn btn-primary" href={storeSupport.phoneHref}>
              <Phone size={16} aria-hidden="true" />
              <span>{storeSupport.phone}</span>
            </a>
            <a className="btn btn-secondary" href={`mailto:${storeSupport.email}`}>
              <Mail size={16} aria-hidden="true" />
              <span>{storeSupport.email}</span>
            </a>
            <Link className="btn btn-secondary" href="/locations">
              <span>Find a Store</span>
            </Link>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
