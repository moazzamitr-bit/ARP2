"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, MapPin, SlidersHorizontal } from "lucide-react";
import { catalogueProducts } from "@/content/catalogue";
import { brands } from "@/content/brands";
import { featuredProducts, formatAed } from "@/content/products";
import { cn } from "@/lib/utils";

const stockOptions = ["All", "In Stock", "Out of Stock"] as const;
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Name (A–Z)"] as const;
const PAGE_SIZE = 24;

/** Featured PDP products and raw stock-list rows, unified for the shop grid. */
type ShopItem = {
  key: string;
  name: string;
  brandSlug: string;
  brandName: string;
  category: string;
  priceAed: number;
  priceLabel: string;
  inStock: boolean;
  unit?: string;
  sku?: string;
  /** Only featured products have photography and a product page. */
  image?: string;
  href?: string;
  featured: boolean;
};

const shopItems: ShopItem[] = [
  ...featuredProducts.map((product) => {
    const brandMeta = brands.find((item) => item.slug === product.brandSlug);
    return {
      key: `featured-${product.slug}`,
      name: product.name,
      brandSlug: product.brandSlug,
      brandName: brandMeta?.name ?? product.brandSlug,
      category: product.category,
      priceAed: Number.parseFloat(product.price.replace(/[^\d.]/g, "")) || 0,
      priceLabel: product.price,
      inStock: product.inStock,
      image: product.image,
      href: `/brands/${product.brandSlug}/products/${product.slug}`,
      featured: true,
    };
  }),
  ...catalogueProducts.map((product) => ({
    key: `catalogue-${product.slug}`,
    name: product.name,
    brandSlug: product.brandSlug,
    brandName: product.brandName,
    category: product.category,
    priceAed: product.priceAed,
    priceLabel: formatAed(product.priceAed),
    inStock: product.inStock,
    unit: product.unit,
    sku: product.sku,
    featured: false,
  })),
];

const categoryCounts = (() => {
  const counts = new Map<string, number>();
  for (const item of shopItems) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

export function ShopBrowser() {
  // /products?brand=stiga&category=Bats deep-links arrive from sports and brand pages.
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand");
  const initialCategory = searchParams.get("category");

  const [brand, setBrand] = useState(
    initialBrand && brands.some((item) => item.slug === initialBrand) ? initialBrand : "All",
  );
  const [category, setCategory] = useState(
    initialCategory && categoryCounts.some(([name]) => name === initialCategory)
      ? initialCategory
      : "All",
  );
  const [stock, setStock] = useState<(typeof stockOptions)[number]>("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Recommended");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const result = shopItems.filter((item) => {
      if (brand !== "All" && item.brandSlug !== brand) return false;
      if (category !== "All" && item.category !== category) return false;
      if (stock === "In Stock" && !item.inStock) return false;
      if (stock === "Out of Stock" && item.inStock) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !item.name.toLowerCase().includes(q) &&
          !item.category.toLowerCase().includes(q) &&
          !(item.sku ?? "").includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    switch (sort) {
      case "Price: Low to High":
        return [...result].sort((a, b) => a.priceAed - b.priceAed);
      case "Price: High to Low":
        return [...result].sort((a, b) => b.priceAed - a.priceAed);
      case "Name (A–Z)":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        // Recommended: featured with photography first, then in-stock, then name.
        return [...result].sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            Number(b.inStock) - Number(a.inStock) ||
            a.name.localeCompare(b.name),
        );
    }
  }, [brand, category, stock, sort, query]);

  const visible = filtered.slice(0, visibleCount);

  function resetPage() {
    setVisibleCount(PAGE_SIZE);
  }

  function clearFilters() {
    setBrand("All");
    setCategory("All");
    setStock("All");
    setQuery("");
    resetPage();
  }

  const activeCount =
    Number(brand !== "All") + Number(category !== "All") + Number(stock !== "All") + Number(Boolean(query.trim()));

  return (
    <div className="shop-layout">
      <aside className={cn("shop-sidebar", filtersOpen && "shop-sidebar-open")} aria-label="Shop filters">
        <div className="shop-sidebar-head">
          <h2>Filters</h2>
          <button type="button" className="filter-clear" onClick={clearFilters} disabled={activeCount === 0}>
            Clear All
          </button>
        </div>

        <label className="shop-search">
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            placeholder="Search name, category or barcode"
          />
        </label>

        <fieldset className="shop-filter-group">
          <legend>Brand</legend>
          <label className="shop-filter-option">
            <input type="radio" name="brand" checked={brand === "All"} onChange={() => { setBrand("All"); resetPage(); }} />
            All Brands
          </label>
          {brands.map((item) => (
            <label key={item.slug} className="shop-filter-option">
              <input
                type="radio"
                name="brand"
                checked={brand === item.slug}
                onChange={() => {
                  setBrand(item.slug);
                  resetPage();
                }}
              />
              {item.name}
            </label>
          ))}
        </fieldset>

        <fieldset className="shop-filter-group">
          <legend>Category</legend>
          <label className="shop-filter-option">
            <input type="radio" name="category" checked={category === "All"} onChange={() => { setCategory("All"); resetPage(); }} />
            All Categories
          </label>
          {categoryCounts.map(([item, count]) => (
            <label key={item} className="shop-filter-option">
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => {
                  setCategory(item);
                  resetPage();
                }}
              />
              {item}
              <em className="shop-filter-count">{count}</em>
            </label>
          ))}
        </fieldset>

        <fieldset className="shop-filter-group">
          <legend>Availability</legend>
          {stockOptions.map((item) => (
            <label key={item} className="shop-filter-option">
              <input type="radio" name="stock" checked={stock === item} onChange={() => { setStock(item); resetPage(); }} />
              {item}
            </label>
          ))}
        </fieldset>
      </aside>

      <div className="shop-results">
        <div className="shop-results-toolbar">
          <button
            type="button"
            className="shop-filters-toggle"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
          <p role="status">
            Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>
          <label className="shop-sort">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as (typeof sortOptions)[number]);
                resetPage();
              }}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="shop-product-grid">
          {visible.map((item) => (
            <ShopCard key={item.key} item={item} />
          ))}
        </div>

        {visibleCount < filtered.length ? (
          <div className="shop-load-more">
            <button type="button" className="load-more-btn" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              Load More Products
              <ChevronDown size={17} aria-hidden="true" />
            </button>
          </div>
        ) : null}

        {!filtered.length ? (
          <p className="empty-state">No products match these filters. Try clearing filters.</p>
        ) : null}
      </div>
    </div>
  );
}

function ShopCard({ item }: { item: ShopItem }) {
  const brandMeta = brands.find((meta) => meta.slug === item.brandSlug);

  const media = item.image ? (
    <div className="shop-product-media">
      <Image src={item.image} alt="" fill sizes="(max-width: 900px) 50vw, 22vw" />
    </div>
  ) : (
    // Stock-list rows ship without photography — show the brand mark instead of a fake image.
    <div className="shop-product-media shop-product-media-logo" aria-hidden="true">
      {brandMeta?.logoSrc ? (
        <Image src={brandMeta.logoSrc} alt="" width={120} height={40} className="shop-tile-logo" />
      ) : (
        <span>{item.brandName}</span>
      )}
    </div>
  );

  const body = (
    <>
      {media}
      <div className="shop-product-body">
        <span className="micro-label">{item.brandName}</span>
        <h2>{item.name}</h2>
        <p>
          {item.category}
          {item.unit ? ` · per ${item.unit}` : ""}
        </p>
        <div className="shop-product-meta">
          <strong>{item.priceLabel}</strong>
          <span className={item.inStock ? "stock-pill" : "stock-pill stock-pill-out"}>
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="shop-product-card">
        {body}
        <span className="shop-card-go" aria-hidden="true">
          <ArrowRight size={16} />
        </span>
      </Link>
    );
  }

  return (
    <div className="shop-product-card shop-product-card-static">
      {body}
      <Link
        href="/locations"
        className="shop-card-store"
        aria-label={`${item.name} — available in ARP stores`}
      >
        <MapPin size={13} aria-hidden="true" />
        In-store
      </Link>
    </div>
  );
}
