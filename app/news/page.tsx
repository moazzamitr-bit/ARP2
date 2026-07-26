import { Suspense } from "react";
import { BlogFilter } from "@/components/news/BlogFilter";
import { Container, Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "News & Blog",
  "Read ARP company updates, brand news, product launches, partnerships and event stories.",
  "/news",
);

export default function NewsPage() {
  return (
    <>
      <section className="page-hero blog-page-hero">
        <Container>
          <span className="title-accent-line" aria-hidden="true" />
          <h1>News & Blog</h1>
          <p>
            Company updates, brand stories and partnership notes — written in the same clean, premium language as the
            rest of ARP.
          </p>
        </Container>
      </section>
      <Section className="blog-section">
        <Suspense fallback={<p>Loading articles…</p>}>
          <BlogFilter />
        </Suspense>
      </Section>
    </>
  );
}
