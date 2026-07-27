import { Suspense } from "react";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { Container, Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Products",
  "Browse ARP products and purchase directly through WhatsApp in the UAE.",
  "/products",
);

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero shop-page-hero">
        <Container>
          <span className="title-accent-line" aria-hidden="true" />
          <h1>Products</h1>
          <p>Filter the active brand portfolio by category and availability, then purchase directly through WhatsApp.</p>
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
