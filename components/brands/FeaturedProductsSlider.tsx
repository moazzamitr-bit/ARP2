"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Brand, FeaturedProduct } from "@/content/types";

type FeaturedProductsSliderProps = {
  brand: Brand;
  products: FeaturedProduct[];
};

/** Featured product row from proposal slide 15: image, name, tagline, green arrow. */
export function FeaturedProductsSlider({ brand, products }: FeaturedProductsSliderProps) {
  if (!products.length) {
    return <p className="empty-state">No products in this category yet.</p>;
  }

  return (
    <div className="featured-products-slider">
      <div className="featured-products-slider-head">
        <h2>Featured Products</h2>
      </div>
      <div className="featured-products-track">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/brands/${brand.slug}/products/${product.slug}`}
            className="featured-product-card"
          >
            <div className="featured-product-media">
              <Image src={product.image} alt="" fill sizes="120px" />
            </div>
            <div className="featured-product-copy">
              <h3>{product.name}</h3>
              <p>{product.tagline}</p>
              <ArrowRight className="featured-product-arrow" size={18} aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
