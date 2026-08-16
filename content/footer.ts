export type FooterLink = {
  label: string;
  href: string;
  emphasize?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "About ARP",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Our Story", href: "/about#timeline" },
      { label: "Our Values", href: "/about#values" },
      { label: "News & Media", href: "/news" },
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
      { label: "All Brands", href: "/brands", emphasize: true },
    ],
  },
  {
    title: "Shop & Stores",
    links: [
      { label: "Branch 1", href: "/locations#dubai-flagship" },
      { label: "Branch 2", href: "/locations#abu-dhabi-branch" },
      { label: "Branch 3", href: "/locations#sharjah-branch" },
      { label: "Resellers", href: "/authorized-resellers", emphasize: true },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Venue Booking", href: "/venue" },
      { label: "Shipping & Delivery", href: "/faq#orders" },
      { label: "Returns & Refunds", href: "/faq#returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "FAQs", href: "/faq", emphasize: true },
    ],
  },
];

export const footerBrandLogos = [
  { name: "Yonex", src: "/assets/revisions/logos/yonex-white.png", href: "/brands/yonex" },
  { name: "STIGA", src: "/assets/samples/logos/stiga.png", href: "/brands/stiga" },
  { name: "COSCO", src: "/assets/samples/logos/cosco.png", href: "/brands/cosco" },
  { name: "LP Support", src: "/assets/samples/logos/lp-support.png", href: "/brands/lp-support" },
] as const;

export const footerTrust = [
  { title: "100% Authentic", detail: "Genuine products" },
  { title: "UAE Coverage", detail: "Retail partner network" },
  { title: "Direct Support", detail: "Office and WhatsApp" },
] as const;
