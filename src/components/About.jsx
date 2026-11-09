import { FaGraduationCap } from "react-icons/fa";
import { FiMonitor, FiSliders, FiSmartphone, FiHeart } from "react-icons/fi";
import { Art, Icon, Heading, Button } from "./LandingUI";
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
export default function About() {
  return (
    <div className="container about-layout">
      <Art name="about" alt="Alina mit einem Hund auf einer sonnigen Wiese" />
      <div className="about-copy">
        <p className="eyebrow">ÜBER MICH</p>
        <Heading>
          Wissenschaft. Praxis. <em className="underline">Leidenschaft.</em>
        </Heading>
        <p>
          Ich bin Dr. Alina K. Majewska-Pinda, promovierte Tierwissenschaftlerin,
          Ernährungsberaterin und Entwicklerin digitaler Tools für eine
          alltagstaugliche, fundierte Hundeernährung.
        </p>
        <div className="about-pillars">
          {[
            [FaGraduationCap, "Wissenschaftlicher Hintergrund (PhD)"],
            [FiMonitor, "Digitale Lösungen aus eigener Entwicklung"],
            [FiHeart, "Hundemensch aus Überzeugung"],
          ].map(([icon, title]) => (
            <article key={title}>
              <Icon icon={icon} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
        <Button href="#expertise">Mehr über mich</Button>
      </div>
    </div>
  );
}
