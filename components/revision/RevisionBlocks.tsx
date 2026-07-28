"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const whatsappHref =
  "https://wa.me/971526347429?text=Hello%20ARP%2C%20I%20would%20like%20more%20information.";

const heroSlides = [
  {
    title: "Yonex / Badminton",
    eyebrow: "Official distribution. Championship performance.",
    image: "/assets/samples/heroes/badminton-athlete.webp",
    position: "center 28%",
  },
  {
    title: "Tennis",
    eyebrow: "Performance equipment for every level of play.",
    image: "/assets/samples/heroes/tennis-action.webp",
    position: "center 35%",
  },
  {
    title: "Cricket",
    eyebrow: "Trusted equipment for teams, academies and retailers.",
    image: "/assets/samples/heroes/team-sports.webp",
    position: "center 40%",
  },
] as const;

export function HomeHeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[active];

  return (
    <section className="revision-home-hero" aria-roledescription="carousel" aria-label="ARP sports highlights">
      {heroSlides.map((item, index) => (
        <div
          className={`revision-hero-image ${index === active ? "is-active" : ""}`}
          aria-hidden={index !== active}
          key={item.title}
        >
          <Image
            src={item.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: item.position }}
          />
        </div>
      ))}
      <div className="revision-hero-shade" />
      <div className="container-shell revision-hero-inner">
        <p className="revision-kicker">Leading the game since 1969</p>
        <div className="revision-hero-copy" aria-live="polite">
          <span>{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p>Official sports brand distribution and local support across the UAE.</p>
        </div>
        <div className="revision-hero-actions">
          <Link href="/brands" className="revision-button revision-button-primary">Explore Our Brands</Link>
          <Link href="/wholesale" className="revision-button revision-button-light">Partner With Us</Link>
        </div>
        <div className="revision-carousel-controls">
          <button type="button" onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <div className="revision-dots" aria-label="Choose slide">
            {heroSlides.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={index === active ? "is-active" : ""}
                aria-label={`Show ${item.title}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

const partnerNames = ["Go Sport", "Lulu", "Decathlon", "ADLER", "Amazon", "Noon", "Cosmos"] as const;

export function ChannelPartnersCarousel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`revision-partner-carousel ${compact ? "is-compact" : ""}`}>
      <div className="revision-partner-track">
        {[...partnerNames, ...partnerNames].map((name, index) => (
          <div className="revision-partner-mark" key={`${name}-${index}`} aria-hidden={index >= partnerNames.length}>
            <strong>{name}</strong>
            <small>Authorized Channel Partner</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const venueSlides = [
  { src: "/assets/samples/events/event-award.webp", alt: "Yonex award presentation on an indoor badminton court" },
  { src: "/assets/samples/events/event-ceremony.webp", alt: "Young athletes at a Yonex badminton ceremony" },
  { src: "/assets/samples/events/event-teams.webp", alt: "Yonex badminton teams gathered on court" },
  { src: "/assets/samples/events/event-officials.webp", alt: "Yonex event officials at an indoor badminton venue" },
] as const;

const awardsSlides = [
  { src: "/assets/samples/events/event-award.webp", alt: "Yonex award presentation at an ARP sporting event", caption: "Recognition on court - celebrating sporting achievement with our partners." },
  { src: "/assets/samples/events/event-ceremony.webp", alt: "Sporting event ceremony with Yonex awards", caption: "Event ceremony - moments that bring athletes, partners and communities together." },
  { src: "/assets/samples/events/event-teams.webp", alt: "Teams gathered at an ARP-supported sporting event", caption: "Teams and community - supporting the people behind every sporting milestone." },
  { src: "/assets/samples/events/event-officials.webp", alt: "Event officials and guests at a Yonex sporting event", caption: "Partners and officials - trusted relationships that help sport move forward." },
] as const;

export function AwardsGallery() {
  const [active, setActive] = useState(0);
  const current = awardsSlides[active];
  const showPrevious = () => setActive((index) => (index - 1 + awardsSlides.length) % awardsSlides.length);
  const showNext = () => setActive((index) => (index + 1) % awardsSlides.length);

  return (
    <div className="revision-awards-gallery" aria-roledescription="carousel" aria-label="ARP events and recognition gallery">
      <figure className="revision-awards-main">
        <Image src={current.src} alt={current.alt} fill priority sizes="(max-width: 900px) 100vw, 72vw" />
        <button type="button" className="revision-gallery-prev" onClick={showPrevious} aria-label="Previous event image"><ChevronLeft size={22} /></button>
        <button type="button" className="revision-gallery-next" onClick={showNext} aria-label="Next event image"><ChevronRight size={22} /></button>
        <figcaption aria-live="polite">
          <span className="revision-gallery-count">{active + 1} / {awardsSlides.length}</span>
          <span>
            <small>ARP in the community</small>
            <strong>{current.caption}</strong>
          </span>
        </figcaption>
      </figure>
      <div className="revision-awards-thumbs" role="tablist" aria-label="Choose an event image">
        {awardsSlides.map((image, index) => (
          <button type="button" role="tab" key={image.src} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-selected={index === active} aria-label={`View event image ${index + 1}: ${image.caption}`}>
            <Image src={image.src} alt="" fill sizes="(max-width: 700px) 22vw, 148px" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function VenueGallery() {
  const [active, setActive] = useState(0);
  const current = venueSlides[active];

  return (
    <div className="revision-venue-gallery">
      <figure className="revision-venue-main">
        <Image src={current.src} alt={current.alt} fill priority sizes="(max-width: 900px) 100vw, 64vw" />
        <button type="button" className="revision-gallery-prev" onClick={() => setActive((active - 1 + venueSlides.length) % venueSlides.length)} aria-label="Previous venue image">
          <ChevronLeft size={22} />
        </button>
        <button type="button" className="revision-gallery-next" onClick={() => setActive((active + 1) % venueSlides.length)} aria-label="Next venue image">
          <ChevronRight size={22} />
        </button>
        <figcaption><span>Yonex Concept Badminton Court</span><strong>{current.alt}</strong></figcaption>
      </figure>
      <div className="revision-venue-thumbs" role="tablist" aria-label="Choose a venue image">
        {venueSlides.map((image, index) => (
          <button type="button" role="tab" key={image.src} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-selected={index === active} aria-label={`View venue image ${index + 1}`}>
            <Image src={image.src} alt="" fill sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function FloatingSocialActions() {
  return (
    <div className="floating-social-actions" aria-label="Quick contact">
      <a className="floating-social floating-social-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Contact ARP on WhatsApp">
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>
      <a className="floating-social floating-social-instagram" href="https://www.instagram.com/arpgroup.ae/" target="_blank" rel="noreferrer" aria-label="Visit ARP on Instagram">
        <Instagram size={21} />
        <span>Instagram</span>
      </a>
    </div>
  );
}

export { whatsappHref };
