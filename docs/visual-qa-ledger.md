# Visual QA Ledger

## QA Method

- Reference images inspected with the local image viewer from `/design-references/`.
- Initial browser verification used the Codex in-app browser. The in-app capture path became unstable after the first batch, so final screenshots were captured with local Chrome through `playwright-core`.
- Final screenshots are stored in `/docs/screenshots/`.

## Mismatch Ledger

| Area | Reference evidence | Render issue found | Fix made |
| --- | --- | --- | --- |
| Typography | All references use a geometric sans, not serif. | Browser computed `Times` because the Next font CSS variable declaration was invalid in the test environment. | Replaced the page font stack with explicit geometric sans fallbacks: Avenir Next, Avenir, Helvetica Neue, Arial. |
| Hero height | About, reseller and locator samples show meaningful modules within the first viewport. | Internal page heroes were too tall; Wholesale form and Contact locator appeared too low. | Reduced global hero min-height and padding; made Contact hero shorter; moved Wholesale form into the first viewport. |
| Wholesale form | Partner reference shows form, benefits and submit button visible together. | Submit button fell below the fold and the form felt too spacious. | Built `wholesale-first` layout with handshake image, left benefits, right form; compacted first-form field spacing and input height. |
| Contact locator | Authorized reseller reference prioritizes tabs, filters, list/map and trust. | Contact form appeared before locator, making the page feel less like the reference. | Reordered Contact page so Where to Buy appears before the contact form; tightened finder section spacing. |
| Mobile nav | Mobile must use accessible drawer with no leaked hidden content. | Hidden drawer text leaked into the mobile home screenshot. | Added closed-state `max-height` and `visibility` controls; verified drawer open interaction. |
| Palette | References are white, ARP blue and green with pale blue surfaces. | Initial structure matched palette, but typography made it feel less premium. | Kept approved tokens and corrected font, button, panel and section rhythm. |
| Cards and density | References use restrained panels, not generic dense grids. | Home/Wholesale risked crowding with overlapping brand rail and metrics. | Increased metric spacing and kept overview modules sparse. |

## Interaction Checks

- Mobile menu opens.
- Brand category filter works.
- Contact location brand filter works.
- Reseller form validation state appears.
- Reseller form success state appears after a valid local submission.

## Remaining Intentional Content Placeholders

- Official ARP logo files.
- Official partner brand logo assets.
- Final catalogues.
- Final legal copy.
- Final branch/reseller addresses, phone numbers and hours.
- Final ARP-approved news and company profile copy.
