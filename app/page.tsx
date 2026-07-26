import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Dumbbell,
  Globe,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Lightbulb,
  MapPin,
  Navigation,
  Scale,
  ShieldCheck,
  Store,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { Metrics } from "@/components/sections/Metrics";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Panel } from "@/components/ui/Panel";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { brands } from "@/content/brands";
import { newsArticles } from "@/content/news";
import { homeContent } from "@/content/home";
import { globalPartners, site } from "@/content/site";
import { officialBranches, storeBranches } from "@/content/storeNetwork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Official Sports Brand Distribution Partner in the UAE",
  "ARP connects official sports brands with wholesale buyers, retailers, institutions and customers across the UAE.",
  "/",
);

const categoryIcons = [Target, Trophy, Dumbbell, Store, ShieldCheck];
const channelIcons = [Store, Trophy, GraduationCap, Users];
const pillarIcons = [Lightbulb, Scale, HeartHandshake, Leaf, Globe];
const latestArticles = [...newsArticles]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export default function HomePage() {
  return (
    <>
    <section className="proposal-home">
      <Container>
        <div className="proposal-home-hero">
          <div className="proposal-home-copy">
            <p className="proposal-eyebrow">
              <span className="proposal-eyebrow-rule" aria-hidden="true" />
              {homeContent.hero.eyebrow}
            </p>
            <h1>
              {homeContent.hero.titleLead}
              <br />
              <span>{homeContent.hero.titleAccent}</span>
            </h1>
            <p className="proposal-home-tagline">{homeContent.hero.body}</p>
            <div className="proposal-home-actions">
              <LinkButton href="/brands">{homeContent.hero.primaryCta}</LinkButton>
              <LinkButton href="/wholesale" variant="secondary">
                {homeContent.hero.secondaryCta}
              </LinkButton>
            </div>
          </div>

          <HeroVisual
            className="proposal-home-visual"
            src={site.assets.homeHero}
            alt="Athlete representing ARP sports distribution across the UAE"
            objectPosition="center right"
            priority
          />
        </div>

        <div className="proposal-home-metrics">
          <Metrics />
        </div>

        <div className="proposal-partners">
          <p className="proposal-partners-label">{homeContent.partnersLabel}</p>
          <ul className="proposal-partners-logos">
            {globalPartners.map((partner) => (
              <li key={partner.name}>
                <Link href={partner.href} className="proposal-partner-logo-link">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={160}
                    height={48}
                    className="proposal-partner-logo"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>

    {/* 1 — what ARP carries */}
    <Section className="surface-band home-portfolio">
      <SectionIntro
        label={homeContent.portfolio.eyebrow}
        title={homeContent.portfolio.title}
        body={homeContent.portfolio.body}
      />
      <ul className="home-brand-grid">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <Link href={`/brands/${brand.slug}`} className="home-brand-card">
              <BrandLogo text={brand.logoText} className={brand.logoClass} src={brand.logoSrc} compact />
              <span className="home-brand-category">{brand.category}</span>
              <span className="home-brand-link">
                View Brand
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="home-section-cta">
        <LinkButton href="/brands" variant="secondary">
          {homeContent.portfolio.cta}
        </LinkButton>
      </div>
    </Section>

    {/* 2 — the categories those brands cover */}
    <Section className="home-categories">
      <SectionIntro
        label={homeContent.categories.eyebrow}
        title={homeContent.categories.title}
        body={homeContent.categories.body}
      />
      <ul className="home-category-grid">
        {homeContent.categories.items.map((item, index) => {
          const Icon = categoryIcons[index] ?? Target;
          return (
            <li key={item.title}>
              <Link href={item.href} className="home-category-card">
                <span className="home-category-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.body}</small>
                <ArrowRight className="home-category-arrow" size={16} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>

    {/* 3 — the channels ARP supplies */}
    <Section className="surface-band home-channels">
      <div className="home-channels-layout">
        <div className="home-channels-intro">
          <SectionIntro
            label={homeContent.channels.eyebrow}
            title={homeContent.channels.title}
            body={homeContent.channels.body}
          />
          <div className="home-channels-actions">
            <LinkButton href="/wholesale">{homeContent.channels.primaryCta}</LinkButton>
            <LinkButton href="/wholesale#benefits" variant="secondary">
              {homeContent.channels.secondaryCta}
            </LinkButton>
          </div>
        </div>
        <ul className="home-channel-grid">
          {homeContent.channels.items.map((item, index) => {
            const Icon = channelIcons[index] ?? Store;
            return (
              <li key={item.title}>
                <Panel className="home-channel-card">
                  <Icon size={24} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Panel>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>

    {/* 4 — where to buy */}
    <Section className="home-network">
      <div className="home-network-layout">
        <div className="home-network-intro">
          <SectionIntro
            label={homeContent.network.eyebrow}
            title={homeContent.network.title}
            body={homeContent.network.body}
          />
          <ul className="home-network-stats">
            <li>
              <strong>{storeBranches.length}</strong>
              <span>Locations</span>
            </li>
            <li>
              <strong>{officialBranches.length}</strong>
              <span>Official Branches</span>
            </li>
            <li>
              <strong>4</strong>
              <span>Emirates Covered</span>
            </li>
          </ul>
          <div className="home-network-actions">
            <LinkButton href="/locations">{homeContent.network.primaryCta}</LinkButton>
            <LinkButton href="/authorized-resellers" variant="secondary">
              {homeContent.network.secondaryCta}
            </LinkButton>
          </div>
        </div>
        <ul className="home-branch-list">
          {officialBranches.map((branch) => (
            <li key={branch.id}>
              <Link href="/locations" className="home-branch-row">
                <span className="home-branch-icon" aria-hidden="true">
                  <Building2 size={18} />
                </span>
                <span className="home-branch-copy">
                  <strong>{branch.name}</strong>
                  <small>
                    <MapPin size={13} aria-hidden="true" />
                    {branch.address}
                  </small>
                  <small>
                    <Navigation size={13} aria-hidden="true" />
                    {branch.hoursSummary}
                  </small>
                </span>
                <ArrowRight className="home-branch-arrow" size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>

    {/* 5 — company pillars (ARP Corporate Profile 2024) */}
    <Section className="surface-band home-pillars">
      <SectionIntro
        label={homeContent.pillars.eyebrow}
        title={homeContent.pillars.title}
        body={homeContent.pillars.body}
        align="center"
      />
      <ul className="home-pillar-grid">
        {homeContent.pillars.items.map((item, index) => {
          const Icon = pillarIcons[index] ?? Lightbulb;
          return (
            <li key={item.title}>
              <span className="home-category-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <strong>{item.title}</strong>
              <small>{item.body}</small>
            </li>
          );
        })}
      </ul>
    </Section>

    {/* 6 — latest news and events */}
    <Section className="home-news">
      <div className="home-news-head">
        <SectionIntro
          label={homeContent.news.eyebrow}
          title={homeContent.news.title}
          body={homeContent.news.body}
        />
        <LinkButton href="/news" variant="secondary">
          {homeContent.news.cta}
        </LinkButton>
      </div>
      <ul className="home-news-grid">
        {latestArticles.map((article) => (
          <li key={article.slug}>
            <Link href={`/news/${article.slug}`} className="home-news-card">
              <span className="home-news-media">
                <Image src={article.heroImage} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
              </span>
              <span className="home-news-body">
                <small className="blog-meta">
                  {article.category} · {article.readTime}
                </small>
                <strong>{article.title}</strong>
                <span className="home-brand-link">
                  Read Article
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
    </>
  );
}
