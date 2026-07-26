"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Undo2,
} from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import type { FeaturedProduct } from "@/content/types";
import { cn } from "@/lib/utils";

type ProductPurchaseProps = {
  product: FeaturedProduct;
  brandName: string;
  brandSlug: string;
};

const colorMap: Record<string, string> = {
  White: "#ffffff",
  "Navy Blue": "#0b2f6b",
  Navy: "#0b2f6b",
  "Light Grey": "#d7dce5",
  Black: "#111827",
  Blue: "#1d4ed8",
  Sunburst: "#f59e0b",
};

export function ProductPurchase({ product, brandName, brandSlug }: ProductPurchaseProps) {
  const gallery = product.images.length ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [color, setColor] = useState(
    product.colors.includes("Navy Blue")
      ? "Navy Blue"
      : product.colors.includes("Navy")
        ? "Navy"
        : product.colors[0] ?? "",
  );
  const [size, setSize] = useState(product.sizes.includes("9") ? "9" : product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const inquiryHref = useMemo(() => {
    const params = new URLSearchParams({
      type: "product",
      brand: brandName,
      product: product.name,
      color,
      size,
    });
    return `/wholesale?${params.toString()}`;
  }, [brandName, color, product.name, size]);

  const colorLabel =
    product.colors.length >= 2
      ? `${product.colors[0]} / ${product.colors[1]}`
      : product.colors[0] ?? "Standard";

  return (
    <div className="product-layout">
      <div className="product-gallery">
        <div className={cn("product-main-image", zoomed && "product-main-image-zoomed")}>
          <Image
            src={activeImage}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            priority
            style={zoomed ? { objectFit: "contain", transform: "scale(1.35)" } : undefined}
          />
          <button
            type="button"
            className="product-zoom-btn"
            aria-label={zoomed ? "Zoom out product image" : "Zoom product image"}
            aria-pressed={zoomed}
            onClick={() => setZoomed((value) => !value)}
          >
            <Search size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="product-thumbs" aria-label="Product images">
          {gallery.map((image) => (
            <button
              key={image}
              type="button"
              className={cn("product-thumb", activeImage === image && "product-thumb-active")}
              onClick={() => {
                setActiveImage(image);
                setZoomed(false);
              }}
              aria-label="View product image"
              aria-pressed={activeImage === image}
            >
              <span className="product-thumb-media">
                <Image src={image} alt="" fill sizes="88px" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="product-buy-module">
        <Link href={`/brands/${brandSlug}`} className="product-brand-mark">
          {brandName.toUpperCase()}
        </Link>
        <h1>{product.name}</h1>
        <p className="product-tagline">{product.tagline}</p>
        <div className="product-price-row">
          <strong>{product.price}</strong>
          {product.inStock ? (
            <span className="stock-pill">
              <CheckCircle2 size={16} aria-hidden="true" /> In Stock
            </span>
          ) : (
            <span className="stock-pill stock-pill-out">Out of Stock</span>
          )}
        </div>

        {product.colors.length ? (
          <fieldset className="product-option">
            <legend>Color: {colorLabel}</legend>
            <div className="color-swatches">
              {product.colors.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn("color-swatch", color === item && "color-swatch-active")}
                  onClick={() => setColor(item)}
                  aria-label={item}
                  aria-pressed={color === item}
                  title={item}
                  style={{ background: colorMap[item] ?? "#cfd7e4" }}
                />
              ))}
            </div>
          </fieldset>
        ) : null}

        {product.sizes.length ? (
          <fieldset className="product-option">
            <div className="size-legend-row">
              <legend>Size: US</legend>
              <Link href="/faq#products" className="text-link">
                Size Guide
              </Link>
            </div>
            <div className="size-grid">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn("size-chip", size === item && "size-chip-active")}
                  onClick={() => setSize(item)}
                  aria-pressed={size === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="product-actions">
          <Button
            type="button"
            showArrow={false}
            onClick={() => setAdded(true)}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {added ? "Added — Continue Inquiry" : "Add to Cart"}
          </Button>
          <LinkButton href={inquiryHref} variant="secondary">
            Buy Now
          </LinkButton>
        </div>

        {added ? (
          <p className="product-cart-note" role="status">
            Demo cart UI from the proposal — continue via inquiry (no online checkout yet).{" "}
            <Link href={inquiryHref}>Send product inquiry</Link>
            {" · "}
            <Link href={`/brands/${brandSlug}`}>Back to {brandName}</Link>
          </p>
        ) : null}

        <div className="product-trust">
          <span>
            <ShieldCheck size={18} aria-hidden="true" /> 100% Authentic
          </span>
          <span>
            <Truck size={18} aria-hidden="true" /> Fast Delivery Across UAE
          </span>
          <span>
            <Undo2 size={18} aria-hidden="true" /> Easy Returns 7 Days
          </span>
        </div>
      </div>
    </div>
  );
}
