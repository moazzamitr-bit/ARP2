export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

/** Help centre content grouped by topic; each group id doubles as an anchor. */
export const faqGroups: FaqGroup[] = [
  {
    id: "products",
    title: "Products & Authenticity",
    intro: "How to be sure the equipment you buy through ARP is genuine.",
    items: [
      {
        question: "Which brands does ARP distribute in the UAE?",
        answer:
          "ARP is the official UAE distribution partner for Yonex, STIGA, Cosco, LP Support, SS Cricket and Surco. Every brand we represent is listed on our Brands page along with the product categories we stock.",
      },
      {
        question: "How do I know a product is genuine?",
        answer:
          "Buy from an ARP official branch or an authorized reseller listed on our Authorized Resellers page. Every store on that list is verified by ARP. Products supplied through these channels carry the manufacturer's original packaging and barcode.",
      },
      {
        question: "Do you publish prices and stock?",
        answer:
          "Retail prices are shown in AED on each product. Stock levels change daily, so if an item shows as out of stock, contact your nearest branch — we can often source it from another location or the next shipment.",
      },
      {
        question: "Can I see a product before buying?",
        answer:
          "Yes. Our showrooms in Dubai, Abu Dhabi and Sharjah carry display stock across most categories. Use the store locator to find opening hours and directions for the branch nearest you.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders & Delivery",
    intro: "Placing an order and getting it to you.",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Retail customers can buy in person at any ARP branch or authorized reseller. Wholesale and institutional buyers should submit the partner application form so our commercial team can set up an account with the right pricing.",
      },
      {
        question: "Do you deliver across the UAE?",
        answer:
          "Yes. We deliver to all seven emirates. Delivery timing depends on order size and destination; your account manager confirms the schedule when the order is placed.",
      },
      {
        question: "Is there a minimum order for wholesale?",
        answer:
          "Minimums vary by brand and category. The commercial team confirms the terms that apply to your business when reviewing your partner application.",
      },
      {
        question: "How do I track an order?",
        answer:
          "Wholesale orders are tracked through your ARP account manager, who provides dispatch confirmation and expected delivery dates. For in-store purchases, keep your receipt as proof of purchase.",
      },
    ],
  },
  {
    id: "wholesale",
    title: "Wholesale & Partnership",
    intro: "Becoming an ARP retail partner or reseller.",
    items: [
      {
        question: "How do I become an ARP retail partner?",
        answer:
          "Complete the Partner & Reseller Application with your company details, city and product category. Our team reviews every application and responds within 2 business days.",
      },
      {
        question: "What do I need to apply?",
        answer:
          "A registered business in the UAE, a valid trade licence, and a clear idea of the categories you want to carry. Existing retail premises help but are not required for every channel.",
      },
      {
        question: "Do you supply clubs, schools and institutions?",
        answer:
          "Yes. We supply clubs, academies, schools and government institutions with team equipment, bulk orders and facility fit-outs, including tender documentation where required.",
      },
      {
        question: "Can I become an authorized reseller?",
        answer:
          "Yes. Authorized resellers are listed publicly on our website so customers can find you. Apply through the same partner application and note which brands you want to carry.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Warranty",
    intro: "If something is not right with your purchase.",
    items: [
      {
        question: "What is your returns policy?",
        answer:
          "Unused items in original packaging can be returned within 7 days of purchase with proof of purchase. Items showing use, missing packaging or custom-strung racquets are not eligible.",
      },
      {
        question: "Are products covered by warranty?",
        answer:
          "Manufacturer warranties apply to the brands we distribute and vary by product and category. Bring the item and your proof of purchase to any ARP branch and we will handle the manufacturer claim on your behalf.",
      },
      {
        question: "What is not covered by warranty?",
        answer:
          "Normal wear, damage from misuse or accident, and any product bought outside the ARP network. This is the main reason we recommend buying only from official branches or verified authorized resellers.",
      },
    ],
  },
  {
    id: "stores",
    title: "Stores & Support",
    intro: "Finding us and getting help.",
    items: [
      {
        question: "Where are your stores?",
        answer:
          "ARP operates 12 locations across Dubai, Abu Dhabi, Sharjah and Al Ain, including three official branches. The store locator shows addresses, opening hours, phone numbers and directions for each one.",
      },
      {
        question: "What services are available in store?",
        answer:
          "Our showrooms offer product advice from trained staff, free parking at most sites, easy returns and secure payment. Selected branches also handle warranty claims and service requests.",
      },
      {
        question: "How do I contact ARP?",
        answer:
          "Call 800 ARP 277 or email info@arpgroup.ae. For partnership and wholesale enquiries, the partner application form is the fastest route — it goes straight to the commercial team.",
      },
    ],
  },
];
