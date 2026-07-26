import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircleDot,
  Dumbbell,
  ShoppingBag,
  Trophy,
  Volleyball,
} from "lucide-react";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { LinkButton } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { SkylineArt } from "@/components/ui/SkylineArt";
import { brands } from "@/content/brands";
import { catalogueProducts } from "@/content/catalogue";
import { featuredProducts } from "@/content/products";
import { sportsContent } from "@/content/sports";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sports Categories",
  "Explore the sports disciplines ARP supports through official brand distribution across the UAE.",
  "/sports",
);

const disciplineIcons = [Activity, CircleDot, Trophy, Volleyball, Dumbbell];

/** Live product count per discipline, from the real stock lists + featured PDPs. */
function countProducts(shopCategories: readonly string[]) {
  const catalogue = catalogueProducts.filter((product) =>
    shopCategories.includes(product.category),
  ).length;
  const featured = featuredProducts.filter((product) =>
    shopCategories.includes(product.category),
  ).length;
  return catalogue + featured;
}

export default function SportsPage() {
  const totalProducts = catalogueProducts.length + featuredProducts.length;

  return (
    <>
      <section className="page-hero sports-hero">
        <div className="faq-hero-bg" aria-hidden="true">
          <img src="/assets/samples/heroes/dubai-skyline.webp" alt="dubai-skyline" />
        </div>
        <Container>
          <div className="breadcrumb">Home / Sports</div>
          <div className="sports-hero-copy">
            <p className="proposal-eyebrow">
              <span className="proposal-eyebrow-rule" aria-hidden="true" />
              {sportsContent.hero.eyebrow}
            </p>
            <h1>{sportsContent.hero.title}</h1>
            <p>{sportsContent.hero.body}</p>
            <ul className="sports-hero-stats">
              <li>
                <strong>{sportsContent.categories.length}</strong>
                <span>Disciplines</span>
              </li>
              <li>
                <strong>{brands.length}</strong>
                <span>Official Brands</span>
              </li>
              <li>
                <strong>{totalProducts}+</strong>
                <span>Catalogue Products</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <Section>
        <div className="sports-grid sports-grid-modern">
          {sportsContent.categories.map((category, index) => {
            const related = brands.filter((brand) => category.brandSlugs.includes(brand.slug));
            const Icon = disciplineIcons[index] ?? Activity;
            const count = countProducts(category.shopCategories);
            const shopHref =
              category.shopCategories.length === 1
                ? `/shop?category=${encodeURIComponent(category.shopCategories[0])}`
                : "/shop";
            return (
              <Panel key={category.slug} className="sports-card sports-card-modern">
                <div className="sports-card-head">
                  <span className="sports-card-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className="sports-card-count">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                </div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
                <ul className="sports-card-highlights">
                  {category.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="sports-card-brands">
                  {related.map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} aria-label={brand.name}>
                      <BrandLogo
                        text={brand.logoText}
                        className={brand.logoClass}
                        src={brand.logoSrc}
                        compact
                      />
                    </Link>
                  ))}
                </div>
                <div className="sports-card-actions">
                  <Link className="text-link" href={`/brands?category=${encodeURIComponent(category.filter)}`}>
                    Explore brands <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link className="text-link" href={shopHref}>
                    <ShoppingBag size={14} aria-hidden="true" /> Shop products
                  </Link>
                </div>
              </Panel>
            );
          })}
        </div>
      </Section>

      <Section className="surface-band">
        <div className="cta-band">
          <div>
            <SectionIntro
              label="Need product access?"
              title="Find official brands or become a retail partner."
              body="Move from sport category discovery into brand pages, catalogues and commercial pathways."
            />
          </div>
          <div className="hero-actions">
            <LinkButton href="/brands">View All Brands</LinkButton>
            <LinkButton href="/wholesale" variant="secondary">
              Partner With Us
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
