import { afterEach, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import App from "./App";

// jsdom does not apply media queries or calculate geometry. Apply width queries
// explicitly to check stylesheet regressions; browser visual review is still needed.
// Flatten local native CSS imports; external font imports remain ignored in jsdom.
function loadCss(file) {
  return readFileSync(file, "utf8").replace(/@import\s+"([^\"]+)";/g,
    (_, relative) => loadCss(resolve(dirname(file), relative)));
}
// An explicit reference path is used only when recording a reviewed baseline.
// CSSOM also expands later shorthands over important longhands while parsing.
// Put important declarations last inside each rule before that expansion.
const css = loadCss(resolve(process.env.PORTFOLIO_STYLE_REFERENCE || "src/styles/main.css"))
  .replace(/\{([^{}]*)\}/g, (_, body) => {
    const declarations = body.split(";").map((value) => value.trim()).filter(Boolean);
    return `{${declarations.filter((value) => !value.includes("!important"))
      .concat(declarations.filter((value) => value.includes("!important"))).join(";")};}`;
  });

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

// jsdom applies stylesheet source order without full browser specificity support.
// Order our simple selectors explicitly, and apply important declarations last.
// This keeps a change in file ownership from masking real style regressions.
function cascadeRules(rules) {
  const entries = [];
  Array.from(rules).forEach((rule) => {
    if (rule.type !== CSSRule.STYLE_RULE) return;
    rule.selectorText.split(",").forEach((selector) => {
      const simple = selector.replace(/:not\(/g, "(");
      const ids = (simple.match(/#[\w-]+/g) || []).length;
      const classes = (simple.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g) || []).length;
      const elements = (simple.match(/(^|[\s>+~])\w+|::[\w-]+/g) || []).length;
      [false, true].forEach((important) => {
        const declarations = Array.from(rule.style).filter((property) =>
          (rule.style.getPropertyPriority(property) === "important") === important)
          .map((property) => `${property}:${rule.style.getPropertyValue(property)}${important ? " !important" : ""};`);
        if (declarations.length) entries.push({ selector, declarations, important,
          specificity: [ids, classes, elements] });
      });
    });
  });
  entries.sort((a, b) => Number(a.important) - Number(b.important) ||
    a.specificity[0] - b.specificity[0] || a.specificity[1] - b.specificity[1] ||
    a.specificity[2] - b.specificity[2]);
  return entries.map(({ selector, declarations }) => `${selector}{${declarations.join("")}}`).join("\n");
}

const selectors = [
  ".portfolio-header", ".menu-list", ".portfolio-header .contact-btn a",
  ".portfolio-content", "#home", "#home h1", "#home p", ".home-images", ".home-image",
  ".story-container", ".story-container .card", ".story-container .card-body",
  "#scroll h3", ".story-button", ".story-button a", ".footer", ".footer ul",
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
  style.textContent = cascadeRules(style.sheet.cssRules);
  const styles = Object.fromEntries(selectors.map((selector) => {
    const element = container.querySelector(selector);
    expect(element, selector).not.toBeNull();
    const computed = getComputedStyle(element);
    return [selector, Object.fromEntries(properties.map((property) => [
      property, computed.getPropertyValue(property).replace(/\s*\/\s*/g, "/"),
    ]))];
  }));
  expect(styles).toMatchSnapshot();
});
