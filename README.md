# Portfolio React landing page

A single-page React 17 and Vite website. The current redesign is developed on
`website-rebuild` and its task branches, independently of `dev` and `main`.
Pushing a feature or integration branch does not deploy the website.

## Run locally

Use a Node version matching `package.json` (`^20.19.0` or `>=22.12.0`).

```sh
npm ci
npm run dev
```

Open `http://localhost:5173/portfolio-in-react/`. `npm start` uses the same Vite
server. `npm run build` writes `dist/`; `npm run preview` serves that production
build. Source entry points are `index.html` and `src/index.jsx`.

## Page structure and ownership

`App.jsx` owns the persistent header/footer and section composition. The current
DOM order is:

```text
App
├── Menu                         local mobile-menu state
├── main#main
│   ├── #home                    Home: hero and value indicators
│   ├── #situations              Situations: situations introduction/carousel
│   ├── #values                  Values: outcomes, support and Approach
│   ├── #benefits                Benefits: service advantages
│   ├── #about                   About: biography and credentials summary
│   ├── Story                    temporary composition wrapper (no DOM node)
│   │   ├── #expertise           Expertise: professional credibility
│   │   └── #process             Process: collaboration steps
│   ├── #testimonials            Testimonials: conditional approved feedback
│   ├── #consultation           Consultation: preliminary packages/inclusions
│   └── #contact                Contact: email inquiry CTA
└── Footer
```

`Story` remains the agreed temporary wrapper. PFE-18 owns future content and
section-composition planning; PFE-19 does not introduce `HomePage.jsx`.
`Values` composes outcomes, support and the independent stateless `Approach`.
These boundaries follow responsibilities, rather than file length.

The seven-card “Kennst du das?” section uses `Situations.jsx` and `#situations`.
Navigation links target that ID. The former `#projects` fragment has been replaced;
external bookmarks must use `#situations`. `#scroll` is retired. There is no
client-side router, network data fetching, global state store, checkout or booking
integration.

## Data, state and publication

- `Menu` owns its open/closed state and closes after a navigation selection.
- `SituationsCarousel` owns selection; no page-level state is needed.
- `Process` owns its private static `steps` data. Package and outcomes data are
  local to the components that render them.
- `data/testimonials.js` contains harmless mock feedback and independent approval
  flags. `lib/testimonialPublication.js` owns rendering eligibility.
- `Testimonial` is a presentational quote card. `Testimonials` applies publication
  policy and returns no section when neither feedback group is eligible.

Unapproved feedback is hidden by default. To deliberately preview it in a local
development server, add this to the ignored `.env.local` and restart Vite:

```env
VITE_PREVIEW_UNAPPROVED_TESTIMONIAL=true
```

Production requires boolean `approved: true` regardless of that flag. Rendering
control does not remove imported text from client bundles; do not add confidential
unpublished customer statements. See the [publication checklist](docs/testing/PFE-19/testimonial-publication.md).

### Carousel input contract

`SituationsCarousel` accepts an array of records with a renderable `icon`, a
unique stable `title`, and `text`. Omitted `items` uses the existing seven records.

- Empty array: render nothing.
- One record: one selected static card, without arrows or dots.
- Two records: render each once; selection loops through the two records.
- Three or more: retain the looping three-card desktop window and selected
  mobile card, arrows, dots and keyboard controls.
- When the array shrinks, rendered selection remains within bounds.

Malformed records and non-array values are outside this internal component's
contract; no schema/dependency layer is introduced.

## Styles and assets

`src/styles/main.css` imports native CSS only:

| File | Current owner |
| --- | --- |
| `base/_reset.css` | Element reset |
| `base/_globals.css` | Local Inter fonts, palette, shared typography/UI defaults |
| `layout/_header.css` | Header and mobile navigation |
| `layout/_home.css` | Hero |
| `layout/_portfolio.css` | Remaining sections, responsive rules and cascade overrides |
| `layout/_footer.css` | Footer |
| `layout/_testimonials.css` | Reusable quote-card appearance and separated feedback/credentials grids |

The older `_about.css`, `_story.css`, `_values.css`, `_consultation.css` and
`components/_section-content.css` are retained but are not imported. Their
retention/removal and CSS migration are recorded for PFE-21; do not re-enable
these dormant files without checking the cascade.

Fonts and images are served locally from `public/fonts/` and `public/img/`.
Preserve the Inter license. Files under `public/` are copied to the production
artifact. Asset URLs use the Vite base path; there is no Google Fonts dependency.

## Verification

```sh
npm test
npm run build
npm run test:e2e
```

Install Chromium with `npx playwright install chromium` if it is missing.
Vitest runs `src/**/*.test.jsx`; Playwright runs `tests/e2e/**/*.spec.js`.
The latter builds the website and manages production port 4173 plus development
preview ports 4181 and 4182. Keep those ports free.

The existing render tests capture 1440×1000, 768×1024 and 375×812 full-page images
at device scale factor 1. They verify rendering, fonts, images and overflow.
Other tests cover navigation, sticky-header positioning, mobile menu, carousel
selection, publication policy and explicit preview opt-in.

See [visual verification](docs/testing/visual-verification.md) for exact coverage,
limitations and evidence retention. `test-results/`, `playwright-report/`,
`visual-checks/`, `dist/` and `build/` are ignored/generated or local evidence.
Durable review results live under `docs/testing/PFE-19/`.

## Routing and release boundaries

Vite's `base` is `/portfolio-in-react/`. On static hosting, fragments such as
`/portfolio-in-react/#values` load the root document; no SPA rewrite is needed for
that URL. Unknown fragments still load the page. Nested application routes are
not implemented; Vite preview's SPA fallback is not proof of a static host's 404
or refresh behavior.

The legacy `ProjectsInfo`, `Soon`, `data.json`, `projects.json` and `story.json`
remain intentionally retained for possible reuse. They are not part of current
page composition; `ProjectsInfo` has a retained unit test. Deletion requires an
explicit retention decision, not just a reference search.

`npm run deploy` runs the existing `gh-pages -d dist` publishing workflow (with a
predeploy build). It is a publication action, not part of ordinary verification.
Custom-domain hosting, actual-host smoke checks, legal pages, approved claims and
authentic testimonials remain PFE-20 release requirements. The functional inquiry
form is PFE-16; current CTAs open email. Package scope/prices require REQ-5 and
PFE-18 approval.

## Review and follow-ups

[PFE-19 architecture review](docs/testing/PFE-19/architecture-review.md) records
ownership, findings and accepted technical debt. CSS strategy/migration belongs
to PFE-21; deeper `LandingUI` organization belongs to PFE-22. Earlier CRA, router,
Bootstrap and snapshot-era documentation remains available in Git history; it
is not a description of this branch's current setup.
