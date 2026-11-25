export default function Testimonial({ testimonial }) {
  if (!testimonial) return null;

  return (
    <article className="testimonial-card">
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>{testimonial.quote}</blockquote>
      <p>
        <strong>{testimonial.author}</strong>
        <br />
        {testimonial.context}
      </p>
    </article>
  );
}
