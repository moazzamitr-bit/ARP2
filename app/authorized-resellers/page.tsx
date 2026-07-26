import { Award, BadgeCheck, ShieldCheck, UserCheck } from "lucide-react";
import { ResellerDirectory } from "@/components/locations/ResellerDirectory";
import { Container } from "@/components/ui/Section";
import { SkylineArt } from "@/components/ui/SkylineArt";
import { authorizedResellers, officialBranches, verifiedSourceProof } from "@/content/storeNetwork";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Authorized Resellers & Branches",
  "Find ARP official branches and authorized resellers across the UAE. Every listed store is verified for genuine products and trusted after-sales support.",
  "/authorized-resellers",
);

const proofIcons = [BadgeCheck, ShieldCheck, Award, UserCheck];

export default function AuthorizedResellersPage() {
  const networkJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ARP official branches and authorized resellers",
    numberOfItems: officialBranches.length + authorizedResellers.length,
    itemListElement: [...officialBranches, ...authorizedResellers].map((store, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SportingGoodsStore",
        name: store.name,
        address: store.address,
        telephone: store.phone,
        areaServed: store.city,
        url: `${site.domain}/authorized-resellers`,
      },
    })),
  };

  return (
    <>
      <section className="resellers-hero">
        <Container>
          <div className="breadcrumb">Home / Partners / Authorized Resellers &amp; Branches</div>
          <div className="resellers-hero-grid">
            <div className="resellers-hero-copy">
              <h1>
                Authorized Resellers
                <br />
                <span>&amp; Branches</span>
              </h1>
              <p>
                Find ARP official branches or authorized resellers near you. Genuine products. Trusted
                support.
              </p>
            </div>
            <div className="resellers-hero-art" aria-hidden="true">
              <SkylineArt />
            </div>
          </div>
        </Container>
      </section>

      <section className="resellers-directory-section">
        <Container>
          <ResellerDirectory />
        </Container>
      </section>

      <section className="resellers-trust-section">
        <Container>
          <div className="verified-band">
            <span className="verified-band-icon" aria-hidden="true">
              <ShieldCheck size={26} />
            </span>
            <div className="verified-band-copy">
              <h2>Buy from verified sources</h2>
              <p>
                All ARP official branches and authorized resellers are verified to ensure genuine
                products and reliable after-sales support.
              </p>
            </div>
            <ul className="verified-proof">
              {verifiedSourceProof.map((item, index) => {
                const Icon = proofIcons[index] ?? BadgeCheck;
                return (
                  <li key={item.label}>
                    <Icon size={20} aria-hidden="true" />
                    <span>
                      <strong>{item.value}</strong>
                      <small>{item.label}</small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(networkJsonLd) }}
      />
    </>
  );
}
