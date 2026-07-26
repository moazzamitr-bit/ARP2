import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, UserRound } from "lucide-react";
import { ArticleComments } from "@/components/news/ArticleComments";
import { ArticleToc } from "@/components/news/ArticleToc";
import { Container, Section } from "@/components/ui/Section";
import { getArticle, getRelatedArticles, newsArticles } from "@/content/news";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return pageMetadata(article.title, article.excerpt, `/news/${article.slug}`);
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const related = getRelatedArticles(article.slug, 3);

  return (
    <>
      <section className="article-hero article-hero-proposal">
        <Container>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/news">News</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{article.title}</span>
          </nav>

          <span className="micro-label">{article.category}</span>
          <h1>{article.title}</h1>
          <p className="article-hero-excerpt">{article.excerpt}</p>
          <div className="article-hero-meta">
            <span>
              <UserRound size={15} aria-hidden="true" />
              {article.author}
            </span>
            <span>{formatDate(article.date)}</span>
            <span>
              <Clock3 size={15} aria-hidden="true" />
              {article.readTime}
            </span>
          </div>

          <div className="article-hero-image">
            <Image src={article.heroImage} alt="" fill priority sizes="100vw" />
          </div>
        </Container>
      </section>

      <Section className="article-section">
        <div className="article-layout">
          <aside className="article-sidebar">
            <ArticleToc sections={article.sections} />
            <Link href="/news" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" /> Back to News
            </Link>
          </aside>

          <article className="article-body">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="article-section-block">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </Section>

      <Section className="surface-band">
        <ArticleComments articleTitle={article.title} />
      </Section>

      <Section>
        <div className="related-products-head">
          <h2>
            <span className="title-accent-line" aria-hidden="true" />
            Related Stories
          </h2>
          <Link href="/news" className="text-link">
            View All <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="blog-related-grid">
          {related.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="blog-card">
              <div className="blog-card-media">
                <Image src={item.heroImage} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
              </div>
              <div className="blog-card-body">
                <span className="blog-meta">
                  {item.category} · {formatDate(item.date)}
                </span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
