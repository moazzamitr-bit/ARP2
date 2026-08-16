import Image from "next/image";
import { Clock3, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { officialBranches } from "@/content/storeNetwork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "ARP Official Branches",
  "Find the three official ARP branches in Dubai with phone, WhatsApp and directions.",
  "/locations",
);

export default function LocationsPage() {
  return (
    <main className="revision-locations-page">
      <section className="revision-page-hero">
        <Container>
          <p className="revision-section-kicker">Official ARP network</p>
          <h1>Visit an ARP Branch</h1>
          <p>Choose from our three official branches. Each location offers genuine products and direct support from the ARP team.</p>
        </Container>
      </section>

      <section className="revision-branches">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Three official locations</p>
            <h2>Our branches</h2>
          </div>
          <div className="revision-branch-grid">
            {officialBranches.map((branch, index) => {
              const whatsappDigits = branch.whatsapp.replace(/\D/g, "");
              const phoneDigits = branch.phone.replace(/\D/g, "");
              return (
                <article className="revision-branch-card" id={branch.id} key={branch.id}>
                  <div className="revision-branch-image">
                    <Image src={branch.image} alt={branch.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                    <span>Branch {index + 1}</span>
                  </div>
                  <div className="revision-branch-copy">
                    <small>{branch.kind}</small>
                    <h2>{branch.name}</h2>
                    <p><MapPin size={17} aria-hidden="true" /> {branch.address}</p>
                    <p><Clock3 size={17} aria-hidden="true" /> {branch.hoursSummary}</p>
                    <div className="revision-branch-contacts">
                      <a href={`tel:+${phoneDigits}`}>
                        <Phone size={17} aria-hidden="true" />
                        <span><small>Phone Number</small><strong>{branch.phone}</strong></span>
                      </a>
                      <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer">
                        <MessageCircle size={17} aria-hidden="true" />
                        <span><small>WhatsApp Number</small><strong>{branch.whatsapp}</strong></span>
                      </a>
                    </div>
                    <a className="revision-branch-directions" href={branch.directionsUrl} target="_blank" rel="noreferrer"><Navigation size={17} aria-hidden="true" /> Google Maps / Business Location</a>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
