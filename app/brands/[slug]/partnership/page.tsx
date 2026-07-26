import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  Download,
  ExternalLink,
  Globe,
  Handshake,
  MapPin,
} from "lucide-react";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Panel } from "@/components/ui/Panel";
import { Container, Section } from "@/components/ui/Section";
import { getBrandPartnership, partnershipAssurances } from "@/content/brandPartnership";
import { brands, getBrand } from "@/content/brands";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) return {};
  return pageMetadata(
    `${brand.name} × ARP Partnership`,
    `ARP is the official UAE distribution partner for ${brand.name} — authorized supply, local support and nationwide coverage.`,
    `/brands/${brand.slug}/partnership`,
  );
}

const assuranceIcons = [BadgeCheck, Globe, Award, Handshake];

/** Product-category icons match the shortcuts used on the brand page. */
export default function BrandPartnershipPage({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  const partnership = getBrandPartnership(params.slug);
  if (!brand || !partnership) notFound();

  return (
    <>
      <section className="partnership-hero">
        <Container>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/brands">Brands</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Partnership</span>
          </nav>

          <div className="partnership-hero-grid">
            <div className="partnership-hero-copy">
              <div className="partnership-brand-row">
                <BrandLogo text={brand.logoText} className={brand.logoClass} src={brand.logoSrc} compact />
                <p className="proposal-eyebrow">
                  <span className="proposal-eyebrow-rule" aria-hidden="true" />
                  Official Partner
                </p>
              </div>
              <h1>
                {partnership.titleLead}
                <br />
                {partnership.titleAccent}
              </h1>
              <p>{partnership.body}</p>
              <div className="hero-actions">
                <LinkButton href={brand.globalWebsite} external showArrow={false}>
                  Visit Global Brand Website
                  <ExternalLink size={16} aria-hidden="true" />
                </LinkButton>
                <LinkButton href={`/brands/${brand.slug}`} variant="secondary">
                  Explore {brand.name} Products
                </LinkButton>
              </div>
            </div>
            <HeroVisual
              className="partnership-hero-visual"
              src={site.assets.brandHero}
              alt={`${brand.name} athlete in action`}
              objectPosition="center right"
              priority
            />
          </div>

          <ul className="partnership-assurances">
            {partnershipAssurances.map((item, index) => {
              const Icon = assuranceIcons[index] ?? BadgeCheck;
              return (
                <li key={item.title}>
                  <Icon size={22} aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.body}</small>
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Section className="partnership-quad-section">
        <div className="partnership-quad">
          <Panel className="partnership-card">
            <h2>About {brand.name}</h2>
            <p>{partnership.about}</p>
            <dl className="partnership-facts">
              {partnership.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel className="partnership-card">
            <h2>Our Partnership</h2>
            <ul className="partnership-points">
              {partnership.points.map((point) => (
                <li key={point}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="partnership-card">
            <h2>Product Categories</h2>
            <ul className="partnership-categories">
              {brand.categories.map((category) => (
                <li key={category}>
                  <Link href={`/brands/${brand.slug}?type=${encodeURIComponent(category)}`}>
                    {category}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="partnership-card">
            <h2>Region &amp; Territory</h2>
            <div className="territory-map" aria-hidden="true">
              <svg viewBox="0 0 200 120" focusable="false">
                <path
                  d="M12 96 L44 84 L66 62 L96 52 L128 40 L150 46 L162 34 L176 40 L186 60 L178 82 L150 92 L118 88 L84 98 L46 104 Z"
                  fill="#bfe3c8"
                  stroke="#8ecc9f"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="122" cy="58" r="4" fill="#0b3d91" />
              </svg>
            </div>
            <dl className="territory-facts">
              <div>
                <dt>{partnership.territory.scope}</dt>
                <dd>{partnership.territory.region}</dd>
              </div>
              <div>
                <dt>
                  <MapPin size={14} aria-hidden="true" /> Coverage
                </dt>
                <dd>{partnership.territory.coverage}</dd>
              </div>
            </dl>
          </Panel>
        </div>
      </Section>

      <Section className="surface-band partnership-resources-section">
        <div className="partnership-resources">
          <Panel className="partnership-catalogue">
            <h2>{brand.name} UAE Product Catalogue</h2>
            <p>Download the latest {brand.name} collection, technology highlights, and product specifications.</p>
            <LinkButton href={brand.catalogue.url} variant="secondary" showArrow={false}>
              <BookOpen size={16} aria-hidden="true" />
              Download Catalogue (PDF)
              <Download size={15} aria-hidden="true" />
            </LinkButton>
          </Panel>

          <Panel className="partnership-cta-card">
            <h2>Explore {brand.name} Products in the UAE</h2>
            <p>Discover the complete range available through ARP&apos;s network of authorized retailers and partners.</p>
            <LinkButton href={`/brands/${brand.slug}`}>View Local Products</LinkButton>
          </Panel>

          <Panel className="partnership-cta-card">
            <h2>Let&apos;s Work Together</h2>
            <p>For partnership inquiries, bulk orders, or institutional requirements.</p>
            <LinkButton href="/wholesale" variant="secondary">
              Contact ARP
            </LinkButton>
          </Panel>
        </div>

        <div className="brands-partner-strip partnership-strip">
          <div className="brands-partner-copy">
            <span className="brands-partner-icon" aria-hidden="true">
              <Handshake size={24} strokeWidth={1.75} />
            </span>
            <div>
              <h2>Let&apos;s Build Winning Partnerships</h2>
              <p>Join a network of global brands and grow with ARP.</p>
            </div>
          </div>
          <LinkButton href="/wholesale">Partner With Us</LinkButton>
        </div>
      </Section>
    </>
  );
}
