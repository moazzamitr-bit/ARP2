import type { ContactDetails, Metric } from "./types";

export const site = {
  name: "Al Raed Pioneers",
  shortName: "ARP",
  domain: "https://arpgroup.ae",
  description:
    "Official sports brand distribution partner in the UAE for wholesale buyers, retailers, institutions and customers.",
  foundingYear: "1969",
  assets: {
    homeHero: "/assets/samples/heroes/24.webp",
    aboutHero: "/assets/samples/heroes/about-building.webp",
    wholesaleHero: "/assets/samples/heroes/wholesale-handshake.webp",
    brandHero: "/assets/samples/heroes/badminton-athlete.webp",
    store: "/assets/samples/heroes/storefront.webp",
    footerRunner: "/assets/samples/heroes/footer-athlete.webp",
    brandsSkyline: "/assets/samples/heroes/dubai-skyline.webp",
    productShoe: "/assets/samples/products/shoe-main.jpg",
    partners: {
      yonex: "/assets/samples/logos/yonex.png",
      adidas: "/assets/samples/logos/adidas.png",
      mizuno: "/assets/samples/logos/mizuno.png",
      wilson: "/assets/samples/logos/wilson.png",
    },
  },
};

export const approvedMetrics: Metric[] = [
  { value: "55+", label: "Years of Experience" },
  { value: "12+", label: "Sports Categories" },
  { value: "3", label: "Physical Locations" },
  { value: "900+", label: "Retail Partners" },
];

export const contactDetails: ContactDetails = {
  telephone: "+971 4 355 5589",
  email: "info@arpgroup.ae",
  officeAddress: "Shop No 1, Al Gassimi Bldg No 2, Souq Al Khabeer, Bur Dubai, Dubai, UAE",
  businessHours: "Monday - Friday, 8:00 AM - 4:00 PM",
};

export const globalPartners = [
  { name: "Yonex", src: "/assets/samples/logos/yonex.png", href: "/brands/yonex" },
  { name: "adidas", src: "/assets/samples/logos/adidas.png", href: "/brands" },
  { name: "Mizuno", src: "/assets/samples/logos/mizuno.png", href: "/brands" },
  { name: "Wilson", src: "/assets/samples/logos/wilson.png", href: "/brands" },
] as const;
