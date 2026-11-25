# PFE-19 architecture review and disposition

Review updated 2026-11-25. This record supersedes the initial static observations
from 2026-11-09. Code was inspected on `PFE-19`; the reviewed implementation ends
with the carousel input-contract fix `ceb180b`. The subsequent documentation
commit does not change application behavior. The integration SHA and post-merge
verification are recorded in [Jira PFE-19](https://greenpawprint.atlassian.net/browse/PFE-19)
and the [Confluence review](https://greenpawprint.atlassian.net/wiki/spaces/PTF/pages/177078273).
This is an integration review, not public-deployment approval.

## Inventory and component ownership

Entry: `index.html` → `src/index.jsx` → `App.jsx`. React 17 mounts the application;
Vite builds a static artifact under `/portfolio-in-react/`. There is no router,
backend request layer, Context provider, global store or production effect hook.
Runtime dependencies are React, React DOM and react-icons. No new dependency was
introduced by PFE-19. Build/test/deployment tools remain development dependencies.

```text
App (page composition, main landmark, skip link, persistent header/footer)
├── Menu (mobile navigation state)
├── Home (hero, CTA, value indicators)
├── Projects (situations introduction)
│   └── SituationsCarousel (selection, three-card window, controls, announcement)
├── Values (outcomes and support composition)
│   └── Approach (explanation, pillars and image)
├── Benefits (service advantages)
├── About (biography and credentials summary)
├── Story (temporary fragment wrapper; produces no extra DOM element)
│   ├── Expertise (professional credibility and qualifications)
│   └── Process (collaboration steps)
├── Testimonials (conditional section and publication decision)
│   └── Testimonial (reusable quote-card presentation)
├── Consultation (preliminary packages and included/excluded services)
├── Contact (email CTA)
└── Footer (navigation, social/email links, current legal-link placeholders)
```

The current target is this explicit structure, not an additional page/framework
layer. Preserve Story until the agreed PFE-18 composition decision. Keep cards and
paragraphs together where they share one responsibility. Outcomes and support
remain together within Values; no additional extraction is required to close this
audit. Independent components can be changed without importing their unrelated
siblings' data or lifting local state.

| Owner | Inputs/data | State and consumers |
| --- | --- | --- |
| App / Story | Static section composition | None; preserve section IDs/order |
| Menu | Local navigation list | `open`; consumed only by menu button/nav and reset on selection |
| SituationsCarousel | Default seven records or `items` array | Selected index; active index derived/clamped; arrows, dots and announcement share it |
| Values / Approach | Local strengths/support/pillars and existing icons/image | None; Approach takes no props |
| Process | Private `steps` array and step icons | None; data stays with the process section |
| Consultation | Private package definitions and inclusion list | None; CTA builds an encoded email body |
| Testimonials | Quote/interview defaults or explicit props; build-time env flags | No state; computes each group's eligibility independently |
| Testimonial | `testimonial` prop | No state or publication decision; returns nothing without data |
| Other sections | Static copy, icons, assets and shared helpers | Stateless presentation |

### Why the important snippets work

- A React function returning JSX does not itself add an HTML wrapper. Moving
  Benefits, Process, Expertise or Approach into a component can preserve the DOM
  when the same subtree remains in the same position. Before/after checks verify
  this rather than assuming it from the file move.
- Story returns a fragment around Expertise and Process. This is temporary page
  composition, not shared state or a new semantic HTML section.
- Carousel modulo arithmetic wraps selection. PFE-19 now guards the empty case
  before indexing, renders short datasets once each, and clamps the active index
  when items shrink. No effect or duplicated state is needed. Titles must be
  unique/stable; malformed/non-array input is outside this internal API contract.
- The carousel's event handler and Menu's click handlers update their own local
  state. A common page ancestor does not create a synchronization requirement.
- Feedback data → publication rule → Testimonials → Testimonial is a one-way
  dependency. Presentation never owns approval. Production requires boolean true;
  development requires explicit opt-in to preview unapproved mock content.
- Vite env flags are build/development inputs, not authentication or network-access
  controls. Hidden imported text can remain in a client bundle. Real unpublished
  customer statements do not belong in this module.
- Icon components are passed as component references and rendered by Icon. Static
  tuple arrays in Process/Values are local presentation data; a global data/service
  layer would add coordination that these sections do not need.

## CSS, assets, routing and testing inventory

`styles/main.css` imports reset, global defaults, header, hero, portfolio, footer
and testimonial layers. `_portfolio.css` still holds most section/responsive rules.
For example, `.trust-cards` is defined at `_portfolio.css:411`, overridden at
`:1249`, then constrained for separated feedback/credentials in `_testimonials.css`.
The result is verified, but its change impact is harder to predict; PFE-21 owns
migration. The dormant About/Story/Values/Consultation/section-content files are
not imported and must not be mistaken for the current source of those styles.

Images and licensed Inter fonts are local public assets. Art is lazy-loaded;
its width/height are not reserved in the shared helper. Actual layout-shift and
asset-weight measurements remain release checks, not confirmed regressions from
this inspection. Public legacy assets remain in the deployable artifact, though
browsers only request referenced resources.

Fragment navigation targets physical-root sections. Current `#projects` is the
situations section; old `#scroll` is retired. Nested application routes are not
implemented. Vite preview fallback is not evidence of the real host's direct-load,
refresh or 404 behavior. Hosting/base changes and public smoke checks are PFE-20.

Vitest covers composition, local interactions, the carousel contract and publication
rules. Playwright covers production rendering at three widths, sticky-header/CTA
navigation, mobile-menu and keyboard activation, carousel movement and development
preview off/on. See [visual verification](../visual-verification.md) for exact
coverage and limitations. These are not a full accessibility/performance audit or
an ongoing approved-image-baseline suite.

## Prioritized findings and decisions

Severity describes impact in context, not automatic urgency for a private rebuild.
Source references are relative to the repository at the reviewed implementation.

| ID | Type / severity | Evidence and impact | Disposition / owner |
| --- | --- | --- | --- |
| F-01 | Maintainability / medium | About previously exported Benefits; Story mixed credibility and process. Unrelated reasons to change shared files. | Resolved by focused Benefits/Process/Expertise/Approach extractions; ownership mapped above. |
| F-02 | Naming / low | `Projects.jsx:51` now renders situations; `Story.jsx:3` is only composition. `#projects` remains a navigation target. | Accept legacy names/ID for compatibility. Keep temporary Story by agreement; future content/composition decision PFE-18. No gratuitous renames. |
| F-03 | Architecture risk / medium | `_portfolio.css:411,1249` and `_testimonials.css` show repeated definitions/cascade coupling and multiple responsive overrides. | Defer token/style strategy and migration to PFE-21. Preserve native CSS; file length alone does not justify a framework. |
| F-04 | Maintainability / low | `LandingUI.jsx:1–67` mixes generic Button/Icon/Heading with page-specific Note, image naming and contact destination. | Inventory complete; deeper extraction belongs to PFE-22. No new abstraction in PFE-19. |
| F-05 | Publication / high for public release | `data/testimonials.js` contains mock quote/interview data. UI hiding alone does not remove bundled content or establish authenticity. | Rendering control/tests implemented in PFE-19. Authentic provenance/permission and release review remain PFE-20. |
| F-06 | Release gate / high for public release | `Footer.jsx:34–38`: legal-label links open email, not legal documents. Contact is mailto, not a working inquiry form. | Explicitly accepted for prototype; PFE-20 owns legal/hosting release gate and PFE-16 owns form delivery. |
| F-07 | Requirements / medium | `Consultation.jsx` has preliminary offerings with no approved prices; package scope/claims need business decisions. | REQ-5 owns business analysis; PFE-18 owns approved content. Do not publish illustrative planning prices here. |
| F-08 | Verification / medium | Original Benefits report was temporary; old README and visual-check instructions described retired behavior. | Resolved by corrected docs and newly recreated historical-commit Benefits comparison. Distinguish recreation from original evidence. |
| F-09 | Confirmed edge-case bug / medium | `Projects.jsx:51–79`: before the fix, empty/single arrays could index undefined and two entries repeated keys. The seven-entry production dataset worked. | Fixed in `ceb180b`: explicit 0/1/2/3+ contract, clamped selection, compact grids and four focused tests. Default UI remains identical. |
| F-10 | Retention / low | ProjectsInfo, Soon, three legacy JSON files and dormant style files have no current page role. ProjectsInfo retains a test. | Intentionally retain per earlier decision; document, do not infer permission to delete. CSS retention review PFE-21; other removal requires a scoped decision. |
| F-11 | Performance risk / unmeasured | `LandingUI.jsx:60–66`: lazy images omit intrinsic dimensions; public artifact includes legacy images/fonts. | Record for PFE-20 measurement. No layout-shift claim or speculative image changes in PFE-19. |
| F-12 | Verification limits / accepted | No full tab-order/screen-reader/performance audit or actual-host deployment test; image comparisons are point-in-time. | State limits explicitly. PFE-20 release checks; future baseline automation only when deliberately scoped. |

No unsafe HTML injection, production fetch lifecycle, global state dependency or
new library was found in the inspected application code. This statement is a
source-review observation, not a security certification or dependency-advisory scan.

## Implemented decisions and evidence

| Commit | Work unit | Evidence |
| --- | --- | --- |
| `c3f965b` | Benefits extracted unchanged | [Benefits recreation](benefits-extraction-verification.json) |
| `3b0b8c2` | Process and private steps extracted | [Process report](process-extraction-verification.json) |
| `54741a2` | Expertise extracted; Story temporary wrapper | [Expertise report](expertise-extraction-verification.json) |
| `b6b73b6` | Separate feedback section and reusable quote card | [Publication report: architecture stage](testimonial-publication-verification.json) |
| `c1deb7a` | Independent approval, explicit dev preview, production restriction | [Publication report](testimonial-publication-verification.json), [release checklist](testimonial-publication.md) |
| `17747e7` | Stateless Approach extracted from Values | [Approach report](approach-extraction-verification.json) |
| `ceb180b` | Safe carousel input contract | [Final source/visual comparison](closeout-verification.json) |

The extraction reports preserve declared comparison results/digests; they do not
archive all raw captures. Benefits evidence is a **new run against historical
before/after commits**, not a recovered or invented original test run. Both old
revisions pass 9 unit tests and three capture tests; their markup and PNG bytes
match at all three widths. The final feature candidate passes 36 unit tests and
12 browser tests/build; current default markup and PNG bytes match `17747e7`.

## Incremental migration / closeout decision

1. Keep approved section responsibilities and local state ownership as implemented.
2. Keep the explicitly documented legacy names, compatibility IDs and dormant files.
3. Hand CSS migration to PFE-21, LandingUI to PFE-22, content/composition to PFE-18,
   public launch to PFE-20, and the functional form to PFE-16. These are accepted
   follow-ups, not prerequisites for closing the scoped PFE-19 audit.
4. Commit the corrected docs/recreated evidence, review the complete feature diff,
   and merge only into `website-rebuild` with an explicit merge commit.
5. Verify the integration tree, rerun tests/build/browser checks, push only the task
   and integration branches, and record actual merge/test results in Jira/Confluence.
   `dev` and `main` remain unchanged. No public deployment is authorized by this work.

The accepted [component/state ownership ADR](https://greenpawprint.atlassian.net/wiki/spaces/PTF/pages/178225153)
remains the governing principle. The Confluence review carries the final integration
outcome; this repository report records the reviewed implementation and disposition.
