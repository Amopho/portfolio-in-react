import { FaGraduationCap } from "react-icons/fa";
import {
  FiUsers,
  FiShield,
  FiFeather,
  FiMessageCircle,
  FiAward,
} from "react-icons/fi";
import { Art, Heading, Icon, Check } from "./LandingUI";
import Process from "./Process";
export default function Story() {
  return (
    <>
      <section
        id="expertise"
        aria-label="Erfahrungen und fachliche Grundlage"
        className="section-space"
      >
        <div className="container">
          <div className="trust-intro">
            <div>
              <p className="eyebrow">ERFAHRUNGEN & FACHLICHE GRUNDLAGE</p>
              <Heading>
                Vertrauen, das
                <br />
                auf fundierten
                <br />
                <em className="underline">Erfahrungen</em> basiert.
              </Heading>
              <p>
                Wirkungsvolle Empfehlungen entstehen aus Wissenschaft,
                Praxiserfahrung und dem, was Hundebesitzer:innen im Alltag
                wirklich brauchen.
              </p>
            </div>
            <Art
              name="trust"
              alt="Ein entspannter Hund liegt auf seiner Decke"
            />
          </div>
          <div className="trust-features">
            {[
              [FiUsers, "Echte Erfahrungen aus der Praxis"],
              [FaGraduationCap, "Wissenschaftlich fundiert"],
              [FiShield, "Transparente Methodik"],
              [FiFeather, "Orientiert an deinen Alltagsbedürfnissen"],
            ].map(([icon, title]) => (
              <div className="feature" key={title}>
                <Icon icon={icon} />
                <strong>{title}</strong>
              </div>
            ))}
          </div>
          <div className="trust-cards">
            <article className="testimonial-card">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                „Endlich ein klarer Plan, der zu meinem Hund, unserem Alltag und
                meinen Möglichkeiten passt. Die Erklärungen sind verständlich
                und geben mir Sicherheit.“
              </blockquote>
              <p>
                <strong>Julia M. mit Milo</strong>
                <br />
                Beratungsbegleitung
              </p>
            </article>
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
                „Eine einfache, geführte Lösung würde mir den Alltag
                erleichtern.“
              </blockquote>
            </article>
            <article>
              <FiAward className="card-icon" aria-hidden="true" />
              <h3>Mein fachlicher Hintergrund</h3>
              <ul className="check-list">
                {[
                  "Promotion (PhD) in Tierwissenschaften mit Schwerpunkt Ernährung",
                  "Mehrjährige Praxiserfahrung in der Tierernährung",
                  "Softwareentwicklung & digitale Produktentwicklung (> 4 Jahre Industrieerfahrung)",
                  "Kontinuierliche Weiterbildung (u. a. FEDIAF, NRC, Nachhaltigkeit)",
                ].map((text) => (
                  <li key={text}>
                    <Check />
                    {text}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <Process />
    </>
  );
}
