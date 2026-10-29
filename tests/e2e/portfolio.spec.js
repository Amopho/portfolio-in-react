import { test, expect } from "@playwright/test";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

for (const viewport of viewports) {
  test(`portfolio renders at ${viewport.name} size`, async ({ page, browser }, testInfo) => {
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const response = await page.goto("./");
    expect(response?.ok(), "Production root must load successfully").toBe(true);
    expect(await response.text(), "Preview must serve the current production build")
      .toBe(readFileSync("dist/index.html", "utf8"));

    for (const id of ["home", "projects", "values", "blog", "contact"]) {
      await expect(page.locator(`main section#${id}`)).toBeVisible();
    }

    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, (image) => image.decode()));
      document.activeElement?.blur();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    await page.mouse.move(0, 0);

    const rendered = await page.evaluate(() => ({
      url: location.href,
      userAgent: navigator.userAgent,
      viewport: { width: innerWidth, height: innerHeight,
        clientWidth: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
        devicePixelRatio, scale: visualViewport?.scale },
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      fonts: Array.from(document.fonts, (font) => ({
        family: font.family, weight: font.weight, status: font.status,
      })),
      images: Array.from(document.images, (image) => ({
        src: image.currentSrc, complete: image.complete,
        naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight,
      })),
      columns: Object.fromEntries([".home-images", ".story-container", ".section-container", ".values-layout"]
        .map((selector) => [selector,
          getComputedStyle(document.querySelector(selector)).gridTemplateColumns.split(/\s+/).length])),
    }));

    expect(rendered.viewport.width).toBe(viewport.width);
    expect(rendered.viewport.height).toBe(viewport.height);
    expect(rendered.viewport.devicePixelRatio).toBe(1);
    expect(rendered.viewport.scale).toBe(1);
    expect(rendered.images.length).toBeGreaterThan(0);
    for (const image of rendered.images) {
      expect(image.complete && image.naturalWidth > 0, image.src).toBe(true);
      expect(new URL(image.src).pathname).toMatch(/^\/portfolio-in-react\/img\//);
    }
    const loadedFonts = rendered.fonts.filter((font) => font.status === "loaded")
      .map((font) => font.family.replace(/["']/g, ""));
    for (const family of ["Catamaran", "News Cycle"]) {
      expect(loadedFonts, `Load ${family} before recording a reference`).toContain(family);
    }
    expect(rendered.columns).toEqual({
      ".home-images": viewport.width > 900 ? 2 : 1,
      ".story-container": viewport.width > 900 ? 3 : 1,
      ".section-container": viewport.width > 900 ? 2 : 1,
      ".values-layout": viewport.width > 900 ? 2 : 1,
    });
    expect(runtimeErrors).toEqual([]);

    mkdirSync(testInfo.outputDir, { recursive: true });
    const screenshotPath = testInfo.outputPath(`portfolio-${viewport.name}.png`);
    const screenshot = await page.screenshot({
      path: screenshotPath, fullPage: true, animations: "disabled",
    });
    const buildHashes = Object.fromEntries(readdirSync("dist/assets")
      .filter((file) => /\.(css|js)$/.test(file))
      .map((file) => [file, hash(readFileSync(resolve("dist/assets", file)))]));
    const metadata = {
      capturedAt: new Date().toISOString(), requestedViewport: viewport,
      browser: browser.version(), ...rendered,
      revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      workingTree: execFileSync("git", ["status", "--short"], { encoding: "utf8" }),
      buildHashes, screenshotSha256: hash(screenshot),
      screenshotPixels: { width: screenshot.readUInt32BE(16), height: screenshot.readUInt32BE(20) },
      horizontalOverflow: rendered.scrollWidth > rendered.viewport.clientWidth,
      scope: "Render/capture checks; not a visual-diff or keyboard-navigation assertion",
    };
    const metadataPath = testInfo.outputPath(`portfolio-${viewport.name}.json`);
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + "\n");
    console.log(`Saved ${viewport.name} capture: ${screenshotPath}`);
  });
}
