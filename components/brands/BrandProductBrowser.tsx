"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CircleDot,
  MessageCircle,
  Footprints,
  Shirt,
  Waypoints,
} from "lucide-react";
import { FeaturedProductsSlider } from "@/components/brands/FeaturedProductsSlider";
import { LinkButton } from "@/components/ui/Button";
import type { Brand, FeaturedProduct } from "@/content/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Waypoints> = {
  Racquets: Waypoints,
  Shoes: Footprints,
  Apparel: Shirt,
  Shuttlecocks: CircleDot,
};

type BrandProductBrowserProps = {
  brand: Brand;
  products: FeaturedProduct[];
};

export function BrandProductBrowser({ brand, products }: BrandProductBrowserProps) {
  const categories = useMemo(() => brand.categories.slice(0, 4), [brand.categories]);
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const requestedCategory = searchParams.get("type") ?? "";
    setActiveCategory(categories.includes(requestedCategory) ? requestedCategory : "");
  }, [categories, searchParams]);

  // Unfiltered, the row shows the three highlighted products from slide 15;
  // picking a category shortcut opens up everything in that category.
  const visibleProducts = useMemo(() => {
    if (!activeCategory) return products.slice(0, 3);
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <div className="category-shortcuts" aria-label={`${brand.name} product types`} id="categories">
        {categories.map((category) => {
          const Icon = categoryIcons[category] ?? Waypoints;
          return (
            <button
              key={category}
              type="button"
              className={cn("category-shortcut", activeCategory === category && "category-shortcut-active")}
              onClick={() => setActiveCategory((current) => (current === category ? "" : category))}
              aria-pressed={activeCategory === category}
            >
              <span className="category-shortcut-left">
                <Icon size={20} aria-hidden="true" />
                <span>{category}</span>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="featured-products-block">
        <FeaturedProductsSlider brand={brand} products={visibleProducts} />
        <div className="hero-actions brand-detail-actions">
          <LinkButton href="/wholesale">Wholesale Inquiry</LinkButton>
          <a className="revision-button" href="https://wa.me/971526347429?text=Hello%20ARP%20Group%2C%20I%20need%20help%20with%20a%20brand%20product." target="_blank" rel="noreferrer">
            <MessageCircle size={17} aria-hidden="true" /> Contact Main Office
          </a>
        </div>
      </div>
    </>
  );
}
