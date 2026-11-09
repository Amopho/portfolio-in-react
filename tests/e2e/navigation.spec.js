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
test("mobile menu, keyboard navigation and situation selection work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./");
  const nav = page.getByRole("navigation", { name: "Hauptnavigation" });
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await expect(nav).toBeVisible();
  await nav.getByRole("link", { name: "Beratung", exact: true }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#consultation$/);
  await page.locator("#projects").scrollIntoViewIfNeeded();
  const next = page.getByRole("button", { name: "Nächste Situation" });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".situation-card.selected")).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(page.locator(".situation-card.selected h3")).toHaveText(
    "Du willst die Gesundheit deines Hundes",
  );
  await expect(page.locator(".situation-card:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "Situation 1", exact: true }).click();
  await expect(page.locator(".situation-card.selected")).toHaveAttribute(
    "aria-current",
    "true",
  );
});

test("desktop carousel moves the cards and keeps the selected card centered", async ({
  page,
}) => {
  await page.goto("./");
  const headings = page.locator(".situation-card h3");
  await expect(headings).toHaveText([
    "Du fühlst dich überfordert",
    "Du möchtest sicher sein,",
    "Du willst die Gesundheit deines Hundes",
  ]);
  await page.getByRole("button", { name: "Nächste Situation" }).click();
  await expect(headings).toHaveText([
    "Du möchtest sicher sein,",
    "Du willst die Gesundheit deines Hundes",
    "Du planst eine Futterumstellung",
  ]);
  await expect(page.locator(".situation-card").nth(1)).toHaveAttribute(
    "aria-current",
    "true",
  );
  await page
    .getByRole("button", { name: "Nächste Situation" })
    .press("ArrowLeft");
  await expect(headings).toHaveText([
    "Du fühlst dich überfordert",
    "Du möchtest sicher sein,",
    "Du willst die Gesundheit deines Hundes",
  ]);
});

test("all seven screenshot cards are reachable through the carousel arrows", async ({
  page,
}) => {
  await page.goto("./");
  const expected = [
    "Du möchtest sicher sein,",
    "Du willst die Gesundheit deines Hundes",
    "Du planst eine Futterumstellung",
    "Dein Hund hat Übergewicht",
    "Dein Hund frisst schlecht oder ist sehr wählerisch",
    "Ein neuer Hund zieht ein",
    "Du fühlst dich überfordert",
  ];
  const next = page.getByRole("button", { name: "Nächste Situation" });
  for (const title of expected) {
    await expect(page.locator(".situation-card.selected h3")).toHaveText(title);
    await next.click();
  }
  await expect(page.locator(".situation-card.selected h3")).toHaveText(
    expected[0],
  );
});
