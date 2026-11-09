import { test, expect } from "@playwright/test";
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["tablet", 768, 1024],
  ["mobile", 375, 812],
]) {
  test(`mockup renders without overflow at ${name} size`, async ({
    page,
  }, testInfo) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height });
    expect((await page.goto("./")).ok()).toBe(true);
    for (const image of await page.locator('img[loading="lazy"]').all())
      await image.scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, (img) => img.decode()));
    });
    expect(errors).toEqual([]);
    expect(
      await page.evaluate(() => document.fonts.check("800 48px Inter")),
    ).toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    expect(await page.locator("h1").count()).toBe(1);
    for (const id of [
      "home",
      "projects",
      "values",
      "benefits",
      "about",
      "expertise",
      "process",
      "consultation",
      "contact",
    ])
      await expect(page.locator(`section#${id}`)).toBeVisible();
    expect(await page.locator(".plan-card").count()).toBe(3);
    const images = await page.locator("img").evaluateAll((imgs) =>
      imgs.map((img) => ({
        loaded: img.complete && img.naturalWidth > 0,
        alt: img.alt,
      })),
    );
    for (const image of images) {
      expect(image.loaded).toBe(true);
      expect(image.alt).toBeTruthy();
    }
    const hero = await page.locator("#home .container").boundingBox();
    expect(hero.x).toBeGreaterThanOrEqual(width > 1000 ? 75 : 24);
    const columns = await page
      .locator(".plans-grid")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
    expect(columns).toBe(width > 1000 ? 3 : 1);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: testInfo.outputPath(`landing-${name}.png`),
      fullPage: true,
      animations: "disabled",
    });
    await testInfo.attach(`${name} screenshot`, {
      path: testInfo.outputPath(`landing-${name}.png`),
      contentType: "image/png",
    });
  });
}
