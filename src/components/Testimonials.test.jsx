import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { testimonial, interviewFeedback } from "../data/testimonials";
import { canShowTestimonial } from "../lib/testimonialPublication";
import Testimonial from "./Testimonial";
import Testimonials from "./Testimonials";

beforeEach(() => {
  vi.stubEnv("DEV", false);
  vi.stubEnv("VITE_PREVIEW_UNAPPROVED_TESTIMONIAL", "false");
});
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

test.each([
  [false, false, false, false],
  [false, false, true, false],
  [false, true, false, false],
  [false, true, true, true],
  [true, false, false, true],
  [true, false, true, true],
  [true, true, false, true],
  [true, true, true, true],
])(
  "approval=%s, development=%s, preview=%s gives visibility=%s",
  (approved, isDevelopment, previewUnapproved, expected) => {
    expect(
      canShowTestimonial({ approved }, { isDevelopment, previewUnapproved }),
    ).toBe(expected);
  },
);

test.each([undefined, null, "true", 1])(
  "production requires boolean approval, not %s",
  (approved) => {
    expect(
      canShowTestimonial(
        { approved },
        { isDevelopment: false, previewUnapproved: true },
      ),
    ).toBe(false);
  },
);

test("missing data remains hidden even during an explicit development preview", () => {
  expect(
    canShowTestimonial(null, { isDevelopment: true, previewUnapproved: true }),
  ).toBe(false);
  const { container } = render(<Testimonial />);
  expect(container.innerHTML).toBe("");
});

test("the reusable quote card preserves its presentation and attribution", () => {
  const { container } = render(<Testimonial testimonial={testimonial} />);
  const article = screen.getByRole("article");
  expect(article.className).toBe("testimonial-card");
  expect(article.querySelector(".quote-mark").getAttribute("aria-hidden")).toBe(
    "true",
  );
  expect(article.querySelector("blockquote").textContent).toBe(
    testimonial.quote,
  );
  expect(article.querySelector("strong").textContent).toBe(testimonial.author);
  expect(article.querySelector("p").textContent).toContain(testimonial.context);
  expect(container.querySelectorAll("article")).toHaveLength(1);
});

test("production hides unapproved quote and interview feedback even with the preview flag", () => {
  vi.stubEnv("VITE_PREVIEW_UNAPPROVED_TESTIMONIAL", "true");
  const { container } = render(
    <Testimonials
      testimonial={{ ...testimonial, approved: false }}
      interview={{ ...interviewFeedback, approved: false }}
    />,
  );
  expect(container.innerHTML).toBe("");
});

test.each(["false", "TRUE", "1", ""])(
  "development preview is not enabled by %s",
  (flag) => {
    vi.stubEnv("DEV", true);
    vi.stubEnv("VITE_PREVIEW_UNAPPROVED_TESTIMONIAL", flag);
    const { container } = render(
      <Testimonials
        testimonial={{ ...testimonial, approved: false }}
        interview={{ ...interviewFeedback, approved: false }}
      />,
    );
    expect(container.innerHTML).toBe("");
  },
);

test("explicit development preview shows both designs without approving their data", () => {
  vi.stubEnv("DEV", true);
  vi.stubEnv("VITE_PREVIEW_UNAPPROVED_TESTIMONIAL", "true");
  const quote = { ...testimonial, approved: false };
  const feedback = { ...interviewFeedback, approved: false };
  const { container } = render(
    <Testimonials testimonial={quote} interview={feedback} />,
  );
  expect(
    screen.getByRole("region", { name: "Erfahrungen und Rückmeldungen" }),
  ).toBeTruthy();
  expect(
    container.querySelectorAll(".testimonials-grid > article"),
  ).toHaveLength(2);
  expect(container.querySelectorAll(".interview-card blockquote")).toHaveLength(
    3,
  );
  expect(quote.approved).toBe(false);
  expect(feedback.approved).toBe(false);
});

test.each([
  [true, false],
  [false, true],
  [true, true],
])(
  "production independently applies quote approval %s and interview approval %s",
  (quoteApproved, interviewApproved) => {
    const { container } = render(
      <Testimonials
        testimonial={{ ...testimonial, approved: quoteApproved }}
        interview={{ ...interviewFeedback, approved: interviewApproved }}
      />,
    );
    expect(Boolean(container.querySelector(".testimonial-card"))).toBe(
      quoteApproved,
    );
    expect(Boolean(container.querySelector(".interview-card"))).toBe(
      interviewApproved,
    );
    expect(
      container.querySelectorAll(".testimonials-grid > article"),
    ).toHaveLength(Number(quoteApproved) + Number(interviewApproved));
    expect(
      screen.getByRole("region", { name: "Erfahrungen und Rückmeldungen" }),
    ).toBeTruthy();
  },
);
