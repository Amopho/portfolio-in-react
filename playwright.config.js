import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.js",
  outputDir: "./test-results",
  reporter: [["list"], ["html", { outputFolder: "./playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173/portfolio-in-react/",
    browserName: "chromium",
    headless: true,
    deviceScaleFactor: 1,
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173/portfolio-in-react/",
    // Always build this revision; reusing a preview previously hid stale output.
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
