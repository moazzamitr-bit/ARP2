# ARP Website Design Audit

Source of truth: `ARP group - Website proposal - 8july2026.pdf` (slides extracted to `/design-references/proposal-slides/`).

## Structure (slides 1–13)

- Slide 09 defines sitemap: Home, About ARP, Brands (+ brand template), Wholesale & Distribution, Where to Buy, Stores, News & Partnerships, Contact.
- UI chrome on design samples (14–23) uses header nav: Brands · Sports · Solutions · About Us · News · Contact + Partner With Us.

## Designed surfaces (slides 14–23)

| Slide | Surface | Route / system |
| --- | --- | --- |
| 14 | Homepage hero + metrics + partners | `/` |
| 15 | Consumer brand page | `/brands/[slug]` |
| 16 | Product PDP (sample purchase UI) | `/brands/[slug]/products/[product]` |
| 17 | All Brands listing | `/brands` |
| 18 | Global brand partner modules | `/brands/[slug]` (lower modules) |
| 19 | Partner & Reseller application | `/wholesale` |
| 20 | Locations finder | `/contact#where-to-buy` |
| 21 | Footer system | sitewide footer |
| 22 | Authorized Resellers & Branches | `/contact#where-to-buy` |
| 23 | About Us | `/about` |

## Creative-fill pages (on-brand, not fully framed in PDF)

- `/sports` — sports category discovery mapped from sitemap brand categories
- `/solutions` — Wholesale / Retailer / Institutional pathways from slide 09

## Tokens

- Primary blue `#0B3D91`, dark `#082E6B`, green `#2EAD4B`
- Surfaces `#F6F8FB` / `#EEF3F8`, muted `#667085`, border `#E1E7EF`
- Container ~1320px, soft panels, 10–16px radius, restrained shadows

## Remaining asset gaps

- Official product photography for PDP gallery (currently using existing site imagery as placeholders)
- Final partner logo files (text-mark fallbacks in use)
- Final branch/reseller contact data and approved news copy
- Checkout is intentionally not wired; Add to Cart / Buy Now continue via inquiry
