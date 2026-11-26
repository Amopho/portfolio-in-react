import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SituationsCarousel } from "./Situations";

const items = (count) =>
  Array.from({ length: count }, (_, index) => ({
    icon: () => <svg aria-hidden="true" />,
    title: `Situation ${index + 1}`,
    text: `Description ${index + 1}`,
  }));
afterEach(cleanup);

test("an empty dataset renders no carousel or controls", () => {
  const { container } = render(<SituationsCarousel items={[]} />);
  expect(container.innerHTML).toBe("");
});
test("one situation is a static card without redundant controls", () => {
  const { container } = render(<SituationsCarousel items={items(1)} />);
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.queryAllByRole("button")).toHaveLength(0);
  expect(container.querySelector(".selected h3").textContent).toBe(
    "Situation 1",
  );
  expect(screen.getByRole("status").textContent).toContain("Situation 1 von 1");
});
test("two situations render once each and cycle without duplicate keys", () => {
  const errors = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    const { container } = render(<SituationsCarousel items={items(2)} />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(container.querySelector(".selected h3").textContent).toBe(
      "Situation 2",
    );
    fireEvent.click(screen.getByRole("button", { name: "Nächste Situation" }));
    expect(container.querySelector(".selected h3").textContent).toBe(
      "Situation 1",
    );
    fireEvent.keyDown(
      screen.getByRole("button", { name: "Nächste Situation" }),
      { key: "ArrowLeft" },
    );
    expect(container.querySelector(".selected h3").textContent).toBe(
      "Situation 2",
    );
    expect(errors).not.toHaveBeenCalled();
  } finally {
    errors.mockRestore();
  }
});
test("shrinking the dataset keeps selection in bounds", () => {
  const { container, rerender } = render(
    <SituationsCarousel items={items(6)} />,
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Situation 6", exact: true }),
  );
  rerender(<SituationsCarousel items={items(2)} />);
  expect(container.querySelector(".selected h3").textContent).toBe(
    "Situation 2",
  );
  fireEvent.click(screen.getByRole("button", { name: "Nächste Situation" }));
  expect(container.querySelector(".selected h3").textContent).toBe(
    "Situation 1",
  );
  rerender(<SituationsCarousel items={[]} />);
  expect(container.innerHTML).toBe("");
  rerender(<SituationsCarousel items={items(1)} />);
  expect(container.querySelector(".selected h3").textContent).toBe(
    "Situation 1",
  );
});
