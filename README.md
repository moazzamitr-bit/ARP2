# Al Raed Pioneers Website

Production-ready corporate website for ARP at `arpgroup.ae`.

## Installation

Run `npm install`.

## Development

Run `npm run dev` and open the local URL shown in the terminal.

If the page ever appears unstyled or broken after running a production build, stop the dev server and run `npm run dev:clean`. Do not run `npm run build` while `npm run dev` is still running.

## Build

Run `npm run build`. Use `npm run lint` and `npm run typecheck` before deployment.

## Content Replacement

Editable content is centralized in `/content`. Replace temporary copy only there whenever possible.

## Brand Management

Approved brands live in `/content/brands.ts`. Each brand controls its slug, category, logo text fallback, description, catalogue URL, global website URL and product category labels.

## News Management

Temporary articles live in `/content/news.ts`. Replace with approved ARP news before launch.

## Location Management

Official branches and authorized resellers live in `/content/locations.ts`. Replace placeholder addresses, phone numbers, hours, supported brands and map links with approved data.

## Form Integration

Forms submit to `/app/api/forms/contact/route.ts` and `/app/api/forms/reseller/route.ts`. The current development fallback validates input, ignores honeypot spam and logs submissions server-side. Replace the `console.info` handoff with the final email, CRM or database adapter. Do not expose API keys in client code.

## Deployment

Build with `npm run build`, then deploy to the selected Next.js hosting environment. Configure final domain, environment variables and email service credentials in the hosting platform.

## Required Client Assets

Replace generated placeholder imagery with final ARP-approved photography, official ARP logo files, official partner logos, approved catalogues and final legal copy.

## Excluded Functionality

This website intentionally excludes e-commerce, cart, checkout, payments, accounts, pricing, SKU management, inventory, online ordering, CRM/ERP integration and product detail pages.
