import { FiHeart, FiFeather } from "react-icons/fi";
import { GiErlenmeyer } from "react-icons/gi";
import { Heading, Icon, Art } from "./LandingUI";
export default function Approach() {
  return (
    <div className="approach container">
      <div>
        <Heading>
          Warum dieser
          <br />
          <span className="underline">Ansatz?</span>
        </Heading>
        <p>
          Weil die Ernährung deines Hundes mehr ist als nur Futter – sie
          beeinflusst Gesundheit, Lebensqualität und auch unsere Umwelt. Mein
          Ansatz verbindet wissenschaftliche Grundlagen mit Praxiserfahrung,
          Individualität und Nachhaltigkeit.
        </p>
        <div className="approach-pillars">
          {[
            [
              GiErlenmeyer,
              "Meine Grundlage",
              "Wissenschaftlich fundiert (FEDIAF/NRC) und transparent erklärt.",
            ],
            [
              FiHeart,
              "Meine Mission",
              "Hunde langfristig gesund, fit und vital begleiten – mit Ernährung, die wirklich zu ihrem Leben passt.",
            ],
            [
              FiFeather,
              "Meine Werte",
              "Individuell. Praxisnah. Verantwortungsvoll – für dein Tier, deine Familie und unsere Umwelt.",
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
      <Art
        name="dalmatian"
        alt="Ein aufmerksamer Dalmatiner auf einer sonnigen Wiese"
      />
    </div>
  );
}
