import { LocationsExplorer } from "@/components/locations/LocationsExplorer";
import { Container } from "@/components/ui/Section";
import { site } from "@/content/site";
import { storeBranches } from "@/content/storeNetwork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Find ARP Near You",
  "Explore ARP showrooms, partner stores and service points across Dubai, Abu Dhabi, Sharjah and Al Ain — with opening hours, directions and contact details.",
  "/locations",
);

export default function LocationsPage() {
  const localBusinessJsonLd = storeBranches.map((store) => ({
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: store.name,
    address: store.address,
    telephone: store.phone,
    areaServed: store.city,
    url: `${site.domain}/locations`,
  }));

  return (
    <section className="locations-page">
      <Container>
        <LocationsExplorer
          intro={
            <div className="locations-intro">
              <div className="breadcrumb">Home / Locations</div>
              <p className="proposal-eyebrow">
                <span className="proposal-eyebrow-rule" aria-hidden="true" />
                Always Close To You
              </p>
              <h1>Find ARP Near You</h1>
              <p className="locations-lede">
                Explore our showrooms, partners, and service points across the UAE.
              </p>
            </div>
          }
        />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </section>
  );
}
