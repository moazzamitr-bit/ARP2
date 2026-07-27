"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Brand, FeaturedProduct } from "@/content/types";

type FeaturedProductsSliderProps = {
  brand: Brand;
  products: FeaturedProduct[];
};

export function FeaturedProductsSlider({ brand, products }: FeaturedProductsSliderProps) {
  if (!products.length) return <p className="empty-state">No products in this category yet.</p>;

  return (
    <div className="featured-products-slider">
      <div className="featured-products-slider-head"><h2>Featured Products</h2></div>
      <div className="featured-products-track">
        {products.map((product) => {
          const whatsapp = `https://wa.me/971526347429?text=${encodeURIComponent(`Hello ARP Group, I would like to buy ${brand.name} ${product.name}.`)}`;
          return (
            <article key={product.slug} className="featured-product-card">
              <div className="featured-product-media"><Image src={product.image} alt={product.name} fill sizes="120px" /></div>
              <div className="featured-product-copy">
                <h3>{product.name}</h3>
                <p>{product.tagline}</p>
                <a className="revision-featured-buy" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> Buy on WhatsApp</a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
