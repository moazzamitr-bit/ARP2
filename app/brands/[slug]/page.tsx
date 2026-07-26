import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Download, ShieldCheck } from "lucide-react";
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
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { type?: string };
}) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();
  const products = getProductsByBrand(brand.slug);
  const isYonex = brand.slug === "yonex";

  return (
    <>
      <section className="brand-detail-hero brand-detail-hero-proposal">
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
            </div>
            <HeroVisual
              className="brand-detail-image"
              src={site.assets.brandHero}
              alt={`${brand.name} athlete`}
              objectPosition="center right"
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>
        </Container>
      </section>

      <Section className="brand-products-section">
        <BrandProductBrowser brand={brand} products={products} initialCategory={searchParams?.type} />
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
