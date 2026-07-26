"use client";

import { useEffect, useState } from "react";
import type { NewsSection } from "@/content/types";
import { cn } from "@/lib/utils";

type ArticleTocProps = {
  sections: NewsSection[];
};

export function ArticleToc({ sections }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  return (
    <nav className="article-toc" aria-label="Table of contents">
      <p className="article-toc-label">On this page</p>
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(activeId === section.id && "is-active")}
              onClick={() => setActiveId(section.id)}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
