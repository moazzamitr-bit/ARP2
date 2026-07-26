import { catalogueProducts } from "./catalogue";
import type { FeaturedProduct } from "./types";

/** Sample featured / PDP products with HQ stock photography. */
export const featuredProducts: FeaturedProduct[] = [
  {
    slug: "astrox-100-zz",
    brandSlug: "yonex",
    category: "Racquets",
    name: "ASTROX 100 ZZ",
    tagline: "Dominate every rally with explosive power.",
    description: "Rotational Generator System and Namd graphite construction for aggressive badminton performance.",
    price: "AED 1,299.00",
    inStock: true,
    colors: ["Black", "Sunburst"],
    sizes: [],
    image: "/assets/samples/products/racquet.jpg",
    images: [
      "/assets/samples/products/racquet.jpg",
      "/assets/samples/products/badminton-gear.jpg",
      "/assets/samples/heroes/badminton-athlete.jpg",
      "/assets/samples/products/shuttlecock.jpg",
    ],
  },
  {
    slug: "power-cushion-65-z4",
    brandSlug: "yonex",
    category: "Shoes",
    name: "Power Cushion 65 Z4 Men",
    tagline: "Lightweight performance. Built for speed and stability.",
    description: "Court shoe engineered for quick transitions, cushioned landings and reliable grip.",
    price: "AED 499.00",
    inStock: true,
    colors: ["White", "Navy Blue", "Light Grey"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "/assets/samples/products/shoe-main.jpg",
    images: [
      "/assets/samples/products/shoe-main.jpg",
      "/assets/samples/products/shoe-side.jpg",
      "/assets/samples/products/shoe-detail.jpg",
      "/assets/samples/products/shoe-white.jpg",
    ],
  },
  {
    slug: "aerosensa-50",
    brandSlug: "yonex",
    category: "Shuttlecocks",
    name: "AEROSENSA 50",
    tagline: "Consistent flight. Tournament grade.",
    description: "Reliable flight and durability suited to clubs, academies and match environments.",
    price: "AED 189.00",
    inStock: true,
    colors: ["White"],
    sizes: [],
    image: "/assets/samples/products/badminton-gear.jpg",
    images: [
      "/assets/samples/products/badminton-gear.jpg",
      "/assets/samples/products/racquet.jpg",
      "/assets/samples/heroes/badminton-athlete.jpg",
      "/assets/samples/products/table-tennis.jpg",
    ],
  },
  {
    slug: "power-cushion-88-dial",
    brandSlug: "yonex",
    category: "Shoes",
    name: "Power Cushion 88 Dial Men",
    tagline: "Precision fit with responsive court cushioning.",
    description: "Dial-fit support engineered for players who need secure lockdown and agility.",
    price: "AED 599.00",
    inStock: true,
    colors: ["White", "Blue"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "/assets/samples/products/shoe-pair.jpg",
    images: [
      "/assets/samples/products/shoe-pair.jpg",
      "/assets/samples/products/shoe-main.jpg",
      "/assets/samples/products/shoe-side.jpg",
      "/assets/samples/products/shoe-detail.jpg",
    ],
  },
  {
    slug: "power-cushion-57-z3",
    brandSlug: "yonex",
    category: "Shoes",
    name: "Power Cushion 57 Z3 Men",
    tagline: "Agility. Stability. Absolute comfort.",
    description: "Everyday performance shoe for club and training sessions.",
    price: "AED 429.00",
    inStock: true,
    colors: ["White", "Navy Blue"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "/assets/samples/products/shoe-white.jpg",
    images: [
      "/assets/samples/products/shoe-white.jpg",
      "/assets/samples/products/shoe-detail.jpg",
      "/assets/samples/products/shoe-main.jpg",
      "/assets/samples/products/shoe-side.jpg",
    ],
  },
  {
    slug: "power-cushion-aerus-z",
    brandSlug: "yonex",
    category: "Shoes",
    name: "Power Cushion Aerus Z Men",
    tagline: "Ultra-light court speed with lasting cushioning.",
    description: "Lightweight upper and responsive midsole for fast directional play.",
    price: "AED 649.00",
    inStock: true,
    colors: ["White", "Light Grey"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "/assets/samples/products/shoe-detail.jpg",
    images: [
      "/assets/samples/products/shoe-detail.jpg",
      "/assets/samples/products/shoe-pair.jpg",
      "/assets/samples/products/shoe-main.jpg",
      "/assets/samples/products/shoe-white.jpg",
    ],
  },
  {
    slug: "yonex-game-shirt",
    brandSlug: "yonex",
    category: "Apparel",
    name: "Game Shirt",
    tagline: "Breathable match apparel for intense rallies.",
    description: "Moisture-managing fabric designed for tournament and training play.",
    price: "AED 189.00",
    inStock: true,
    colors: ["White", "Navy Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    image: "/assets/samples/products/sportswear.jpg",
    images: [
      "/assets/samples/products/sportswear.jpg",
      "/assets/samples/products/apparel.jpg",
      "/assets/samples/products/training.jpg",
      "/assets/samples/heroes/footer-athlete.jpg",
    ],
  },
];

export function getProduct(slug: string) {
  return featuredProducts.find((product) => product.slug === slug);
}

export function getProductsByBrand(brandSlug: string) {
  return featuredProducts.filter((product) => product.brandSlug === brandSlug);
}

/** AED figures on the stock lists are whole dirhams. */
export function formatAed(value: number) {
  return `AED ${value.toLocaleString("en-AE")}`;
}

export function getCatalogueByBrand(brandSlug: string) {
  return catalogueProducts.filter((product) => product.brandSlug === brandSlug);
}

export function getCatalogueProduct(slug: string) {
  return catalogueProducts.find((product) => product.slug === slug);
}

/** Distinct categories, ordered by how many products sit in each. */
export function getCatalogueCategories(brandSlug?: string) {
  const scope = brandSlug ? getCatalogueByBrand(brandSlug) : catalogueProducts;
  const counts = new Map<string, number>();
  for (const product of scope) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({ category, count }));
}

export function getRelatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return featuredProducts.slice(0, limit);
  const sameCategory = featuredProducts.filter(
    (product) =>
      product.slug !== slug &&
      product.brandSlug === current.brandSlug &&
      product.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  return featuredProducts
    .filter((product) => product.slug !== slug && product.brandSlug === current.brandSlug)
    .slice(0, limit);
}
