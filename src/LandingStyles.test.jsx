import { expect, test } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
function loadCss(file) {
  return readFileSync(file, "utf8").replace(
    /@import\s+["']([^"']+)["'];/g,
    (_, path) => loadCss(resolve(dirname(file), path)),
  );
}
test("all local stylesheet imports resolve and CSS has no external font dependency", () => {
  const css = loadCss(resolve("src/styles/main.css"));
  expect(css).not.toContain("fonts.googleapis.com");
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  expect(style.sheet.cssRules.length).toBeGreaterThan(100);
  style.remove();
});
test("all mockup image assets are available in the production asset folder", () => {
  for (const name of ["about", "dalmatian", "trust", "options"])
    expect(existsSync(`public/img/landing/${name}.jpg`)).toBe(true);
});
