import { test, expect } from "@playwright/test";

test("header anchors bring each section into view", async ({ page }, testInfo) => {
  await page.goto("./");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
  });

  const header = page.getByRole("banner");
  // Check Home last so returning to the top is exercised too.
  for (const name of ["Projects", "My Values", "Blog", "Contact", "Home"]) {
    await test.step(`Navigate to ${name}`, async () => {
      const id = name === "My Values" ? "values" : name.toLowerCase();
      const section = page.getByRole("region", { name, exact: true });
      await header.getByRole("link", { name, exact: true }).click();

      await expect(page).toHaveURL(new URL(`#${id}`, page.url()).href);
      await expect(section).toBeInViewport();
      await expect.poll(async () => {
        const target = await section.boundingBox();
        const banner = await header.boundingBox();
        return target !== null && banner !== null
          && target.y >= banner.y + banner.height - 1
          && target.y < page.viewportSize().height;
      }, { message: `${name} must start in view below the sticky header` }).toBe(true);

      await testInfo.attach(`${id}-navigation`, {
        body: await page.screenshot(),
        contentType: "image/png",
      });
      if (id === "values") {
        await section.getByRole("link", { name: "Read More" }).click();
        await expect(page).toHaveURL(new URL("#blog", page.url()).href);
        await expect(page.getByRole("region", { name: "Blog", exact: true })
          .getByRole("heading", { name: "Blog", exact: true })).toBeInViewport();
      }
    });
  }
});
