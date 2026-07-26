import type { LucideIcon } from "lucide-react";

export type BrandCategory =
  | "Racquet Sports"
  | "Table Tennis"
  | "Cricket"
  | "Sports Goods"
  | "Supports & Recovery";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface DownloadableCatalogue {
  label: string;
  url: string;
}

export interface Brand {
  name: string;
  slug: string;
  category: BrandCategory;
  /** Overrides the category label shown on brand cards (proposal slide 17). */
  displayCategory?: string;
  logoText: string;
  logoClass: string;
  /** Transparent PNG extracted from proposal slide 17 */
  logoSrc: string;
  description: string;
  introduction: string;
  relationship: string;
  categories: string[];
  catalogue: DownloadableCatalogue;
  globalWebsite: string;
  verificationUrl?: string;
}

export type NewsCategory =
  | "Company News"
  | "Brand News"
  | "Product Launches"
  | "Partnerships"
  | "Events";

export interface NewsSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  excerpt: string;
  heroImage: string;
  author: string;
  readTime: string;
  /** @deprecated Prefer sections for TOC-enabled articles */
  body?: string[];
  sections: NewsSection[];
}

export interface Location {
  id: string;
  name: string;
  storeType: "Official Branch" | "Authorized Reseller";
  emirate: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  brands: string[];
  directionsUrl: string;
  image?: string;
  distance?: string;
}

export type StoreCity = "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "Al Ain";

export type StoreKind =
  | "Main Showroom"
  | "Showroom"
  | "Pro Shop"
  | "Partner Store"
  | "Service Point";

export type StoreAmenity = "Free Parking" | "Product Experts" | "Easy Returns" | "Secure Payments";

/** A point on the schematic UAE map, expressed as a percentage of the map box. */
export interface MapPoint {
  x: number;
  y: number;
}

export interface OpeningHoursRow {
  days: string;
  time: string;
}

/** An ARP-operated location shown on /locations and (when official) /authorized-resellers. */
export interface StoreBranch {
  id: string;
  name: string;
  kind: StoreKind;
  /** Official branches are the three flagship sites listed on the reseller directory. */
  officialBranch: boolean;
  city: StoreCity;
  area: string;
  address: string;
  distance: string;
  phone: string;
  whatsapp: string;
  hoursSummary: string;
  openingHours: OpeningHoursRow[];
  amenities: StoreAmenity[];
  brands: string[];
  categories: string[];
  sports: string[];
  image: string;
  directionsUrl: string;
  map: MapPoint;
}

/** A third-party store authorized to sell ARP-distributed brands. */
export interface AuthorizedReseller {
  id: string;
  name: string;
  category: string;
  city: StoreCity;
  area: string;
  address: string;
  phone: string;
  /** Wordmark rendered in place of a logo file. */
  logoText: string;
  logoClass: string;
  brands: string[];
  sports: string[];
  directionsUrl: string;
  map: MapPoint;
}

export interface ContactDetails {
  telephone: string;
  email: string;
  officeAddress: string;
  businessHours: string;
}

export interface Metric {
  label: string;
  value: string;
  detail?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
}

/**
 * A line from ARP's own stock lists. Unlike FeaturedProduct (which carries
 * marketing copy and photography for the showcase PDPs), these are the real
 * catalogue rows: barcode, AED retail price and live stock flag.
 */
export interface CatalogueProduct {
  slug: string;
  name: string;
  /** EAN barcode exactly as printed on the client stock list. */
  sku: string;
  brandSlug: string;
  brandName: string;
  category: string;
  priceAed: number;
  /** Selling unit from the stock list: Pc, Prs, Pkt, Set… */
  unit: string;
  inStock: boolean;
}

export interface FeaturedProduct {
  slug: string;
  brandSlug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  inStock: boolean;
  colors: string[];
  sizes: string[];
  image: string;
  images: string[];
}
