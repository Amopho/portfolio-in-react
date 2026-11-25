import { FiMessageCircle } from "react-icons/fi";
import { testimonial, interviewFeedback } from "../data/testimonials";
import { canShowTestimonial } from "../lib/testimonialPublication";
import Testimonial from "./Testimonial";

export default function Testimonials({
  testimonial: quote = testimonial,
  interview: feedback = interviewFeedback,
}) {
  const publicationOptions = {
    isDevelopment: import.meta.env.DEV,
    previewUnapproved:
      import.meta.env.VITE_PREVIEW_UNAPPROVED_TESTIMONIAL === "true",
  };
  const showQuote = canShowTestimonial(quote, publicationOptions);
  const showInterview = canShowTestimonial(feedback, publicationOptions);

  if (!showQuote && !showInterview) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-space testimonials-section"
    >
      <div className="container">
        <h2 id="testimonials-heading" className="section-heading">
          <span className="underline">Erfahrungen und Rückmeldungen</span>
        </h2>
        <div className="trust-cards testimonials-grid">
          <Testimonial testimonial={showQuote ? quote : null} />
          {showInterview && (
            <article className="interview-card">
              <FiMessageCircle className="card-icon" aria-hidden="true" />
              <h3>{feedback.title}</h3>
              <p>{feedback.introduction}</p>
              {feedback.quotes.map((text) => (
                <blockquote key={text}>{text}</blockquote>
              ))}
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
