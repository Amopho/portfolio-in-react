import { afterEach, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { compile } from "sass";
import { resolve } from "node:path";
import App from "./App";

// jsdom does not apply media queries or calculate geometry. Apply width queries
// explicitly to check stylesheet regressions; browser visual review is still needed.
const css = compile(resolve("src/scss/main.scss"), {
  loadPaths: ["node_modules"],
  logger: { warn() {} },
}).css;

function activeRules(rules, width) {
  return Array.from(rules).flatMap((rule) => {
    if (rule.type === CSSRule.IMPORT_RULE) return [];
    if (rule.type !== CSSRule.MEDIA_RULE) return [rule.cssText];
    const query = rule.conditionText;
    if (/print|prefers-reduced-motion/.test(query)) return [];
    const min = query.match(/min-width:\s*([\d.]+)px/);
    const max = query.match(/max-width:\s*([\d.]+)px/);
    if (min && width < Number(min[1])) return [];
    if (max && width > Number(max[1])) return [];
    return activeRules(rule.cssRules, width);
  }).join("\n");
}

const selectors = [
  ".portfolio-header", ".menu-list", ".portfolio-header .contact-btn a",
  ".portfolio-content", "#home", "#home h1", "#home p", ".home-images", ".home-image",
  ".story-container", ".story-container .card", ".story-container .card-body",
  "#scroll h3", ".story-button", ".story-button a", ".section-container", ".hi-img", ".section-text",
  ".section-container .text", ".section-container .text h1", ".footer", ".footer ul",
];
const properties = [
  "display", "position", "top", "z-index", "width", "height", "min-height",
  "grid-template-columns", "flex-direction", "flex-wrap", "gap",
  "align-items", "justify-content", "margin", "padding", "scroll-margin-top",
  "font-family", "font-size", "font-weight", "color", "background-color",
  "border-radius", "aspect-ratio", "object-fit",
];
let style;
afterEach(() => {
  cleanup();
  style?.remove();
});

test("preserves landing-page content, images, and navigation markup", () => {
  const { container } = render(<App />);
  // The copyright year is intentionally dynamic.
  const markup = container.innerHTML.replace(/Copyrights ®\d{4}/, "Copyrights ®YEAR");
  expect(markup).toMatchSnapshot();
});

test.each([1440, 768, 375])("preserves landing styles at %ipx", (width) => {
  const { container } = render(<App />);
  style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
  const selectedCss = activeRules(style.sheet.cssRules, width);
  style.textContent = selectedCss;
  const styles = Object.fromEntries(selectors.map((selector) => {
    const element = container.querySelector(selector);
    expect(element, selector).not.toBeNull();
    const computed = getComputedStyle(element);
    return [selector, Object.fromEntries(properties.map((property) => [
      property, computed.getPropertyValue(property),
    ]))];
  }));
  expect(styles).toMatchSnapshot();
});
