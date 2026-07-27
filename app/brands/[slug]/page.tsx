import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookOpen, Download, MessageCircle, ShieldCheck } from "lucide-react";
import { BrandProductBrowser } from "@/components/brands/BrandProductBrowser";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Container, Section } from "@/components/ui/Section";
import { brands, getBrand } from "@/content/brands";
import { getProductsByBrand } from "@/content/products";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) return {};
  return pageMetadata(`${brand.name} UAE Distribution Partner`, brand.description, `/brands/${brand.slug}`);
}

export default function BrandDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();
  const products = getProductsByBrand(brand.slug);
  const isYonex = brand.slug === "yonex";
  const heroImages: Record<string, string> = {
    yonex: "/assets/samples/heroes/badminton-athlete.webp",
    stiga: "/assets/samples/heroes/22.webp",
    cosco: "/assets/samples/heroes/team-sports.webp",
    "lp-support": "/assets/samples/heroes/home-athlete.webp",
  };
  const heroImage = heroImages[brand.slug] ?? site.assets.brandHero;

  return (
    <>
      <section className={`brand-detail-hero brand-detail-hero-proposal revision-brand-detail revision-brand-${brand.slug}`}>
        <Container>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/brands">Brands</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{brand.name}</span>
          </nav>

          <div className="brand-detail-grid">
            <div className="brand-detail-copy">
              {isYonex ? (
                <span className="brand-badge-yonex" aria-label="YONEX">
                  YONEX
                </span>
              ) : (
                <BrandLogo
                  text={brand.logoText}
                  className={brand.logoClass}
                  src={brand.logoSrc}
                />
              )}
              <h1>
                {isYonex ? (
                  <>
                    World-Class
                    <br />
                    Badminton Performance
                  </>
                ) : (
                  `${brand.name} Performance in the UAE`
                )}
              </h1>
              <p>
                {isYonex ? (
                  <>
                    Precision engineering. Innovative technology.
                    <br />
                    Trusted by champions worldwide.
                  </>
                ) : (
                  brand.relationship
                )}
              </p>
              <p className="brand-trust-line">
                <ShieldCheck size={18} aria-hidden="true" />
                <span>
                  ARP is the official distribution partner of {brand.name} in the UAE.{" "}
                  <Link href={`/brands/${brand.slug}/partnership`} className="text-link">
                    About the partnership →
                  </Link>
                </span>
              </p>
              <div className="revision-brand-actions">
                <a className="revision-button revision-button-primary" href={`https://wa.me/971526347429?text=${encodeURIComponent(`Hello ARP Group, I am interested in ${brand.name} products.`)}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} aria-hidden="true" /> Contact Main Office
                </a>
                <Link className="revision-button" href="/products">Browse Products</Link>
              </div>
            </div>
            <HeroVisual
              className="brand-detail-image"
              src={heroImage}
              alt={`${brand.name} athlete`}
              objectPosition="center right"
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>
        </Container>
      </section>

      <Section className="brand-products-section">
        <Suspense fallback={null}>
          <BrandProductBrowser brand={brand} products={products} />
        </Suspense>
      </Section>

      <Section className="surface-band brand-resources-section">
        <div className="resource-bar">
          <span className="resource-bar-label">
            <BookOpen size={18} aria-hidden="true" />
            Resources
          </span>
          <strong>
            {brand.name} Product Catalogue 2024
          </strong>
          <Link href={brand.catalogue.url} className="text-link resource-download">
            Download
            <Download size={15} aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
