import { site } from "./site";
import type { NewsArticle, NewsCategory } from "./types";

export const newsCategories: Array<"All" | NewsCategory> = [
  "All",
  "Company News",
  "Brand News",
  "Product Launches",
  "Partnerships",
  "Events",
];

export const newsArticles: NewsArticle[] = [
  {
    slug: "arp-partner-network-update",
    title: "How ARP Is Strengthening Its Partner Network Across the UAE",
    category: "Company News",
    date: "2026-07-18",
    excerpt:
      "A closer look at how ARP supports retailers, clubs and institutions with clearer supply pathways and local brand expertise.",
    heroImage: "/assets/samples/events/event-officials.webp",
    author: "ARP Editorial",
    readTime: "5 min read",
    sections: [
      {
        id: "why-partners-matter",
        heading: "Why Local Partners Matter",
        paragraphs: [
          "ARP’s distribution model is built around trusted partners who bring authentic products closer to athletes, schools and retail customers across the UAE.",
          "By combining authorized brand supply with local support, partners can serve demand with greater confidence and consistency.",
        ],
      },
      {
        id: "what-is-changing",
        heading: "What Is Changing This Season",
        paragraphs: [
          "The partner network update focuses on clearer assortment guidance, faster response times for wholesale enquiries, and more structured brand resources.",
          "These improvements help retailers plan inventory with better visibility while keeping the customer experience aligned with each brand’s standards.",
        ],
      },
      {
        id: "how-partners-benefit",
        heading: "How Partners Benefit",
        paragraphs: [
          "Authorized partners gain access to catalogue support, product knowledge, and a direct route into ARP’s wholesale and institutional channels.",
          "The result is a cleaner buying journey — from enquiry to delivery — that protects brand integrity and strengthens long-term relationships.",
        ],
      },
      {
        id: "next-steps",
        heading: "Next Steps for Retailers",
        paragraphs: [
          "Retailers and clubs interested in joining the network can start with a wholesale enquiry and share their category focus, territory and volume needs.",
          "ARP’s team will then guide the next steps based on brand availability and partnership fit.",
        ],
      },
    ],
  },
  {
    slug: "brand-availability-announcement",
    title: "New Season Brand Availability Across Racquet and Team Sports",
    category: "Brand News",
    date: "2026-07-12",
    excerpt:
      "Official updates on how ARP is bringing curated global brands to wholesale and retail partners throughout the UAE.",
    heroImage: site.assets.brandHero,
    author: "Brand Desk",
    readTime: "4 min read",
    sections: [
      {
        id: "season-overview",
        heading: "Season Overview",
        paragraphs: [
          "ARP continues to expand access to performance brands across racquet sports, table tennis, cricket and multi-sport categories.",
          "This season’s availability update is designed to help partners plan assortments earlier and with clearer category priorities.",
        ],
      },
      {
        id: "priority-categories",
        heading: "Priority Categories",
        paragraphs: [
          "Racquet sports and team sports remain central to partner demand, with growing interest in footwear, apparel and training essentials.",
          "ARP’s brand pages and catalogues give partners a structured view of featured products and official resources.",
        ],
      },
      {
        id: "working-with-arp",
        heading: "Working With ARP",
        paragraphs: [
          "Partners can review brand pages for category shortcuts, featured products and downloadable catalogues before submitting an enquiry.",
          "This keeps conversations focused on real assortment needs rather than generic product requests.",
        ],
      },
    ],
  },
  {
    slug: "retailer-support-program",
    title: "Inside ARP’s Retailer Support Program for Growing Stores",
    category: "Partnerships",
    date: "2026-07-05",
    excerpt:
      "How ARP helps authorized retailers grow with brand education, assortment guidance and responsive local support.",
    heroImage: site.assets.wholesaleHero,
    author: "Partnerships Team",
    readTime: "6 min read",
    sections: [
      {
        id: "program-focus",
        heading: "Program Focus",
        paragraphs: [
          "The retailer support program is built for stores that want authentic products, clearer brand storytelling and dependable wholesale pathways.",
          "ARP pairs product access with practical guidance so partners can serve customers with confidence.",
        ],
      },
      {
        id: "support-pillars",
        heading: "Support Pillars",
        paragraphs: [
          "Support covers assortment planning, brand positioning, and enquiry handling for bulk and institutional needs.",
          "Partners also gain access to catalogues and local contact points for faster follow-up.",
        ],
      },
      {
        id: "who-should-apply",
        heading: "Who Should Apply",
        paragraphs: [
          "Independent sports retailers, multi-brand stores and specialty shops looking to expand authorized lines are a strong fit.",
          "Share your store profile, priority sports and target customers when you reach out through the wholesale form.",
        ],
      },
    ],
  },
  {
    slug: "yonex-performance-footwear-spotlight",
    title: "Product Spotlight: Yonex Performance Footwear for Court Speed",
    category: "Product Launches",
    date: "2026-06-28",
    excerpt:
      "A closer look at court footwear designed for agility, cushioning and match-day confidence — now featured in ARP’s Yonex assortment.",
    heroImage: site.assets.productShoe,
    author: "Product Desk",
    readTime: "4 min read",
    sections: [
      {
        id: "designed-for-movement",
        heading: "Designed for Movement",
        paragraphs: [
          "Performance court shoes are built for quick transitions, stable landings and reliable grip during intense rallies.",
          "For players and retailers alike, the right footwear story helps customers choose with clarity.",
        ],
      },
      {
        id: "what-partners-should-know",
        heading: "What Partners Should Know",
        paragraphs: [
          "Featured models appear on the Yonex brand page with category filters for shoes, racquets, apparel and shuttlecocks.",
          "Wholesale partners can enquire for availability, sizing guidance and assortment recommendations.",
        ],
      },
      {
        id: "where-to-explore",
        heading: "Where to Explore",
        paragraphs: [
          "Visit the Yonex brand page to browse featured products, or open a product page to review pricing presentation, colourways and trust signals.",
          "For partnership conversations, the wholesale enquiry remains the fastest next step.",
        ],
      },
    ],
  },
  {
    slug: "community-clinics-and-events",
    title: "Inside the Yonex Emerging Junior Championship in Dubai",
    category: "Events",
    date: "2026-06-20",
    excerpt:
      "Young badminton players from across the UAE took to the court for the Yonex Emerging Junior Championship — with ARP supporting the event as Yonex's official UAE distribution partner.",
    heroImage: "/assets/samples/events/event-ceremony.webp",
    author: "Events Team",
    readTime: "3 min read",
    sections: [
      {
        id: "the-championship",
        heading: "A Stage for Emerging Talent",
        paragraphs: [
          "The Yonex Emerging Junior Championship brought junior players from academies across the UAE together for a weekend of competitive badminton in Dubai.",
          "As the official UAE distribution partner of Yonex, ARP supported the championship courtside — from equipment to the prize distribution ceremony that closed the event.",
        ],
      },
      {
        id: "why-events-matter",
        heading: "Why Events Like This Matter",
        paragraphs: [
          "Tournaments give young players real match experience with tournament-grade equipment, and give families and academies a community to grow in.",
          "For ARP, they are also the clearest way to show what official brand support looks like: genuine products, professional organisation and a direct connection between the brand and its players.",
        ],
      },
      {
        id: "partner-involvement",
        heading: "Get Involved",
        paragraphs: [
          "Clubs and academies interested in co-hosting events or entering teams in future championships can reach ARP through the partner application.",
          "Retailers can also feature event calendars in-store — ask your account manager for upcoming dates.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return newsArticles.slice(0, limit);
  const sameCategory = newsArticles.filter(
    (article) => article.slug !== slug && article.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  return newsArticles.filter((article) => article.slug !== slug).slice(0, limit);
}
