import { Clock3, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { contactDetails, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact ARP Group",
  "Contact the ARP Group head office by telephone, WhatsApp or email.",
  "/contact",
);

const whatsappHref = "https://wa.me/971526347429?text=Hello%20ARP%20Group";

export default function ContactPage() {
  return (
    <main className="revision-contact-page">
      <section className="revision-contact-hero">
        <Container>
          <div className="revision-contact-intro">
            <p className="revision-section-kicker">Head office</p>
            <h1>Contact ARP Group</h1>
            <p>Speak directly with our team for product enquiries, wholesale support, venue booking and official brand information.</p>
          </div>

          <div className="revision-contact-card">
            <div className="revision-contact-details">
              <small>Al Raed Pioneers</small>
              <h2>{site.name} Head Office</h2>
              <ul>
                <li><MapPin size={20} aria-hidden="true" /><span><strong>Address</strong>{contactDetails.officeAddress}</span></li>
                <li><Phone size={20} aria-hidden="true" /><span><strong>Telephone</strong><a href="tel:+97143555589">{contactDetails.telephone}</a></span></li>
                <li><MessageCircle size={20} aria-hidden="true" /><span><strong>WhatsApp</strong><a href={whatsappHref} target="_blank" rel="noreferrer">+971 52 634 7429</a></span></li>
                <li><Mail size={20} aria-hidden="true" /><span><strong>Email</strong><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></span></li>
                <li><Clock3 size={20} aria-hidden="true" /><span><strong>Office hours</strong>{contactDetails.businessHours}</span></li>
              </ul>
              <div className="revision-hero-actions">
                <a className="revision-button revision-button-primary" href="tel:+97143555589"><Phone size={18} aria-hidden="true" /> Call Office</a>
                <a className="revision-button" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
              </div>
            </div>
            <div className="revision-contact-map">
              <MapPin size={42} aria-hidden="true" />
              <h3>Bur Dubai, Dubai</h3>
              <p>Shop No 1, Al Gassimi Building No 2, Souq Al Khabeer</p>
              <a href="https://maps.google.com/?q=Souq+Al+Khabeer+Bur+Dubai" target="_blank" rel="noreferrer">
                <Navigation size={18} aria-hidden="true" /> Open in Maps
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
