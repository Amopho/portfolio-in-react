import { test, expect } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { testimonial, interviewFeedback } from "../../src/data/testimonials";

test("production applies each feedback entry's approval and closes an empty section", async ({
  page,
}, testInfo) => {
  await page.goto("./");
  const quoteApproved = testimonial.approved === true;
  const interviewApproved = interviewFeedback.approved === true;
  await expect(page.locator(".testimonial-card")).toHaveCount(
    Number(quoteApproved),
  );
  await expect(page.locator(".interview-card")).toHaveCount(
    Number(interviewApproved),
  );
  await expect(page.locator("#testimonials")).toHaveCount(
    Number(quoteApproved || interviewApproved),
  );
  await expect(
    page.locator("#expertise .testimonial-card, #expertise .interview-card"),
  ).toHaveCount(0);
  await expect(
    page.locator("#expertise .expertise-credentials > article"),
  ).toHaveCount(1);
  if (!quoteApproved)
    await expect(
      page.getByText(testimonial.author, { exact: true }),
    ).toHaveCount(0);
  if (!interviewApproved)
    for (const quote of interviewFeedback.quotes)
      await expect(page.getByText(quote, { exact: true })).toHaveCount(0);
  if (!quoteApproved && !interviewApproved) {
    expect(
      await page.locator("#process").evaluate((el) => el.nextElementSibling.id),
    ).toBe("consultation");
  } else {
    await expect(
      page.getByRole("region", { name: "Erfahrungen und Rückmeldungen" }),
    ).toBeVisible();
    if (quoteApproved) {
      const card = page.locator(".testimonial-card");
      await expect(card.locator(".quote-mark")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      await expect(card.locator("blockquote")).toHaveText(testimonial.quote);
      await expect(card.locator("strong")).toHaveText(testimonial.author);
      await expect(card).toHaveCSS("border-radius", "28px");
      await expect(card).toHaveCSS("background-image", /linear-gradient/);
      await expect(card.locator("blockquote")).toHaveCSS(
        "font-style",
        "italic",
      );
      await expect(card.locator(".quote-mark")).toHaveCSS("font-size", "78px");
    }
    if (quoteApproved !== interviewApproved) {
      await expect(page.locator(".testimonials-grid > article")).toHaveCount(1);
      await expect(page.locator(".testimonials-grid > article")).toHaveCSS(
        "grid-column",
        "1 / -1",
      );
    }
  }
  const domPath = testInfo.outputPath("publication-dom.html");
  writeFileSync(
    domPath,
    await page.locator("main").evaluate((el) => el.outerHTML),
  );
  await testInfo.attach("publication DOM", {
    path: domPath,
    contentType: "text/html",
  });
});
