import { render, screen, within } from "@testing-library/react";
import App from "./App";
import ProjectsInfo from "./components/ProjectsInfo";
import projects from "./projects.json";
import stories from "./story.json";

test("renders the primary sections together in a persistent layout", () => {
  const { container } = render(<App />);

  expect(container.querySelectorAll("header")).toHaveLength(1);
  expect(container.querySelectorAll(".footer")).toHaveLength(1);
  const main = screen.getByRole("main");
  expect(Array.from(main.children, (section) => section.id)).toEqual([
    "home", "projects", "blog", "contact",
  ]);
  expect(within(main).getByRole("heading", { name: "Hi, I am Alina!" })).toBeTruthy();
  expect(within(main).getByRole("heading", { name: "Blog" })).toBeTruthy();
  expect(within(main).getByRole("heading", { name: "Contact" })).toBeTruthy();
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
  expect(screen.getByRole("link", { name: "Read More" }).getAttribute("href")).toBe("#blog");
  expect(container.querySelector("a a, a button, button a, button button")).toBeNull();
});

test("preserves story copy and image choices", () => {
  const { container } = render(<App />);
  stories.forEach((story) => {
    expect(screen.getByRole("heading", { name: story.heading })).toBeTruthy();
    expect(Array.from(container.querySelectorAll("#scroll p"), (paragraph) => paragraph.textContent))
      .toContain(story.description);
    expect(Array.from(container.querySelectorAll("img"), (image) => image.getAttribute("src")))
      .toContain(`${process.env.PUBLIC_URL || ""}/${story.img}`);
  });
});

test.each(["#projects", "#blog", "#contact", "#unknown"])(
  "renders the same root experience when loaded with %s", (fragment) => {
    window.history.replaceState({}, "", `/portfolio-in-react/${fragment}`);
    render(<App />);
    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("region", { name: "Home" })).toBeTruthy();
    expect(screen.getByRole("region", { name: "Projects" })).toBeTruthy();
    expect(screen.getByRole("region", { name: "Blog" })).toBeTruthy();
    expect(screen.getByRole("region", { name: "Contact" })).toBeTruthy();
    window.history.replaceState({}, "", "/");
  }
);

test("retains project detail rendering without requiring a router", () => {
  const { container } = render(<ProjectsInfo data={projects} id="0" />);
  expect(screen.getByRole("heading", { name: projects[0].productName })).toBeTruthy();
  expect(screen.getByRole("img").getAttribute("src"))
    .toBe(`${process.env.PUBLIC_URL || ""}/${projects[0].image}`);
  expect(screen.getByRole("link", { name: "Back" }).getAttribute("href"))
    .toBe(`${process.env.PUBLIC_URL || ""}/#projects`);
  expect(container.querySelector("img").children).toHaveLength(0);
});
