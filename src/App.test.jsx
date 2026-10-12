import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import App from "./App";
import ProjectsInfo from "./components/ProjectsInfo";
import stories from "./story.json";

// PTST-4 technical checks use structure and URLs, independent of displayed copy.
// PFE-12 content/style preservation belongs to LandingStyles.test.jsx snapshots.
const primarySectionIds = ["home", "projects", "blog", "contact"];

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
});

test("renders the primary sections together in a persistent layout", () => {
  const { container } = render(<App />);

  expect(container.querySelectorAll("header")).toHaveLength(1);
  expect(container.querySelectorAll(".footer")).toHaveLength(1);
  const main = screen.getByRole("main");
  expect(Array.from(main.children, (section) => section.id)).toEqual(primarySectionIds);
  primarySectionIds.forEach((id) => {
    const section = main.querySelector(`section#${id}`);
    expect(section).not.toBeNull();
    expect(section.children.length).toBeGreaterThan(0);
  });
  expect(within(container.querySelector("header")).getByRole("navigation")).toBeTruthy();
});

test("internal navigation uses existing sections rather than nested URLs", () => {
  const { container } = render(<App />);
  const links = Array.from(container.querySelectorAll("a"));
  const internalLinks = links.filter((link) => !link.href.startsWith("https://"));

  expect(internalLinks.length).toBeGreaterThan(0);
  internalLinks.forEach((link) => {
    const href = link.getAttribute("href");
    expect(href.startsWith("#")).toBe(true);
    expect(container.querySelector(href)).not.toBeNull();
  });
  const headerTargets = Array.from(container.querySelectorAll("header a"),
    (link) => link.getAttribute("href"));
  expect(new Set(headerTargets)).toEqual(new Set(primarySectionIds.map((id) => `#${id}`)));
  const storyTargets = within(container.querySelector("#scroll")).getAllByRole("link")
    .map((link) => link.getAttribute("href"));
  expect(storyTargets).toEqual(["#contact", "#contact", "#blog"]);
  expect(container.querySelector("a a, a button, button a, button button")).toBeNull();
});

test("renders story card structure and base-prefixed images", () => {
  const { container } = render(<App />);
  const cards = container.querySelectorAll("#scroll .card");
  expect(cards).toHaveLength(stories.length);
  cards.forEach((card, index) => {
    expect(within(card).getByRole("heading")).toBeTruthy();
    expect(card.querySelector(".card-body")).not.toBeNull();
    expect(within(card).getByRole("link")).toBeTruthy();
    expect(within(card).getByRole("img").getAttribute("src"))
      .toBe(`${import.meta.env.BASE_URL}${stories[index].img}`);
  });
});

test.each(["#projects", "#blog", "#contact", "#unknown"])(
  "renders the same root experience when loaded with %s", (fragment) => {
    window.history.replaceState({}, "", `/portfolio-in-react/${fragment}`);
    render(<App />);
    expect(screen.getByRole("main")).toBeTruthy();
    const main = screen.getByRole("main");
    expect(Array.from(main.children, (section) => section.id)).toEqual(primarySectionIds);
    primarySectionIds.forEach((id) => {
      expect(main.querySelector(`section#${id}`)?.children.length).toBeGreaterThan(0);
    });
  }
);

test("retains project detail rendering without requiring a router", () => {
  const projects = [{ id: 0, productName: "Sample project", image: "img/sample.png" }];
  const { container } = render(<ProjectsInfo data={projects} id="0" />);
  expect(within(screen.getByRole("listitem")).getByRole("heading")).toBeTruthy();
  expect(screen.getByRole("img").getAttribute("src"))
    .toBe(`${import.meta.env.BASE_URL}${projects[0].image}`);
  expect(screen.getByRole("link").getAttribute("href"))
    .toBe(`${import.meta.env.BASE_URL}#projects`);
  expect(container.querySelector("img").children).toHaveLength(0);
});
