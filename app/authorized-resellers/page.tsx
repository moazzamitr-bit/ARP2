import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Authorized Resellers",
  "Shop ARP-distributed sports brands through verified retail and marketplace partners across the UAE.",
  "/authorized-resellers",
);

const primaryPartners = [
  { name: "Go Sport", src: "/assets/revisions/resellers/go-sport.png", note: "Sports retail" },
  { name: "Lulu", src: "/assets/revisions/resellers/lulu.png", note: "Hypermarket network" },
  { name: "Decathlon", src: "/assets/revisions/resellers/decathlon.png", note: "Sports retail" },
];

const partnerNetwork = [
  { name: "ADLER", src: "/assets/revisions/resellers/adler.png" },
  { name: "Amazon", src: "/assets/revisions/resellers/amazon.png" },
  { name: "Noon", src: "/assets/revisions/resellers/noon.png" },
  { name: "Cosmos", src: "/assets/revisions/resellers/cosmos.png" },
];

export default function AuthorizedResellersPage() {
  return (
    <main className="revision-resellers-page">
      <section className="revision-reseller-hero">
        <Container>
          <div>
            <p className="revision-section-kicker">Verified retail network</p>
            <h1>Authorized Resellers</h1>
            <p>Buy genuine ARP-distributed products through the UAE&apos;s trusted sports retailers and marketplaces.</p>
          </div>
          <span className="revision-auth-badge"><ShieldCheck size={22} aria-hidden="true" /> Official partner network</span>
        </Container>
      </section>

      <section className="revision-reseller-network">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Featured partners</p>
            <h2>Find us at leading retailers</h2>
            <p>Our largest retail partners are shown first for quick access and clear recognition.</p>
          </div>
          <div className="revision-reseller-primary">
            {primaryPartners.map((partner) => (
              <article className="revision-reseller-logo" key={partner.name}>
                <Image src={partner.src} alt={`${partner.name} logo`} width={260} height={120} unoptimized />
                <small>{partner.note}</small>
              </article>
            ))}
          </div>
          <div className="revision-reseller-secondary" aria-label="Additional authorized resellers">
            {partnerNetwork.map((partner) => (
              <article className="revision-reseller-logo" key={partner.name}>
                <Image src={partner.src} alt={`${partner.name} logo`} width={220} height={92} unoptimized />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="revision-reseller-help">
        <Container>
          <div>
            <p className="revision-section-kicker">Need help finding a product?</p>
            <h2>Ask the ARP team</h2>
            <p>Tell us the brand and product you need. We&apos;ll direct you to a suitable branch or reseller.</p>
          </div>
          <div className="revision-hero-actions">
            <a className="revision-button revision-button-primary" href="https://wa.me/971526347429?text=Hello%20ARP%20Group%2C%20please%20help%20me%20find%20a%20product." target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
            <Link className="revision-button" href="/locations">Official Branches</Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
