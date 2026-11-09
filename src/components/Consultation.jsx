import {
  FiMessageCircle,
  FiFileText,
  FiStar,
  FiBarChart2,
  FiSun,
  FiFeather,
  FiMonitor,
  FiHeart,
  FiXCircle,
} from "react-icons/fi";
import { Heading, Art, Icon, Check, Button, contactHref } from "./LandingUI";
const plans = [
  {
    icon: FiMessageCircle,
    title: "Erstberatung",
    subtitle: "Ein guter Start für deine Fragen",
    points: [
      "Persönliches Gespräch (ca. 30 Min.)",
      "Klärung deiner wichtigsten Fragen",
      "Empfehlung für das weitere Vorgehen",
    ],
    action: "Ideal für erste Fragen",
  },
  {
    icon: FiFileText,
    title: "Komplette Ernährungsanalyse",
    subtitle: "Fundierte Analyse & klarer Plan",
    points: [
      "Ausführliche Analyse nach FEDIAF/NRC",
      "Individuelle Fütterungsempfehlung",
      "Nachhaltigkeitsbewertung",
      "Verständliche Auswertung & Handlungstipps",
    ],
    action: "Für eine ausgewogene Ernährung",
    popular: true,
  },
  {
    icon: FiStar,
    title: "Premium Beratung",
    subtitle: "Persönlich. Individuell. Ganzheitlich.",
    points: [
      "Umfassende Analyse & individueller Plan",
      "Persönliches Beratungsgespräch (ca. 60 Min.)",
      "Begleitung bei der Umsetzung",
      "Optional: Folgeanalyse nach 4–8 Wochen",
    ],
    action: "Für höchste Ansprüche",
  },
];
export default function Consultation() {
  return (
    <div className="container">
      <div className="consultation-intro">
        <div>
          <p className="eyebrow">
            BERATUNGSOPTIONEN <span className="eyebrow-line" />
          </p>
          <Heading>
            Unsere
            <br />
            <span className="underline">Beratungsoptionen</span>
          </Heading>
          <p>
            Ob gezielte Unterstützung oder ein umfassender Plan – du wählst die
            Beratung, die zu dir und deinem Hund passt.
          </p>
        </div>
        <Art name="options" alt="Ein kleiner Hund neben seinem Futternapf" />
      </div>
      <div className="plans-grid">
        {plans.map(({ icon, title, subtitle, points, action, popular }) => (
          <article
            className={`plan-card ${popular ? "popular" : ""}`}
            key={title}
          >
            {popular && <span className="popular-label">Beliebt</span>}
            <Icon icon={icon} />
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <ul className="check-list">
              {points.map((text) => (
                <li key={text}>
                  <Check />
                  {text}
                </li>
              ))}
            </ul>
            <Button
              href={`${contactHref}&body=${encodeURIComponent(`Ich interessiere mich für: ${title}`)}`}
              primary={popular}
            >
              {action}
            </Button>
          </article>
        ))}
      </div>
      <div className="included-panel">
        <div>
          <Heading>
            <span className="underline">Das ist inbegriffen</span>
          </Heading>
          <div className="included-grid">
            {[
              [FiBarChart2, "Fundierte Analyse"],
              [FiSun, "Klare Empfehlungen in alltagstauglicher Form"],
              [FiFeather, "Nachhaltigkeitsbewertung"],
              [FiMonitor, "Digitale Tools (z. B. Futterplan-Rechner)"],
              [FiHeart, "Persönliche Beratung"],
            ].map(([icon, text]) => (
              <div key={text}>
                <Icon icon={icon} />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <h3>Was nicht enthalten ist</h3>
          <p>
            <FiXCircle aria-hidden="true" />
            Diagnose oder Behandlung von Krankheiten.
          </p>
          <small>
            Bei gesundheitlichen Fragen wende dich bitte an deine Tierärztin
            oder deinen Tierarzt.
          </small>
        </aside>
      </div>
    </div>
  );
}
