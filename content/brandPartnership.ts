export type BrandFact = { label: string; value: string };

export type BrandPartnership = {
  /** Short statement under the brand logo, e.g. "Official UAE Distribution Partner". */
  titleLead: string;
  titleAccent: string;
  body: string;
  about: string;
  facts: BrandFact[];
  /** What the ARP partnership covers — rendered as a green checklist. */
  points: string[];
  territory: { scope: string; region: string; coverage: string };
};

/**
 * Partnership page content (proposal slide 18).
 *
 * Yonex figures are taken from the proposal itself. Where ARP has not supplied
 * corporate facts for a brand we keep the repo's "client-supplied" placeholder
 * convention rather than inventing numbers for a live client site.
 */
const sharedPoints = [
  "Official distribution partner in the UAE",
  "Authorised supply to retail, clubs, and institutions",
  "Local marketing and brand support",
  "After-sales service and warranty support",
  "Training and events collaboration",
];

const defaultTerritory = {
  scope: "Exclusive Distribution",
  region: "United Arab Emirates",
  coverage: "Nationwide",
};

export const brandPartnerships: Record<string, BrandPartnership> = {
  yonex: {
    titleLead: "Official UAE",
    titleAccent: "Distribution Partner",
    body: "ARP is the official distribution partner for Yonex in the UAE. Delivering world-class badminton performance to players, clubs, and retailers across the region.",
    about:
      "Founded in 1946 in Japan, Yonex is a global leader in badminton and racket sports equipment. Driven by innovation and craftsmanship, Yonex products are used by champions and athletes in over 120 countries.",
    facts: [
      { label: "Founded", value: "1946" },
      { label: "Headquarters", value: "Tokyo, Japan" },
      { label: "Presence", value: "120+ Countries" },
      { label: "Employees", value: "10,000+" },
    ],
    points: sharedPoints,
    territory: defaultTerritory,
  },
  stiga: {
    titleLead: "Official UAE",
    titleAccent: "Distribution Partner",
    body: "ARP supplies STIGA table tennis equipment across the UAE — competition tables, bats and tournament balls for clubs, schools and players.",
    about:
      "STIGA is a Swedish table tennis brand supplying competition tables, blades, rubbers and balls to clubs and federations worldwide. ARP represents STIGA across UAE retail and institutional channels.",
    facts: [
      { label: "Founded", value: "1944" },
      { label: "Headquarters", value: "Eskilstuna, Sweden" },
      { label: "Category", value: "Table Tennis" },
      { label: "Presence", value: "Client-supplied" },
    ],
    points: sharedPoints,
    territory: defaultTerritory,
  },
  cosco: {
    titleLead: "Official UAE",
    titleAccent: "Distribution Partner",
    body: "ARP distributes the Cosco sports equipment range in the UAE — from team sport balls and training aids to fitness and court equipment.",
    about:
      "Cosco manufactures a broad range of sports goods spanning team sports, fitness and training equipment. ARP holds the UAE distribution relationship and supplies the range through retail, club and institutional channels.",
    facts: [
      { label: "Headquarters", value: "India" },
      { label: "Category", value: "Sports Equipment" },
      { label: "Founded", value: "Client-supplied" },
      { label: "Presence", value: "Client-supplied" },
    ],
    points: sharedPoints,
    territory: defaultTerritory,
  },
  "lp-support": {
    titleLead: "Official UAE",
    titleAccent: "Distribution Partner",
    body: "ARP supplies LP Support braces and recovery products across the UAE for training, rehabilitation and everyday performance.",
    about:
      "LP Support produces sports braces, supports and recovery products used in training and rehabilitation. ARP distributes the range to UAE retailers, clubs and clinics.",
    facts: [
      { label: "Category", value: "Supports & Recovery" },
      { label: "Headquarters", value: "Taiwan" },
      { label: "Founded", value: "Client-supplied" },
      { label: "Presence", value: "Client-supplied" },
    ],
    points: sharedPoints,
    territory: defaultTerritory,
  },
};

/** Assurance tiles shown under the hero — identical across brands. */
export const partnershipAssurances = [
  { title: "Official Partner", body: "Authorized distribution in the UAE" },
  { title: "Global Quality", body: "Trusted by champions worldwide" },
  { title: "Performance Driven", body: "Innovation for every level of play" },
  { title: "Strong Partnership", body: "Growing the sport together" },
];

export function getBrandPartnership(slug: string) {
  return brandPartnerships[slug];
}
