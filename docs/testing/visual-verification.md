# Visual and behavior verification

Run from the repository root:

```sh
npm test
npm run build
npm run test:e2e
npx playwright show-report playwright-report
```

If Chromium is missing, install it with `npx playwright install chromium`.
`npm test` runs Vitest/jsdom. `npm run test:e2e` builds the candidate and starts a
fresh production preview at `http://127.0.0.1:4173/portfolio-in-react/`.
The testimonial preview tests also manage development servers on 4181 and 4182.
All three ports must be free; the suite stops its owned servers when finished.
It does not reuse an existing production preview or deploy anything.

## Existing automated coverage

| Source | Checks |
| --- | --- |
| `src/App.test.jsx` | Page composition/IDs, anchors, mobile-menu state, seven-card carousel, contact URL payloads, images and retained project detail |
| `src/components/SituationsCarousel.test.jsx` | Empty/static/two-record/shrinking datasets and key/selection behavior |
| `src/components/Testimonials.test.jsx` | Approval matrix, explicit development opt-in, independent groups and reusable presentation |
| `src/LandingStyles.test.jsx` | Local CSS imports parse and mockup artwork exists; not a visual snapshot suite |
| `tests/e2e/portfolio.spec.js` | Production render/capture at desktop 1440×1000, tablet 768×1024 and mobile 375×812; fonts/images, sections, grid, overflow and runtime errors |
| `tests/e2e/navigation.spec.js` | Header fragments below the sticky header, process CTA, mobile menu, keyboard activation and carousel movement |
| `tests/e2e/testimonials.spec.js` | Production approval decisions, absent section/no empty gap, approved design and single-card layout; captures publication DOM |
| `tests/e2e/testimonials-preview.spec.js` | Development opt-in off/on at 1440px and 375px; captures visible preview cards |

The default Playwright viewport is 1440×900. Render tests explicitly override it
with the dimensions above. Device scale factor is 1. Render tests wait for fonts
and image decoding, return to the top, disable screenshot animations and save
`landing-desktop.png`, `landing-tablet.png` and `landing-mobile.png` beneath the
runner-managed test folders. Full-page PNG height exceeds viewport height.

Current render tests do not generate the old per-capture JSON metadata described
in earlier documentation. The navigation tests use current German link labels;
`Kontakt` targets `#contact`, and consultation CTAs use email inquiries.
There are no maintained `src/__snapshots__` or approved Playwright image baselines.

## Scope limits

Passing the suite is not a full accessibility audit, performance audit, or proof
of production hosting behavior. Tab order/focus management, assistive technology,
image layout shifts and actual-host direct-load/refresh/404 behavior still require
appropriate release checks. The Vite preview may serve the application for paths
that GitHub Pages would reject. These limitations are recorded in PFE-19/PFE-20.

Render captures are not ongoing automatic visual-diff assertions. For a
behavior-preserving refactor, compare the candidate with a specified baseline
revision using the same dependency lockfile, browser, environment and dimensions.
Compare full-page rendered markup and PNG bytes (or a documented pixel comparison).
A test command that only saves screenshots has not established visual parity.

For an intentional change, describe what changed: moving feedback to a separate
section changes layout, while hiding unapproved feedback intentionally removes
that section. Check unchanged component markup and appropriate approved/hidden
states rather than claiming whole-page identity.

## Evidence retention

| Location | Ownership and lifecycle |
| --- | --- |
| `src/**/*.test.jsx`, `tests/e2e/` | Tracked executable checks |
| `test-results/`, `playwright-report/` | Ignored, disposable run output |
| `visual-checks/` | Ignored manual investigation captures; preserve existing PFE-12/PFE-14 evidence |
| `docs/testing/PFE-19/` | Tracked verification results, baseline revisions, source/image hashes and review decisions |
| Future `tests/e2e/*-snapshots/` | Introduce only with deliberately reviewed visual regression assertions |

Temporary directories and generated output can disappear. Before committing a
refactor, preserve the verification report in the repository or an approved
project record. Record baseline/candidate identity, exact commands/results,
viewport/browser assumptions, what was compared and remaining limitations.
When raw images are not archived, state that and retain comparison results and
digests. Do not present a new recreation as an original historical capture.

Tests never write into `visual-checks/` or silently update approved references.
Do not update screenshot expectations merely to silence a regression.
