import { test, expect } from "@playwright/test";
test("desktop navigation lands below the sticky header and all CTA targets work", async ({
  page,
}) => {
  await page.goto("./");
  const header = page.getByRole("banner");
  for (const [name, id] of [
    ["Projekte", "projects"],
    ["Meine Werte", "values"],
    ["Beratung", "consultation"],
    ["Über mich", "about"],
    ["Kontakt", "contact"],
    ["Start", "home"],
  ]) {
    await header.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await expect
      .poll(async () => {
        const target = await page.locator(`#${id}`).boundingBox();
        const banner = await header.boundingBox();
        return target.y >= banner.height - 2 && target.y < 900;
      })
      .toBe(true);
  }
  await page.getByRole("link", { name: "So arbeite ich", exact: true }).click();
  await expect(page).toHaveURL(/#process$/);
  await expect(page.locator("#process")).toBeInViewport();
  await expect(page.locator("#contact .button")).toHaveAttribute(
    "href",
    /^mailto:/,
  );
});
test("mobile menu opens and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./");
  const nav = page.getByRole("navigation", { name: "Hauptnavigation" });
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "Beratung", exact: true }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#consultation$/);
});
