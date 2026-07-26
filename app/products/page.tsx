import { Suspense } from "react";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { Container, Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Products",
  "Browse ARP product samples across official brand assortments in the UAE.",
  "/products",
);

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero shop-page-hero">
        <Container>
          <span className="title-accent-line" aria-hidden="true" />
          <h1>Products</h1>
          <p>Filter by brand, product type and availability across ARP&apos;s distributed assortment.</p>
        </Container>
      </section>
      <Section className="shop-section">
        <Suspense fallback={<p>Loading products...</p>}>
          <ShopBrowser />
        </Suspense>
      </Section>
    </>
  );
}
