export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export const termsLastUpdated = "25 July 2026";

/**
 * Standard commercial terms for a UAE distribution business.
 * These are a drafting starting point and must be reviewed by ARP's legal
 * counsel before the site goes live — see the notice rendered on the page.
 */
export const termsSections: LegalSection[] = [
  {
    id: "about",
    heading: "About these terms",
    paragraphs: [
      "These terms govern your use of the ARP Group website and any enquiry, application or order you place through it. Al Raed Pioneers (ARP) is a sports brand distribution business registered in the United Arab Emirates.",
      "By using this website you accept these terms. If you do not accept them, please do not use the site.",
    ],
  },
  {
    id: "website",
    heading: "Using this website",
    paragraphs: [
      "You may browse the site, download published catalogues and submit enquiries for legitimate business or personal purposes.",
    ],
    bullets: [
      "Do not attempt to gain unauthorised access to any part of the site or its systems.",
      "Do not copy, scrape or republish site content for commercial use without written permission.",
      "Do not submit false information in any form on the site.",
      "We may suspend or withdraw access to the site at any time without notice.",
    ],
  },
  {
    id: "products",
    heading: "Products, pricing and availability",
    paragraphs: [
      "Product information, specifications and images are provided for guidance. Manufacturers may change specifications without notice, and packaging may differ from the images shown.",
      "Prices are shown in UAE Dirhams (AED) and are subject to change. Stock levels shown on the site reflect our records at the time of publication and are not a guarantee of availability. Where an item is unavailable, we will offer an alternative or confirm the expected restock date.",
      "Wholesale pricing is confirmed in writing by our commercial team and may differ from published retail prices.",
    ],
  },
  {
    id: "orders",
    heading: "Orders and payment",
    paragraphs: [
      "Submitting an enquiry or application through this site does not create a contract. A contract is formed only when ARP confirms an order in writing.",
      "Retail purchases are completed in person at an ARP branch or an authorized reseller. Wholesale orders are placed through your account manager under agreed account terms.",
      "We may decline or cancel an order where a product is unavailable, where pricing has been published in error, or where we are unable to verify the buyer.",
    ],
  },
  {
    id: "delivery",
    heading: "Delivery",
    paragraphs: [
      "We deliver across the United Arab Emirates. Delivery timing depends on order size, product availability and destination, and is confirmed when your order is accepted.",
      "Delivery dates are estimates. We are not liable for delays caused by events outside our reasonable control, including customs clearance, supplier delays or transport disruption.",
      "Risk in the goods passes to you on delivery. Title passes once payment has been received in full.",
    ],
  },
  {
    id: "returns",
    heading: "Returns and cancellations",
    paragraphs: [
      "Unused items in their original, unopened packaging may be returned within 7 days of purchase with valid proof of purchase.",
    ],
    bullets: [
      "Items showing signs of use, missing packaging, or customised products such as strung racquets are not eligible for return.",
      "Wholesale and special-order items are subject to the cancellation terms in your account agreement.",
      "Refunds are issued using the original payment method once the returned item has been inspected.",
      "Nothing in this section affects your statutory rights under UAE consumer protection law.",
    ],
  },
  {
    id: "warranty",
    heading: "Warranty",
    paragraphs: [
      "Products we distribute carry the manufacturer's warranty. Cover, duration and claim process vary by brand and product category.",
      "Warranty does not cover normal wear, damage caused by misuse or accident, or products purchased outside the ARP network. Bring the item and your proof of purchase to any ARP branch and we will manage the manufacturer claim on your behalf.",
    ],
  },
  {
    id: "partners",
    heading: "Wholesale and partner accounts",
    paragraphs: [
      "Applications to become an ARP retail partner or authorized reseller are assessed on business registration, trade licence and commercial fit. Approval is at ARP's discretion.",
      "Approved partners must sell products in the condition supplied, must not misrepresent their relationship with ARP or any brand we distribute, and must comply with any brand presentation requirements we notify.",
      "We may list approved partners publicly on this website. We may remove a listing where an account is closed or where these terms are breached.",
    ],
  },
  {
    id: "ip",
    heading: "Intellectual property and brand rights",
    paragraphs: [
      "All site content, layout and design are owned by or licensed to ARP. Brand names, logos and product marks shown on this site are the property of their respective owners and appear here to identify the products we distribute.",
      "Nothing on this site grants any licence to use a third-party brand or mark. Distribution rights described on this site apply to the United Arab Emirates only.",
    ],
  },
  {
    id: "liability",
    heading: "Liability",
    paragraphs: [
      "We take reasonable care to keep site information accurate but do not warrant that it is complete, current or error-free.",
      "To the extent permitted by law, ARP is not liable for indirect or consequential loss, loss of profit, or loss of business arising from use of this site. Our total liability in connection with any order is limited to the amount paid for the goods concerned.",
      "Nothing in these terms excludes liability for death or personal injury caused by negligence, or for fraud.",
    ],
  },
  {
    id: "privacy",
    heading: "Privacy and data",
    paragraphs: [
      "Information you submit through forms on this site is used to respond to your enquiry and to manage your account. Our Privacy Policy explains what we collect, how long we keep it and who we share it with.",
    ],
  },
  {
    id: "law",
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the United Arab Emirates. Any dispute is subject to the exclusive jurisdiction of the courts of Dubai.",
      "We may update these terms from time to time. The version published on this page applies from the date shown above.",
    ],
  },
];
