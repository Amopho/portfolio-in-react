import { afterEach, expect, test, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import App from "./App";
import Home from "./components/Home";
import { SituationsCarousel } from "./components/Projects";
import ProjectsInfo from "./components/ProjectsInfo";
import { contactHref } from "./components/LandingUI";
afterEach(cleanup);
const sections = [
  "home",
  "projects",
  "values",
  "benefits",
  "about",
  "expertise",
  "process",
  "consultation",
  "contact",
];
test("hero image retains high loading priority without React DOM prop warnings", () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(<Home />);
    expect(screen.getByRole("img").getAttribute("fetchpriority")).toBe("high");
    expect(consoleError).not.toHaveBeenCalled();
  } finally {
    consoleError.mockRestore();
  }
});

test("renders the complete mockup as semantic React sections with one main heading", () => {
  const { container } = render(<App />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
    "Hundeleben.",
  );
  expect(Array.from(screen.getByRole("main").children, (el) => el.id)).toEqual(
    sections,
  );
  expect(screen.getAllByRole("banner")).toHaveLength(1);
  expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  for (const link of container.querySelectorAll('a[href^="#"]'))
    expect(container.querySelector(link.getAttribute("href"))).not.toBeNull();
  expect(container.querySelector("a a, a button, button a")).toBeNull();
});
test("all seven screenshot situations can be selected and the carousel wraps", () => {
  const { container } = render(<App />);
  const expected = [
    ["Du fühlst dich überfordert", "von den vielen Ernährungstipps."],
    [
      "Du möchtest sicher sein,",
      "dass dein Hund alles bekommt, was er braucht.",
    ],
    ["Du willst die Gesundheit deines Hundes", "aktiv unterstützen."],
    ["Du planst eine Futterumstellung", "(z. B. auf selbstgekocht)."],
    [
      "Dein Hund hat Übergewicht",
      "und du suchst einen gesunden Weg zum Wohlfühlgewicht.",
    ],
    [
      "Dein Hund frisst schlecht oder ist sehr wählerisch",
      "und du suchst passende Lösungen.",
    ],
    [
      "Ein neuer Hund zieht ein",
      "– und du möchtest von Anfang an die Ernährung richtig gestalten.",
    ],
  ];
  expect(container.querySelectorAll(".carousel-dots button")).toHaveLength(7);
  expected.forEach(([title, description], index) => {
    const dot = screen.getByRole("button", {
      name: `Situation ${index + 1}`,
      exact: true,
    });
    fireEvent.click(dot);
    const active = container.querySelector(".situation-card.selected");
    expect(active.querySelector("h3").textContent).toBe(title);
    expect(active.querySelector("p").textContent).toBe(description);
    expect(dot.getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelectorAll(".situation-card")).toHaveLength(3);
    expect(container.querySelectorAll(".situation-card")[1]).toBe(active);
  });
  fireEvent.click(screen.getByRole("button", { name: "Nächste Situation" }));
  expect(
    container.querySelector(".situation-card.selected h3").textContent,
  ).toBe(expected[0][0]);
  fireEvent.click(screen.getByRole("button", { name: "Vorherige Situation" }));
  expect(
    container.querySelector(".situation-card.selected h3").textContent,
  ).toBe(expected[6][0]);
});
test("carousel reveals additional items instead of rendering the entire dataset at once", () => {
  const items = Array.from({ length: 6 }, (_, index) => ({
    icon: () => <svg />,
    title: `Test situation ${index + 1}`,
    text: `Test description ${index + 1}`,
  }));
  const { container } = render(<SituationsCarousel items={items} />);
  const titles = () =>
    Array.from(container.querySelectorAll("h3"), (el) => el.textContent);
  expect(titles()).toEqual([
    "Test situation 1",
    "Test situation 2",
    "Test situation 3",
  ]);
  fireEvent.click(screen.getByRole("button", { name: "Nächste Situation" }));
  expect(titles()).toEqual([
    "Test situation 2",
    "Test situation 3",
    "Test situation 4",
  ]);
  fireEvent.click(screen.getByRole("button", { name: "Situation 6" }));
  expect(titles()).toEqual([
    "Test situation 5",
    "Test situation 6",
    "Test situation 1",
  ]);
  fireEvent.keyDown(
    screen.getByRole("group", { name: "Typische Situationen" }),
    { key: "ArrowRight" },
  );
  expect(titles()).toEqual([
    "Test situation 6",
    "Test situation 1",
    "Test situation 2",
  ]);
  expect(screen.getByRole("status").textContent).toContain("Situation 1 von 6");
});
test("mobile menu toggles and closes after choosing a destination", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Menü öffnen" }));
  expect(
    screen
      .getByRole("button", { name: "Menü schließen" })
      .getAttribute("aria-expanded"),
  ).toBe("true");
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Hauptnavigation" }),
    ).getByRole("link", { name: "Beratung", exact: true }),
  );
  expect(
    screen
      .getByRole("button", { name: "Menü öffnen" })
      .getAttribute("aria-expanded"),
  ).toBe("false");
});
test("consultation options carry the selected plan into the contact email", () => {
  render(<App />);
  const region = screen.getByRole("region", { name: "Beratungsoptionen" });
  const links = within(region).getAllByRole("link");
  expect(links).toHaveLength(3);
  for (const link of links) {
    expect(link.getAttribute("href").startsWith(contactHref)).toBe(true);
    expect(decodeURIComponent(link.getAttribute("href"))).toContain(
      "Ich interessiere mich für:",
    );
  }
  const contact = screen.getByRole("region", { name: "Beratung anfragen" });
  expect(
    within(contact)
      .getByRole("link", { name: "Beratung anfragen" })
      .getAttribute("href"),
  ).toBe(contactHref);
});
test("preserves base-prefixed image paths and project detail rendering", () => {
  const { container } = render(<App />);
  for (const img of container.querySelectorAll("img")) {
    expect(
      img.getAttribute("src").startsWith(`${import.meta.env.BASE_URL}img/`),
    ).toBe(true);
    expect(img.getAttribute("alt").length).toBeGreaterThan(0);
  }
  cleanup();
  render(
    <ProjectsInfo
      data={[{ id: 0, productName: "Example", image: "img/sample.png" }]}
      id="0"
    />,
  );
  expect(screen.getByRole("img").getAttribute("src")).toBe(
    `${import.meta.env.BASE_URL}img/sample.png`,
  );
});
