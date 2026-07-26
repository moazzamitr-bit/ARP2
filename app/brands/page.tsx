import { Suspense } from "react";
import { BrandFilter } from "@/components/brands/BrandFilter";
import { Container, Section } from "@/components/ui/Section";
import { SkylineArt } from "@/components/ui/SkylineArt";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Official Brands We Distribute",
  "Explore the approved sports brands represented by ARP across wholesale, retail and reseller channels in the UAE.",
  "/brands",
);

export default function BrandsPage() {
  return (
    <>
      <section className="page-hero brands-page-hero proposal-brands-hero">
        <div className="brands-hero-bg" aria-hidden="true">
          <img src="/assets/samples/heroes/dubai-skyline.webp" alt="dubai-skyline" />
        </div>
        <Container>
          <div className="brands-page-intro">
            <span className="title-accent-line" aria-hidden="true" />
            <h1>
              Official Brands
              <br />
              We Distribute
            </h1>
            <p>
              Curated global brands. Trusted performance.
              <br />
              Proudly distributed across the UAE.
            </p>
          </div>
        </Container>
      </section>
      <Section className="proposal-brands-section">
        <Suspense fallback={<p>Loading brands…</p>}>
          <BrandFilter />
        </Suspense>
      </Section>
    </>
  );
}
