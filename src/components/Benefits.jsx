import { FaGraduationCap } from "react-icons/fa";
import { FiMonitor, FiSliders, FiSmartphone } from "react-icons/fi";
import { Icon, Heading } from "./LandingUI";
export function Benefits() {
  return (
    <div className="benefits-panel container">
      <div>
        <Heading>
          Weitere Vorteile –<br />
          <em className="underline">Dein Mehrwert</em>
        </Heading>
        <p>Tiefere Vorteile, die besonders für dich zählen.</p>
      </div>
      <div className="benefits-grid">
        {[
          [
            FaGraduationCap,
            "Einzigartige Kombination",
            "Tierernährung (PhD) und Softwareentwicklung – Fachwissen trifft praktische, digitale Lösungen.",
          ],
          [
            FiMonitor,
            "Einfach und intuitiv",
            "Komplexe Berechnungen laufen im Hintergrund – du erhältst klare, verständliche Empfehlungen.",
          ],
          [
            FiSliders,
            "Transparent und nachvollziehbar",
            "Du verstehst, warum eine Empfehlung sinnvoll ist – ohne dich durch Zahlenberge zu kämpfen.",
          ],
          [
            FiSmartphone,
            "Zukünftig auch als App",
            "Praktische Tools für deine tägliche Fütterungsplanung – überall und jederzeit.",
          ],
        ].map(([icon, title, text]) => (
          <article key={title}>
            <Icon icon={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
