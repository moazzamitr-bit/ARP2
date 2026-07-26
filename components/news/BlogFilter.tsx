"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsArticles, newsCategories } from "@/content/news";
import type { NewsCategory } from "@/content/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type FilterId = "All" | NewsCategory;

export function BlogFilter() {
  const [category, setCategory] = useState<FilterId>("All");

  const visible = useMemo(
    () => newsArticles.filter((article) => category === "All" || article.category === category),
    [category],
  );

  const [featured, ...rest] = visible;

  return (
    <div className="blog-listing">
      <div className="blog-filter-row" aria-label="Article categories">
        {newsCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={cn("filter-chip", category === item && "filter-chip-active")}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item === "All" ? "All Articles" : item}
          </button>
        ))}
      </div>

      {!visible.length ? (
        <p className="empty-state">No articles in this category yet.</p>
      ) : null}

      {featured ? (
        <Link href={`/news/${featured.slug}`} className="blog-featured-card">
          <div className="blog-featured-media">
            <Image src={featured.heroImage} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <div className="blog-featured-copy">
            <span className="blog-meta">
              {featured.category} · {formatDate(featured.date)} · {featured.readTime}
            </span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="text-link">
              Read Article <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ) : null}

      <div className="blog-grid">
        {rest.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`} className="blog-card">
            <div className="blog-card-media">
              <Image src={article.heroImage} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
            </div>
            <div className="blog-card-body">
              <span className="blog-meta">
                {article.category} · {formatDate(article.date)}
              </span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span className="text-link">
                Read Article <ArrowRight size={14} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
