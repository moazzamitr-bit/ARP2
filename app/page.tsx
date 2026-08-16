import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  Globe,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Lightbulb,
  MapPin,
  Scale,
  ShieldCheck,
  Store,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { HomeHeroCarousel } from "@/components/revision/RevisionBlocks";
import { Metrics } from "@/components/sections/Metrics";
import { LinkButton } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { brands } from "@/content/brands";
import { homeContent } from "@/content/home";
import { newsArticles } from "@/content/news";
import { officialBranches } from "@/content/storeNetwork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Official Sports Brand Distribution Partner in the UAE",
  "ARP connects official sports brands with wholesale buyers, retailers, institutions and customers across the UAE.",
  "/",
);

const categoryIcons = [Target, Trophy, Dumbbell, Store, ShieldCheck];
const channelIcons = [Store, Trophy, GraduationCap, Users];
const pillarIcons = [Lightbulb, Scale, HeartHandshake, Leaf, Globe];
const latestArticles = [...newsArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const yonex = brands.find((brand) => brand.slug === "yonex");
const secondaryBrands = brands.filter((brand) => ["stiga", "cosco", "lp-support"].includes(brand.slug));

const venueBookingHref = "https://wa.me/971552871234?text=Hello%20Pioneer%20Badminton%20Hub%2C%20I%20would%20like%20to%20book%20a%20court.";

export default function HomePage() {
  return (
    <>
      <HomeHeroCarousel />
      <div className="revision-metrics-band"><Metrics /></div>

      <section className="revision-home-brands">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Our portfolio</p>
            <h2>Official Brands We Distribute</h2>
            <p>Yonex leads the portfolio, supported by established partners across table tennis, sports goods and recovery.</p>
          </div>
          {yonex ? (
            <Link href="/brands/yonex" className="revision-brand-feature" aria-label="Explore Yonex">
              <BrandLogo text={yonex.logoText} className={yonex.logoClass} src={yonex.logoSrc} />
            </Link>
          ) : null}
          <div className="revision-brand-secondary">
            {secondaryBrands.map((brand) => (
              <Link href={`/brands/${brand.slug}`} key={brand.slug} aria-label={`Explore ${brand.name}`}>
                <BrandLogo text={brand.logoText} className={brand.logoClass} src={brand.logoSrc} compact />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="revision-court">
        <Container>
          <div className="revision-court-grid">
            <div className="revision-court-copy">
              <p className="revision-section-kicker">Premium venue</p>
              <h2>Play at Pioneer Badminton Hub</h2>
              <p>A dedicated badminton environment with professional courts, quality lighting and direct booking support from the venue team.</p>
              <div className="revision-hero-actions">
                <a className="revision-button revision-button-light" href={venueBookingHref} target="_blank" rel="noreferrer">Book Now</a>
                <Link className="revision-button revision-button-light" href="/contact">Contact Us</Link>
                <Link className="revision-button revision-button-light" href="/venue">Learn More</Link>
              </div>
            </div>
            <div className="revision-court-media">
              <Image src="/assets/samples/heroes/21.webp" alt="Pioneer Badminton Hub indoor court" fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
        </Container>
      </section>

      <Section className="home-categories">
        <SectionIntro label={homeContent.categories.eyebrow} title={homeContent.categories.title} body={homeContent.categories.body} />
        <ul className="home-category-grid">
          {homeContent.categories.items.map((item, index) => {
            const Icon = categoryIcons[index] ?? Target;
            return (
              <li key={item.title}>
                <Link href={item.href} className="home-category-card">
                  <span className="home-category-icon" aria-hidden="true"><Icon size={20} /></span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                  <ArrowRight className="home-category-arrow" size={16} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="surface-band home-channels">
        <div className="home-channels-layout">
          <div className="home-channels-intro">
            <SectionIntro label={homeContent.channels.eyebrow} title={homeContent.channels.title} body={homeContent.channels.body} />
            <div className="home-channels-actions">
              <LinkButton href="/wholesale">{homeContent.channels.primaryCta}</LinkButton>
              <LinkButton href="/wholesale#benefits" variant="secondary">{homeContent.channels.secondaryCta}</LinkButton>
            </div>
          </div>
          <ul className="home-channel-grid">
            {homeContent.channels.items.map((item, index) => {
              const Icon = channelIcons[index] ?? Store;
              return <li key={item.title}><Panel className="home-channel-card"><Icon size={24} aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></Panel></li>;
            })}
          </ul>
        </div>
      </Section>

      <section className="revision-network">
        <Container>
          <div className="revision-section-head">
            <p className="revision-section-kicker">Where to buy</p>
            <h2>Find ARP Across the UAE</h2>
            <p>Three official ARP branches with direct directions, contact information and WhatsApp support.</p>
          </div>
          <ul className="revision-network-list">
            {officialBranches.map((branch) => (
              <li className="revision-network-card" key={branch.id}>
                <strong>{branch.name}</strong>
                <span><MapPin size={14} aria-hidden="true" /> {branch.address}</span>
                <small>{branch.hoursSummary}</small>
              </li>
            ))}
          </ul>
          <div className="revision-hero-actions">
            <Link className="revision-button revision-button-primary" href="/locations">Find Stores</Link>
            <Link className="revision-button" href="/authorized-resellers">Authorized Resellers</Link>
          </div>
        </Container>
      </section>

      <Section className="surface-band home-pillars">
        <SectionIntro label={homeContent.pillars.eyebrow} title={homeContent.pillars.title} body={homeContent.pillars.body} align="center" />
        <ul className="home-pillar-grid">
          {homeContent.pillars.items.map((item, index) => {
            const Icon = pillarIcons[index] ?? Lightbulb;
            return <li key={item.title}><span className="home-category-icon" aria-hidden="true"><Icon size={20} /></span><strong>{item.title}</strong><small>{item.body}</small></li>;
          })}
        </ul>
      </Section>

      <Section className="home-news">
        <div className="home-news-head">
          <SectionIntro label={homeContent.news.eyebrow} title={homeContent.news.title} body={homeContent.news.body} />
          <LinkButton href="/news" variant="secondary">{homeContent.news.cta}</LinkButton>
        </div>
        <ul className="home-news-grid">
          {latestArticles.map((article) => (
            <li key={article.slug}>
              <Link href={`/news/${article.slug}`} className="home-news-card">
                <span className="home-news-media"><Image src={article.heroImage} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" /></span>
                <span className="home-news-body"><small className="blog-meta">{article.category} · {article.readTime}</small><strong>{article.title}</strong><span className="home-brand-link">Read Article <ArrowRight size={14} aria-hidden="true" /></span></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
