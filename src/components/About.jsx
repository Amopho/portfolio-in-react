import { FaGraduationCap } from "react-icons/fa";
import { FiMonitor, FiHeart } from "react-icons/fi";
import { Art, Icon, Heading, Button } from "./LandingUI";
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
