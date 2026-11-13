import { FiMessageCircle } from "react-icons/fi";
import Testimonial from "./Testimonial";

// PLACEHOLDER — NOT SUITABLE FOR PUBLICATION.
// Replace with an authentic, approved testimonial before release.
const testimonial = {
  quote:
    "„Endlich ein klarer Plan, der zu meinem Hund, unserem Alltag und meinen Möglichkeiten passt. Die Erklärungen sind verständlich und geben mir Sicherheit.“",
  author: "Julia M. mit Milo",
  context: "Beratungsbegleitung",
};

export default function Testimonials() {
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
          <Testimonial testimonial={testimonial} />
          <article className="interview-card">
            <FiMessageCircle className="card-icon" aria-hidden="true" />
            <h3>Stimmen aus der Praxis</h3>
            <p>Was mir Hundebesitzer:innen in Interviews erzählen:</p>
            <blockquote>
              „Ich wünsche mir eine klare, verlässliche Einschätzung.“
            </blockquote>
            <blockquote>
              „Die vielen, widersprüchlichen Infos verunsichern mich.“
            </blockquote>
            <blockquote>
              „Eine einfache, geführte Lösung würde mir den Alltag erleichtern.“
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
}
