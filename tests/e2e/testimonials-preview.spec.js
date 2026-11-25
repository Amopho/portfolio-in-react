import { test, expect } from "@playwright/test";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { testimonial, interviewFeedback } from "../../src/data/testimonials";

const servers = [];
const urls = new Map();

test.beforeAll(async () => {
  await Promise.all(
    [false, true].map(async (preview, index) => {
      const port = 4181 + index;
      const child = spawn(
        process.execPath,
        [
          resolve("node_modules/vite/bin/vite.js"),
          "--host",
          "127.0.0.1",
          "--port",
          String(port),
          "--strictPort",
        ],
        {
          cwd: process.cwd(),
          env: {
            ...process.env,
            VITE_PREVIEW_UNAPPROVED_TESTIMONIAL: String(preview),
          },
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
      servers.push(child);
      let diagnostics = "";
      child.stdout.on("data", (data) => {
        diagnostics = (diagnostics + data).slice(-4000);
      });
      child.stderr.on("data", (data) => {
        diagnostics = (diagnostics + data).slice(-4000);
      });
      child.on("error", (error) => {
        diagnostics += error.message;
      });
      const url = `http://127.0.0.1:${port}/portfolio-in-react/`;
      urls.set(preview, url);
      await expect
        .poll(
          async () => {
            try {
              return (await fetch(url)).status;
            } catch {
              return 0;
            }
          },
          {
            timeout: 30000,
            message: `Development server must start: ${url}\n${diagnostics}`,
          },
        )
        .toBe(200);
    }),
  );
});

test.afterAll(async () => {
  await Promise.all(
    servers.map(
      (child) =>
        new Promise((resolveExit) => {
          if (child.exitCode !== null) return resolveExit();
          const timeout = setTimeout(() => child.kill("SIGKILL"), 3000);
          child.once("exit", () => {
            clearTimeout(timeout);
            resolveExit();
          });
          child.kill("SIGTERM");
        }),
    ),
  );
});

for (const width of [1440, 375])
  for (const preview of [false, true]) {
    test(`development at ${width}px with explicit preview=${preview}`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(urls.get(preview));
      const showQuote = testimonial.approved === true || preview;
      const showInterview = interviewFeedback.approved === true || preview;
      await expect(page.locator(".testimonial-card")).toHaveCount(
        Number(showQuote),
      );
      await expect(page.locator(".interview-card")).toHaveCount(
        Number(showInterview),
      );
      await expect(page.locator("#testimonials")).toHaveCount(
        Number(showQuote || showInterview),
      );
      if (showQuote || showInterview) {
        const section = page.locator("#testimonials");
        await section.scrollIntoViewIfNeeded();
        await page.evaluate(() => document.fonts.ready);
        if (showQuote)
          await expect(page.locator(".testimonial-card blockquote")).toHaveText(
            testimonial.quote,
          );
        const columns = await page
          .locator(".testimonials-grid")
          .evaluate(
            (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
          );
        expect(columns).toBe(width > 760 ? 2 : 1);
        await section.screenshot({
          path: testInfo.outputPath(`testimonials-preview-${width}.png`),
          animations: "disabled",
        });
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      expect(errors).toEqual([]);
    });
  }
