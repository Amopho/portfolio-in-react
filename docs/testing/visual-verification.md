# Visual verification

| Location | Purpose | Git and lifecycle |
| --- | --- | --- |
| `src/*.test.jsx` and existing snapshots | Vitest component, structure and style checks | Tracked and maintained |
| `tests/e2e/portfolio.spec.js` | Playwright browser checks | Tracked and maintained |
| `tests/e2e/navigation.spec.js` | Header anchor navigation smoke test with screenshots | Tracked and maintained |
| `tests/e2e/*-snapshots/` | Future approved visual references beside their tests, using Playwright's default naming | Tracked once deliberately introduced; none created yet |
| `test-results/` | Screenshots, capture metadata and execution diagnostics | Ignored; disposable and recreated by Playwright |
| `playwright-report/` | Generated HTML execution report | Ignored; disposable |
| `visual-checks/PFE-12/`, `visual-checks/PFE-14/` | Manual investigation evidence and acceptance notes | Ignored; retained locally as needed |
| `playwright.config.js` | Browser, production preview and output configuration | Tracked and maintained |

Run from the repository root:

```sh
npx playwright install chromium
npm test
npm run test:e2e
npx playwright show-report playwright-report
```

Browser tests build the application and start a fresh Vite production preview at
`http://127.0.0.1:4173/portfolio-in-react/`. Port 4173 must be free; stop your own
preview before running the suite. Existing servers are deliberately not reused,
so a stale production build cannot silently become the test target.

The three render/capture tests use 1440×900, 768×1024 and 375×812 viewports. They wait
for fonts and images, check the actual viewport, sections and responsive grid,
and save full-page screenshots and JSON metadata through `testInfo.outputPath()`.
Playwright creates the output directories during execution; no placeholders are
needed. Full-page image dimensions can exceed the viewport when content overflows;
the metadata records this. These checks do not yet compare approved image baselines
or establish keyboard interaction coverage.

The navigation smoke test clicks Projects, Blog, Contact, and then Home in the
header. It checks each fragment URL, section viewport intersection, and that the
section starts in view below the sticky header. Each step attaches a viewport
screenshot to the HTML report for manual visual review; these are not automated
visual comparisons or approved baselines.

Run it with `npx playwright test tests/e2e/navigation.spec.js`, adding `--headed`
to watch the browser. The test uses the application's current CSS and the default
desktop Chromium viewport. It does not check refresh/history restoration, exact
scroll positions, mobile navigation, or keyboard navigation. The temporary
smooth/auto comparison and frame-by-frame diagnostics have been removed.

The HTML report shows execution results. The explicit screenshot and metadata
files are available under each test's directory in `test-results/`.

`test-results/` describes the latest automated execution; `visual-checks/`
explains a particular investigation and why changes were accepted. Automated tests
must never write to `visual-checks/`: another run could overwrite evidence needed
to compare revisions. To retain a run for an investigation, deliberately copy
selected artifacts into its ticket directory and record their source in notes.
Preserve the existing PFE-12 and PFE-14 evidence. Do not generate or update approved
Playwright snapshot baselines as part of directory setup.
