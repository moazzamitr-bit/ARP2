import Link from "next/link";
import { CheckCircle2, Clock3, Lightbulb, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { VenueGallery } from "@/components/revision/RevisionBlocks";
import { Container } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Yonex Concept Badminton Court",
  "Discover and book ARP's Yonex Concept Badminton Court in Dubai.",
  "/venue",
);

const facilities = [
  { title: "Professional court setup", body: "A dedicated badminton environment designed for focused training and competitive play.", icon: CheckCircle2 },
  { title: "Performance lighting", body: "Clear, even lighting supports visibility and a consistent playing experience.", icon: Lightbulb },
  { title: "Player-friendly access", body: "Simple booking support and practical arrival information from the ARP team.", icon: Users },
  { title: "Direct assistance", body: "Speak to our team on WhatsApp before your session for availability and guidance.", icon: ShieldCheck },
];

const whatsappBooking = "https://wa.me/971526347429?text=Hello%20ARP%20Group%2C%20I%20would%20like%20to%20book%20the%20Yonex%20Concept%20Badminton%20Court.";

export default function VenuePage() {
  return (
    <main className="revision-venue-page">
      <section className="revision-venue-hero">
        <Container>
          <div className="revision-venue-hero-copy">
            <p className="revision-section-kicker">ARP Sports Venue</p>
            <h1>Yonex Concept Badminton Court</h1>
            <p>Train, play and compete in a premium badminton environment supported by the UAE&apos;s official Yonex distribution partner.</p>
            <div className="revision-hero-actions">
              <a className="revision-button revision-button-primary" href={whatsappBooking} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" /> Book on WhatsApp
              </a>
              <Link className="revision-button" href="/contact">Contact ARP</Link>
            </div>
            <span className="revision-venue-hours"><Clock3 size={17} aria-hidden="true" /> Booking confirmation is provided directly by the ARP team.</span>
          </div>
        </Container>
      </section>

      <section className="revision-venue-gallery-section">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Explore the venue</p>
            <h2>Built around the game</h2>
            <p>Browse the court environment, then contact us to confirm your preferred date and time.</p>
          </div>
          <VenueGallery />
        </Container>
      </section>

      <section className="revision-venue-facilities">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Facilities</p>
            <h2>Everything you need to get on court</h2>
          </div>
          <ul className="revision-facility-grid">
            {facilities.map((facility) => {
              const Icon = facility.icon;
              return (
                <li key={facility.title}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{facility.title}</h3>
                  <p>{facility.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="revision-venue-cta">
        <Container>
          <div>
            <p className="revision-section-kicker">Ready to play?</p>
            <h2>Reserve your court with one message</h2>
            <p>Tell us your preferred date, time and number of players. Our team will reply with availability.</p>
          </div>
          <a className="revision-button revision-button-light" href={whatsappBooking} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> Book Now
          </a>
        </Container>
      </section>
    </main>
  );
}
