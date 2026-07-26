"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  LayoutGrid,
  Link2,
  MapPin,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { brands } from "@/content/brands";
import {
  authorizedResellers,
  officialBranches,
  primaryCities,
  secondaryCities,
  storeCategories,
  storeSports,
} from "@/content/storeNetwork";
import type { AuthorizedReseller, StoreBranch } from "@/content/types";
import { cn } from "@/lib/utils";
import { UaeMap, type MapMarker } from "./UaeMap";

type Tab = "branches" | "resellers";

const ALL_CITIES = "All Cities";
const ALL_CATEGORIES = "All Categories";
const ALL_SPORTS = "All Sports";
const ALL_BRANDS = "All Brands";
const RESELLER_PREVIEW = 4;

const sortLabels = {
  curated: "Recommended",
  nearest: "Nearest first",
  name: "Name (A–Z)",
} as const;

export function ResellerDirectory() {
  const [tab, setTab] = useState<Tab>("branches");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(ALL_CITIES);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [sport, setSport] = useState(ALL_SPORTS);
  const [brand, setBrand] = useState(ALL_BRANDS);
  // "curated" keeps the editorial order from content/storeNetwork.ts.
  const [sort, setSort] = useState<"curated" | "nearest" | "name">("curated");
  const [moreFilters, setMoreFilters] = useState(false);
  const [showAllResellers, setShowAllResellers] = useState(false);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  const filteredBranches = useMemo(() => {
    const result = officialBranches.filter(
      (store) =>
        matchesQuery(query, [store.name, store.city, store.area, store.address]) &&
        (city === ALL_CITIES || store.city === city) &&
        (category === ALL_CATEGORIES || store.categories.includes(category)) &&
        (sport === ALL_SPORTS || store.sports.includes(sport)) &&
        (brand === ALL_BRANDS || store.brands.includes(brand)),
    );
    if (sort === "name") return [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "nearest")
      return [...result].sort((a, b) => distanceOf(a.distance) - distanceOf(b.distance));
    return result;
  }, [brand, category, city, query, sort, sport]);

  const filteredResellers = useMemo(() => {
    const result = authorizedResellers.filter(
      (store) =>
        matchesQuery(query, [store.name, store.city, store.area, store.category]) &&
        (city === ALL_CITIES || store.city === city) &&
        (category === ALL_CATEGORIES || store.category === category) &&
        (sport === ALL_SPORTS || store.sports.includes(sport)) &&
        (brand === ALL_BRANDS || store.brands.includes(brand)),
    );
    return sort === "name" ? [...result].sort((a, b) => a.name.localeCompare(b.name)) : result;
  }, [brand, category, city, query, sort, sport]);

  const visibleResellers = showAllResellers
    ? filteredResellers
    : filteredResellers.slice(0, RESELLER_PREVIEW);

  const markers: MapMarker[] = useMemo(
    () => [
      ...filteredBranches.map((store) => ({
        id: store.id,
        point: store.map,
        label: store.name,
        detail: `${store.city} · Official Branch`,
        kind: "branch" as const,
      })),
      ...filteredResellers.map((store) => ({
        id: store.id,
        point: store.map,
        label: store.name,
        detail: `${store.city} · ${store.category}`,
        kind: "reseller" as const,
      })),
    ],
    [filteredBranches, filteredResellers],
  );

  function selectMarker(id: string) {
    setActiveId(id);
    setTab(officialBranches.some((store) => store.id === id) ? "branches" : "resellers");
  }

  const filtersDirty =
    query.length > 0 ||
    city !== ALL_CITIES ||
    category !== ALL_CATEGORIES ||
    sport !== ALL_SPORTS ||
    brand !== ALL_BRANDS;

  return (
    <div className="reseller-directory">
      <div className="reseller-tabs" role="tablist" aria-label="Network type">
        <button
          type="button"
          role="tab"
          id="tab-branches"
          aria-selected={tab === "branches"}
          aria-controls="panel-branches"
          className={cn("reseller-tab", tab === "branches" && "reseller-tab-active")}
          onClick={() => setTab("branches")}
        >
          <Building2 size={17} aria-hidden="true" />
          Official Branches
        </button>
        <button
          type="button"
          role="tab"
          id="tab-resellers"
          aria-selected={tab === "resellers"}
          aria-controls="panel-resellers"
          className={cn("reseller-tab", tab === "resellers" && "reseller-tab-active")}
          onClick={() => setTab("resellers")}
        >
          <ShieldCheck size={17} aria-hidden="true" />
          Authorized Resellers
        </button>
      </div>

      <div className="reseller-grid">
        <div className="reseller-filters">
          <div className="reseller-filter-row">
            <label className="reseller-search">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Search by city, area or store</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by city, area or store"
              />
            </label>

            <FilterSelect
              icon={<MapPin size={16} aria-hidden="true" />}
              label="City"
              value={city}
              onChange={setCity}
              options={[ALL_CITIES, ...primaryCities, ...secondaryCities]}
            />
            <FilterSelect
              icon={<LayoutGrid size={16} aria-hidden="true" />}
              label="Category"
              value={category}
              onChange={setCategory}
              options={[ALL_CATEGORIES, ...storeCategories]}
            />
            <FilterSelect
              icon={<Link2 size={16} aria-hidden="true" />}
              label="Sport"
              value={sport}
              onChange={setSport}
              options={[ALL_SPORTS, ...storeSports]}
            />

            <button
              type="button"
              className={cn("more-filters-btn", moreFilters && "more-filters-btn-open")}
              aria-expanded={moreFilters}
              onClick={() => setMoreFilters((open) => !open)}
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              More Filters
            </button>
          </div>

          {moreFilters ? (
            <div className="reseller-filter-drawer">
              <FilterSelect
                label="Brand"
                value={brand}
                onChange={setBrand}
                options={[ALL_BRANDS, ...brands.map((item) => item.name)]}
              />
              <FilterSelect
                label="Sort by"
                value={sortLabels[sort]}
                onChange={(value) => {
                  const next = Object.entries(sortLabels).find(([, label]) => label === value);
                  if (next) setSort(next[0] as typeof sort);
                }}
                options={Object.values(sortLabels)}
              />
              {filtersDirty ? (
                <button
                  type="button"
                  className="clear-filters-btn"
                  onClick={() => {
                    setQuery("");
                    setCity(ALL_CITIES);
                    setCategory(ALL_CATEGORIES);
                    setSport(ALL_SPORTS);
                    setBrand(ALL_BRANDS);
                  }}
                >
                  Clear all filters
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <section
          id="panel-branches"
          role="tabpanel"
          aria-labelledby="tab-branches"
          className={cn("network-panel", tab === "branches" && "network-panel-current")}
        >
          <header className="network-panel-head">
            <h2>
              Official Branches <span>({filteredBranches.length})</span>
            </h2>
            <Link className="panel-link" href="/locations">
              View All
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </header>

          {filteredBranches.length > 0 ? (
            <ul className="network-list">
              {filteredBranches.map((store) => (
                <li key={store.id}>
                  <BranchRow
                    store={store}
                    active={store.id === activeId}
                    onSelect={() => selectMarker(store.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="network-empty">No official branches match these filters.</p>
          )}
        </section>

        <section
          id="panel-resellers"
          role="tabpanel"
          aria-labelledby="tab-resellers"
          className={cn("network-panel", tab === "resellers" && "network-panel-current")}
        >
          <header className="network-panel-head">
            <h2>
              Authorized Resellers <span>({filteredResellers.length})</span>
            </h2>
            <button
              type="button"
              className="panel-link"
              onClick={() => setShowAllResellers((open) => !open)}
              aria-expanded={showAllResellers}
            >
              {showAllResellers ? "Show Less" : "View All"}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </header>

          {filteredResellers.length > 0 ? (
            <>
              <ul className="network-list">
                {visibleResellers.map((store) => (
                  <li key={store.id}>
                    <ResellerRow
                      store={store}
                      active={store.id === activeId}
                      onSelect={() => selectMarker(store.id)}
                    />
                  </li>
                ))}
              </ul>
              {filteredResellers.length > RESELLER_PREVIEW ? (
                <button
                  type="button"
                  className="network-panel-foot"
                  onClick={() => setShowAllResellers((open) => !open)}
                  aria-expanded={showAllResellers}
                >
                  {showAllResellers ? "Show Fewer Resellers" : "View All Resellers"}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              ) : null}
            </>
          ) : (
            <p className="network-empty">No authorized resellers match these filters.</p>
          )}
        </section>

        <UaeMap
          markers={markers}
          activeId={activeId}
          onSelect={selectMarker}
          controls="bottom-right"
          className="reseller-map"
          ariaLabel="ARP official branches and authorized resellers across the UAE"
        />
      </div>
    </div>
  );
}

function BranchRow({
  store,
  active,
  onSelect,
}: {
  store: StoreBranch;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <article className={cn("branch-row", active && "network-row-active")}>
      <Image
        className="branch-row-image"
        src={store.image}
        alt=""
        width={168}
        height={128}
        sizes="84px"
      />
      <div className="branch-row-body">
        <h3>
          <button type="button" className="network-row-title" onClick={onSelect}>
            {store.name}
          </button>
          <span className="branch-badge">Official Branch</span>
        </h3>
        <p>
          <MapPin size={13} aria-hidden="true" />
          {store.address}
        </p>
        <p>
          <Clock size={13} aria-hidden="true" />
          {store.hoursSummary}
        </p>
      </div>
      <div className="branch-row-actions">
        <a href={telHref(store.phone)} aria-label={`Call ${store.name}`}>
          <Phone size={16} aria-hidden="true" />
          Call
        </a>
        <a
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${store.name}`}
        >
          <Navigation size={16} aria-hidden="true" />
          Directions
        </a>
      </div>
    </article>
  );
}

function ResellerRow({
  store,
  active,
  onSelect,
}: {
  store: AuthorizedReseller;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <article className={cn("reseller-row", active && "network-row-active")}>
      <span className={cn("reseller-mark", store.logoClass)} aria-hidden="true">
        {store.logoText}
      </span>
      <div className="reseller-row-body">
        <h3>
          <button type="button" className="network-row-title" onClick={onSelect}>
            {store.name}
          </button>
        </h3>
        <p>{store.category}</p>
        <p className="reseller-row-place">
          {store.city}, UAE <span aria-hidden="true">•</span> {store.area}
        </p>
      </div>
      <a className="reseller-row-call" href={telHref(store.phone)} aria-label={`Call ${store.name}`}>
        <Phone size={15} aria-hidden="true" />
        Call
      </a>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: ReactNode;
}) {
  return (
    <label className={cn("reseller-select", icon && "reseller-select-icon")}>
      {icon}
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function matchesQuery(query: string, fields: string[]) {
  const term = query.trim().toLowerCase();
  if (term.length === 0) return true;
  return fields.some((field) => field.toLowerCase().includes(term));
}

function distanceOf(distance: string) {
  return Number.parseFloat(distance) || Number.MAX_SAFE_INTEGER;
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
