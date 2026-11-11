import { FiMail, FiClipboard, FiBarChart2, FiMessageCircle } from "react-icons/fi";
import { Heading, Icon, Arrow } from "./LandingUI";
const steps = [
  [
    FiMail,
    "Anfrage stellen",
    "Du nimmst Kontakt auf – unkompliziert per E-Mail.",
  ],
  [
    FiClipboard,
    "Hundeprofil, Bedürfnisse und Präferenzen ausfüllen",
    "Du gibst mir alle relevanten Infos zu deinem Hund (z. B. Alter, Gewicht, Gesundheit, Aktivität) sowie deine Ziele, Rahmenbedingungen und Vorlieben (z. B. BARF, selbst gekocht, Fertigfutter).",
  ],
  [
    FiBarChart2,
    "Analyse & Bewertung",
    "Ich analysiere die Ration wissenschaftlich (FEDIAF/NRC), identifiziere Optimierungspotenziale und bewerte – falls gewünscht – auch Umweltaspekte.",
  ],
  [
    FiMessageCircle,
    "Ergebnisse besprechen & Empfehlung erhalten",
    "Wir gehen die Ergebnisse gemeinsam durch, klären deine Fragen und du erhältst eine klare, umsetzbare Empfehlung und nächste Schritte.",
  ],
];
export default function Process() {
  return (
    <section
      id="process"
      aria-label="So läuft unsere Zusammenarbeit"
      className="section-space process-section"
    >
      <div className="container">
        <div className="section-intro-row">
          <div>
            <p className="eyebrow">SO LÄUFT UNSERE ZUSAMMENARBEIT</p>
            <Heading>
              Dein Weg zur individuellen{" "}
              <em className="underline">Empfehlung.</em>
            </Heading>
          </div>
          <p>
            Schritt für Schritt – transparent, persönlich und gut begleitet.
          </p>
        </div>
        <ol className="process-grid">
          {steps.map(([icon, title, text], index) => (
            <li key={title}>
              <div className="step-icon">
                <Icon icon={icon} />
                {index < 3 && <Arrow />}
              </div>
              <article>
                <span className="step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
