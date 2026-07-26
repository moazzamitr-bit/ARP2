export type FooterLink = {
  label: string;
  href: string;
  emphasize?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

/**
 * Footer IA from proposal slide 21.
 * Every page on the site is reachable from here — the brand columns list all six
 * brand pages and their partnership pages so nothing is orphaned.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "About ARP",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Our Story", href: "/about#timeline" },
      { label: "Our Values", href: "/about#values" },
      { label: "News & Media", href: "/news" },
      { label: "Careers", href: "/wholesale?type=careers" },
      { label: "Business Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Brands",
    links: [
      { label: "Yonex", href: "/brands/yonex" },
      { label: "STIGA", href: "/brands/stiga" },
      { label: "Cosco", href: "/brands/cosco" },
      { label: "LP Support", href: "/brands/lp-support" },
      { label: "SS Cricket", href: "/brands/ss-cricket" },
      { label: "Surco", href: "/brands/surco" },
      { label: "All Brands", href: "/brands", emphasize: true },
    ],
  },
  {
    title: "Partnerships",
    links: [
      { label: "Yonex", href: "/brands/yonex/partnership" },
      { label: "STIGA", href: "/brands/stiga/partnership" },
      { label: "LP Support", href: "/brands/lp-support/partnership" },
      { label: "SS Cricket", href: "/brands/ss-cricket/partnership" },
      { label: "Surco", href: "/brands/surco/partnership" },
      { label: "Partner With Us", href: "/wholesale" , emphasize: true  },
    ],
  },
  {
    title: "Shop & Stores",
    links: [
      { label: "Shop Online", href: "/shop" },
      { label: "Sports Categories", href: "/sports" },
      { label: "Authorized Resellers", href: "/authorized-resellers" },
      { label: "Events & Clinics", href: "/news" },
      { label: "Brand Partners", href: "/brands" },
      { label: "Wholesale Benefits", href: "/wholesale#benefits" },
      { label: "Find a Store", href: "/locations", emphasize: true },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Delivery", href: "/faq#orders" },
      { label: "Returns & Refunds", href: "/faq#returns" },
      { label: "Warranty", href: "/faq#returns" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Institutional Supply", href: "/wholesale?type=institutional" },
      { label: "FAQs", href: "/faq", emphasize: true },
    ],
  },
];

/** Brand marks in footer strip — transparent PNGs extracted from proposal slide 21. */
/** Kept to four marks so the strip fits on one line without scrolling. */
export const footerBrandLogos = [
  { name: "Yonex", src: "/assets/samples/logos/yonex.png", href: "/brands/yonex" },
  { name: "STIGA", src: "/assets/samples/logos/stiga.png", href: "/brands/stiga" },
  { name: "COSCO", src: "/assets/samples/logos/cosco.png", href: "/brands/cosco" },
  { name: "Mizuno", src: "/assets/samples/logos/mizuno.png", href: "/brands" },
] as const;

export const footerTrust = [
  { title: "100% Authentic", detail: "Genuine products" },
  { title: "Fast Delivery", detail: "Across UAE" },
  { title: "Easy Returns", detail: "7-day policy" },
] as const;
