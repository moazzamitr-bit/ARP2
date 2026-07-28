import Link from "next/link";
import { CalendarCheck2, CheckCircle2, Clock3, Lightbulb, MessageCircle, Route, Users } from "lucide-react";
import { VenueGallery } from "@/components/revision/RevisionBlocks";
import { Container } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Yonex Concept Badminton Court",
  "Discover and book ARP's Yonex Concept Badminton Court in Dubai.",
  "/venue",
);

const facilities = [
  { title: "Purpose-built court", body: "A dedicated badminton setting for training, play and friendly competition.", icon: CheckCircle2 },
  { title: "Performance lighting", body: "A clear, considered court environment designed around the game.", icon: Lightbulb },
  { title: "Easy coordination", body: "Share your preferred session details and the ARP team will confirm availability.", icon: CalendarCheck2 },
  { title: "Player support", body: "Get practical arrival guidance and booking support directly from the ARP team.", icon: Users },
];

const bookingSteps = [
  { title: "Send your request", body: "Message us with the date, preferred time and number of players.", icon: MessageCircle },
  { title: "Receive confirmation", body: "Our team checks availability and replies with the next booking details.", icon: CalendarCheck2 },
  { title: "Plan your arrival", body: "Use the confirmed details to prepare for a smooth session at the venue.", icon: Route },
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
            <p>Tell us your preferred date, time and number of players. Our team will reply with availability and the final booking details.</p>
          </div>
          <a className="revision-button revision-button-light" href={whatsappBooking} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> Book Now
          </a>
        </Container>
      </section>
    </main>
  );
}
