import Link from "next/link";
import { CalendarCheck2, Clock3, Instagram, MessageCircle, Route } from "lucide-react";
import { VenueGallery } from "@/components/revision/RevisionBlocks";
import { Container } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Pioneer Badminton Hub",
  "Discover Pioneer Badminton Hub in Al Quoz and book your badminton court directly on WhatsApp.",
  "/venue",
);

const bookingSteps = [
  { title: "Send your request", body: "Message us with the date, preferred time and number of players.", icon: MessageCircle },
  { title: "Receive confirmation", body: "Our team checks availability and replies with the next booking details.", icon: CalendarCheck2 },
  { title: "Plan your arrival", body: "Use the confirmed details to prepare for a smooth session at the venue.", icon: Route },
];

const whatsappBooking = "https://wa.me/971552871234?text=Hello%20Pioneer%20Badminton%20Hub%2C%20I%20would%20like%20to%20book%20a%20court.";
const instagramVenue = "https://www.instagram.com/pbh.dubai?igsh=Z3FpaDhkbGVqenFv";

export default function VenuePage() {
  return (
    <main className="revision-venue-page">
      <section className="revision-venue-hero">
        <Container>
          <div className="revision-venue-hero-copy">
            <p className="revision-section-kicker">ARP Sports Venue</p>
            <h1>Pioneer Badminton Hub</h1>
            <p>Train, play and compete at a dedicated badminton venue in Al Quoz with direct court-booking support.</p>
            <div className="revision-hero-actions">
              <a className="revision-button revision-button-primary" href={whatsappBooking} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" /> Book on WhatsApp
              </a>
              <a className="revision-button revision-button-instagram" href={instagramVenue} target="_blank" rel="noreferrer">
                <Instagram size={18} aria-hidden="true" /> Venue Instagram
              </a>
              <Link className="revision-button" href="/contact">Contact ARP</Link>
            </div>
            <span className="revision-venue-hours"><Clock3 size={17} aria-hidden="true" /> Court booking: +971 55 287 1234 - confirmation is provided directly by the venue team.</span>
          </div>
        </Container>
      </section>

      <section className="revision-venue-gallery-section">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Explore the venue</p>
            <h2>Built around the game</h2>
            <p>Explore the court environment before choosing your preferred session. Every reservation is confirmed directly with the ARP team.</p>
          </div>
          <VenueGallery />
        </Container>
      </section>

      <section className="revision-venue-experience">
        <Container>
          <div className="revision-venue-experience-head">
            <div className="revision-section-head">
              <p className="revision-section-kicker">From enquiry to court</p>
              <h2>A clear way to book and play</h2>
              <p>No account or checkout is required. The team confirms your session personally, so your booking details stay clear from the first message.</p>
            </div>
            <a className="revision-button revision-button-primary" href={whatsappBooking} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Start a booking</a>
          </div>
          <ol className="revision-venue-steps">
            {bookingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="revision-venue-step-icon"><Icon size={22} aria-hidden="true" /></div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="revision-venue-cta">
        <Container>
          <div>
            <p className="revision-section-kicker">Ready to play?</p>
            <h2>Reserve your court with one message</h2>
            <p>Tell us your preferred date, time and number of players. Our team will reply with availability and the final booking details.</p>
          </div>
          <div className="revision-venue-cta-actions">
            <a className="revision-button revision-button-light" href={whatsappBooking} target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Book on WhatsApp
            </a>
            <a className="revision-button revision-button-instagram" href={instagramVenue} target="_blank" rel="noreferrer">
              <Instagram size={18} aria-hidden="true" /> Venue Instagram
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
