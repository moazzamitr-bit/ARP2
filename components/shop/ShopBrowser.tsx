"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, MessageCircle, SlidersHorizontal } from "lucide-react";
import { catalogueProducts } from "@/content/catalogue";
import { brands } from "@/content/brands";
import { featuredProducts, formatAed } from "@/content/products";
import { cn } from "@/lib/utils";

const stockOptions = ["All", "In Stock", "Out of Stock"] as const;
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Name (A–Z)"] as const;
const allowedBrandSlugs = ["yonex", "stiga", "cosco", "lp-support"];
const PAGE_SIZE = 24;

const categoryAliases: Record<string, string> = {
  Training: "Bags",
  "Tables & Nets": "Table Tennis",
  Bats: "Racquets",
};

function displayCategory(category: string) {
  return categoryAliases[category] ?? category;
}

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
  image?: string;
  featured: boolean;
};

const activeBrands = brands.filter((brand) => allowedBrandSlugs.includes(brand.slug));

const shopItems: ShopItem[] = [
  ...featuredProducts
    .filter((product) => allowedBrandSlugs.includes(product.brandSlug))
    .map((product) => {
      const brandMeta = activeBrands.find((item) => item.slug === product.brandSlug);
      return {
        key: `featured-${product.slug}`,
        name: product.name,
        brandSlug: product.brandSlug,
        brandName: brandMeta?.name ?? product.brandSlug,
        category: displayCategory(product.category),
        priceAed: Number.parseFloat(product.price.replace(/[^\d.]/g, "")) || 0,
        priceLabel: product.price,
        inStock: product.inStock,
        image: product.image,
        featured: true,
      };
    }),
  ...catalogueProducts
    .filter((product) => allowedBrandSlugs.includes(product.brandSlug))
    .map((product) => ({
      key: `catalogue-${product.slug}`,
      name: product.name,
      brandSlug: product.brandSlug,
      brandName: product.brandName,
      category: displayCategory(product.category),
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
  return [...counts.entries()].sort((a, b) => {
    if (a[0] === "Racquets") return -1;
    if (b[0] === "Racquets") return 1;
    return b[1] - a[1];
  });
})();

export function ShopBrowser() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand");
  const requestedCategory = displayCategory(searchParams.get("category") ?? "");
  const [brand, setBrand] = useState(initialBrand && activeBrands.some((item) => item.slug === initialBrand) ? initialBrand : "All");
  const [category, setCategory] = useState(categoryCounts.some(([name]) => name === requestedCategory) ? requestedCategory : "All");
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
      const q = query.trim().toLowerCase();
      return !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || (item.sku ?? "").toLowerCase().includes(q);
    });
    if (sort === "Price: Low to High") return [...result].sort((a, b) => a.priceAed - b.priceAed);
    if (sort === "Price: High to Low") return [...result].sort((a, b) => b.priceAed - a.priceAed);
    if (sort === "Name (A–Z)") return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return [...result].sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.inStock) - Number(a.inStock) || a.name.localeCompare(b.name));
  }, [brand, category, stock, sort, query]);

  const visible = filtered.slice(0, visibleCount);
  const resetPage = () => setVisibleCount(PAGE_SIZE);
  const clearFilters = () => { setBrand("All"); setCategory("All"); setStock("All"); setQuery(""); resetPage(); };
  const activeCount = Number(brand !== "All") + Number(category !== "All") + Number(stock !== "All") + Number(Boolean(query.trim()));

  return (
    <div className="shop-layout">
      <aside className={cn("shop-sidebar", filtersOpen && "shop-sidebar-open")} aria-label="Product filters">
        <div className="shop-sidebar-head"><h2>Filters</h2><button type="button" className="filter-clear" onClick={clearFilters} disabled={!activeCount}>Clear All</button></div>
        <label className="shop-search"><span>Search</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); resetPage(); }} placeholder="Search products" /></label>
        <fieldset className="shop-filter-group">
          <legend>Brand</legend>
          <label className="shop-filter-option"><input type="radio" name="brand" checked={brand === "All"} onChange={() => { setBrand("All"); resetPage(); }} />All Brands</label>
          {activeBrands.map((item) => <label key={item.slug} className="shop-filter-option"><input type="radio" name="brand" checked={brand === item.slug} onChange={() => { setBrand(item.slug); resetPage(); }} />{item.name}</label>)}
        </fieldset>
        <fieldset className="shop-filter-group">
          <legend>Category</legend>
          <label className="shop-filter-option"><input type="radio" name="category" checked={category === "All"} onChange={() => { setCategory("All"); resetPage(); }} />All Categories</label>
          {categoryCounts.map(([item, count]) => <label key={item} className="shop-filter-option"><input type="radio" name="category" checked={category === item} onChange={() => { setCategory(item); resetPage(); }} />{item}<em className="shop-filter-count">{count}</em></label>)}
        </fieldset>
        <fieldset className="shop-filter-group">
          <legend>Availability</legend>
          {stockOptions.map((item) => <label key={item} className="shop-filter-option"><input type="radio" name="stock" checked={stock === item} onChange={() => { setStock(item); resetPage(); }} />{item}</label>)}
        </fieldset>
      </aside>

      <div className="shop-results">
        <div className="shop-results-toolbar">
          <button type="button" className="shop-filters-toggle" onClick={() => setFiltersOpen((value) => !value)} aria-expanded={filtersOpen}><SlidersHorizontal size={16} aria-hidden="true" />Filters{activeCount ? ` (${activeCount})` : ""}</button>
          <p role="status">Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}</p>
          <label className="shop-sort"><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => { setSort(event.target.value as (typeof sortOptions)[number]); resetPage(); }}>{sortOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>
        <div className="shop-product-grid">{visible.map((item) => <ShopCard key={item.key} item={item} />)}</div>
        {visibleCount < filtered.length ? <div className="shop-load-more"><button type="button" className="load-more-btn" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Load More Products<ChevronDown size={17} aria-hidden="true" /></button></div> : null}
        {!filtered.length ? <p className="empty-state">No products match these filters. Try clearing filters.</p> : null}
      </div>
    </div>
  );
}

function ShopCard({ item }: { item: ShopItem }) {
  const brandMeta = activeBrands.find((meta) => meta.slug === item.brandSlug);
  const whatsapp = `https://wa.me/971526347429?text=${encodeURIComponent(`Hello ARP Group, I would like to buy ${item.brandName} ${item.name}.`)}`;
  return (
    <article className="shop-product-card shop-product-card-static">
      <div className={cn("shop-product-media", !item.image && "shop-product-media-logo")}>
        {item.image ? <Image src={item.image} alt={item.name} fill sizes="(max-width: 900px) 50vw, 22vw" /> : brandMeta?.logoSrc ? <Image src={brandMeta.logoSrc} alt={item.brandName} width={120} height={40} className="shop-tile-logo" /> : <span>{item.brandName}</span>}
      </div>
      <div className="shop-product-body">
        <span className="micro-label">{item.brandName}</span>
        <h2>{item.name}</h2>
        <p>{item.category}{item.unit ? ` · per ${item.unit}` : ""}</p>
        <div className="shop-product-meta"><strong>{item.priceLabel}</strong><span className={item.inStock ? "stock-pill" : "stock-pill stock-pill-out"}>{item.inStock ? "In Stock" : "Out of Stock"}</span></div>
        <a className="revision-product-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" /> Purchase on WhatsApp</a>
      </div>
    </article>
  );
}
