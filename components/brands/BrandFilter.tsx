"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Grid2x2,
  Handshake,
  HeartPulse,
  Trophy,
  Volleyball,
} from "lucide-react";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { brands } from "@/content/brands";
import { LinkButton } from "@/components/ui/Button";
import type { BrandCategory } from "@/content/types";

const filters = [
  { id: "All", label: "All Brands", icon: Grid2x2, match: [] as BrandCategory[] },
  {
    id: "Racquet Sports",
    label: "Racquet Sports",
    icon: Activity,
    match: ["Racquet Sports"] as BrandCategory[],
  },
  {
    id: "Team Sports",
    label: "Team Sports",
    icon: Volleyball,
    match: ["Sports Goods", "Table Tennis"] as BrandCategory[],
  },
  {
    id: "Fitness & Support",
    label: "Fitness & Support",
    icon: HeartPulse,
    match: ["Supports & Recovery"] as BrandCategory[],
  },
  { id: "Cricket", label: "Cricket", icon: Trophy, match: ["Cricket"] as BrandCategory[] },
] as const;

type FilterId = (typeof filters)[number]["id"];

function resolveFilter(value: string | null): FilterId {
  if (!value) return "All";
  const match = filters.find((item) => item.id === value || item.label === value);
  return match?.id ?? "All";
}

const categoryLabels: Record<string, string> = {
  "Racquet Sports": "Racquet Sports",
  "Table Tennis": "Table Tennis",
  "Sports Goods": "Sports Equipment",
  "Supports & Recovery": "Fitness & Support",
  Cricket: "Cricket",
};

export function BrandFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<FilterId>("All");

  useEffect(() => {
    setCategory(resolveFilter(searchParams.get("category")));
  }, [searchParams]);

  function selectCategory(next: FilterId) {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const visibleBrands = useMemo(() => {
    const active = filters.find((item) => item.id === category);
    if (!active || category === "All") return brands;
    return brands.filter((brand) => active.match.includes(brand.category));
  }, [category]);

  return (
    <div className="brands-listing">
      <div className="filter-row brands-filter-row" aria-label="Brand categories">
        {filters.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "filter-chip filter-chip-active" : "filter-chip"}
              onClick={() => selectCategory(item.id)}
              aria-pressed={category === item.id}
            >
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
        <button
          type="button"
          className="filter-clear"
          onClick={() => selectCategory("All")}
          disabled={category === "All"}
        >
          Clear All
        </button>
      </div>

      <div className="brand-grid brand-grid-proposal">
        {visibleBrands.map((brand) => (
          <Link key={brand.slug} href={`/brands/${brand.slug}`} className="brand-card brand-card-proposal">
            <span className="brand-card-logo">
              <BrandLogo text={brand.logoText} className={brand.logoClass} src={brand.logoSrc} />
            </span>
            <span className="sr-only">{brand.name}</span>
            <span className="brand-card-category">
              {brand.displayCategory ?? categoryLabels[brand.category] ?? brand.category}
            </span>
            <span className="text-link brand-card-cta">View Brand →</span>
          </Link>
        ))}
      </div>

      {!visibleBrands.length ? (
        <p className="empty-state">No brands match this category yet.</p>
      ) : null}

      <div className="brands-partner-strip">
        <div className="brands-partner-copy">
          <span className="brands-partner-icon" aria-hidden="true">
            <Handshake size={24} strokeWidth={1.75} />
          </span>
          <div>
            <h2>Let&apos;s Build Winning Partnerships</h2>
            <p>Join a network of global brands and grow with ARP.</p>
          </div>
        </div>
        <LinkButton href="/wholesale">Partner With Us</LinkButton>
      </div>
    </div>
  );
}
