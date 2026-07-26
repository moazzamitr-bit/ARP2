import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProductPurchase } from "@/components/brands/ProductPurchase";
import { Container, Section } from "@/components/ui/Section";
import { getBrand } from "@/content/brands";
import { featuredProducts, getProduct, getRelatedProducts } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return featuredProducts.map((product) => ({
    slug: product.brandSlug,
    product: product.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string; product: string } }) {
  const brand = getBrand(params.slug);
  const product = getProduct(params.product);
  if (!brand || !product || product.brandSlug !== brand.slug) return {};
  return pageMetadata(product.name, product.tagline, `/brands/${brand.slug}/products/${product.slug}`);
}

export default function ProductPage({ params }: { params: { slug: string; product: string } }) {
  const brand = getBrand(params.slug);
  const product = getProduct(params.product);
  if (!brand || !product || product.brandSlug !== brand.slug) notFound();

  const related = getRelatedProducts(product.slug);

  return (
    <>
      <section className="page-hero product-page-hero">
        <Container>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link href="/brands">Brands</Link>
            <span aria-hidden="true">&gt;</span>
            <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
            <span aria-hidden="true">&gt;</span>
            <Link href={`/brands/${brand.slug}?type=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span aria-current="page">{product.name}</span>
          </nav>
          <ProductPurchase product={product} brandName={brand.name} brandSlug={brand.slug} />
        </Container>
      </section>

      <Section className="related-products-section">
        <div className="related-products-head">
          <h2>
            <span className="title-accent-line" aria-hidden="true" />
            You May Also Like
          </h2>
          <Link href={`/brands/${brand.slug}`} className="text-link">
            View All <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="related-products-grid">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/brands/${brand.slug}/products/${item.slug}`}
              className="related-product-card"
            >
              <div className="related-product-media">
                <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
              </div>
              <div>
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
              </div>
              <span className="related-product-go" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
