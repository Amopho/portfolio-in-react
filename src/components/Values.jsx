import { FiMonitor, FiFeather, FiHeart } from "react-icons/fi";
import { FaPaw, FaWeight } from "react-icons/fa";
import { GiMicroscope, GiDogBowl } from "react-icons/gi";
import { Heading, Icon, Arrow, Check, Note } from "./LandingUI";
import Approach from "./Approach";
const strengths = [
  [
    GiMicroscope,
    "Wissenschaftlich fundierte Analyse (FEDIAF/NRC)",
    "Klarheit und Sicherheit bei der Fütterung",
  ],
  [
    FiMonitor,
    "Erprobte, alltagstaugliche Konzepte",
    "Ein Plan, der zu dir, deinem Hund und eurem Alltag passt",
  ],
  [
    FiFeather,
    "Ganzheitlicher Blick – Gesundheit, Ernährung und Umweltauswirkung",
    "Informierte Entscheidungen – auch mit Blick auf Nachhaltigkeit",
  ],
];
export default function Values() {
  return (
    <>
      <div className="outcomes container">
        <Heading>
          Was du
          <br /> bei mir
          <br /> <em className="underline">erreichst</em>
        </Heading>
        <div className="outcome-content">
          <div className="outcome-labels">
            <strong>Meine Stärken für dich</strong>
            <strong>Das kannst du daraus mitnehmen</strong>
          </div>
          {strengths.map(([icon, strength, benefit]) => (
            <div className="outcome-row" key={strength}>
              <div>
                <Icon icon={icon} />
                <span>{strength}</span>
              </div>
              <Arrow />
              <p>
                <Check />
                {benefit}
              </p>
            </div>
          ))}
          <Note />
        </div>
      </div>
      <div className="support container">
        <Heading>
          <span className="underline">Wofür ich dich unterstütze</span>
        </Heading>
        <div className="support-grid">
          {[
            [FaPaw, "Bedarfsgerechte Ernährungspläne"],
            [GiDogBowl, "Selbstgekochte, BARF- & Fertigfutter-Rationen"],
            [FiHeart, "Hunde in allen Lebensphasen – vom Welpen bis Senior"],
            [FaWeight, "Gewichtsmonitoring & Körperkondition (BCS)"],
            [FiFeather, "Nachhaltige Ernährungsentscheidungen im Alltag"],
          ].map(([icon, title]) => (
            <article className="support-card" key={title}>
              <Icon icon={icon} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
      <Approach />
    </>
  );
}
