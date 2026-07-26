"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FaqGroup } from "@/content/faq";
import { cn } from "@/lib/utils";

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(`${groups[0].id}-0`);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(term) || item.answer.toLowerCase().includes(term),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const total = filtered.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="faq-layout">
      <aside className="faq-sidebar">
        <label className="faq-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search questions</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions"
          />
        </label>

        <nav className="faq-topics" aria-label="FAQ topics">
          {groups.map((group) => (
            <a key={group.id} href={`#${group.id}`}>
              {group.title}
              <span>{group.items.length}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="faq-groups">
        {query.trim() ? (
          <p className="faq-result-count" role="status">
            {total} {total === 1 ? "answer" : "answers"} for &ldquo;{query.trim()}&rdquo;
          </p>
        ) : null}

        {filtered.map((group) => (
          <section key={group.id} id={group.id} className="faq-group">
            <h2>{group.title}</h2>
            <p className="faq-group-intro">{group.intro}</p>

            <ul className="faq-list">
              {group.items.map((item, index) => {
                const id = `${group.id}-${index}`;
                const isOpen = open === id;
                return (
                  <li key={item.question} className={cn("faq-item", isOpen && "faq-item-open")}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel`}
                        onClick={() => setOpen(isOpen ? null : id)}
                      >
                        <span>{item.question}</span>
                        <ChevronDown size={18} aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`${id}-panel`} className="faq-answer" hidden={!isOpen}>
                      <p>{item.answer}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {filtered.length === 0 ? (
          <p className="faq-empty">
            No answers match &ldquo;{query.trim()}&rdquo;. Try a different word, or call 800 ARP 277.
          </p>
        ) : null}
      </div>
    </div>
  );
}
