import { FiMonitor, FiFeather } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { Button, Icon } from "./LandingUI";
export default function Home() {
  return (
    <div className="container">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1>
            Gesunde
            <br />
            Ernährung
            <br />
            <em>
              für ein echtes
              <br />
              Hundeleben.
            </em>
          </h1>
          <p className="hero-subtitle">
            Wissenschaftlich fundiert. &nbsp;Praxisnah. &nbsp;Individuell.
          </p>
          <div className="button-row">
            <Button primary calendar />
            <Button href="#process">So arbeite ich</Button>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-photo">
            <img
              src={`${import.meta.env.BASE_URL}img/negative-space-dalmation-dog-woman-blonde-summer-happy-daria-shevtsova-thumb-1.jpg`}
              alt="Eine Frau und ihr Dalmatiner vor einer terrakottafarbenen Wand"
              fetchpriority="high"
              width="1062"
              height="708"
            />
          </div>
        </div>
      </div>
      <div className="hero-features">
        {[
          [FaGraduationCap, "Wissenschaftliche", "Expertise"],
          [FiMonitor, "Praxisnahe", "Lösungen"],
          [FiFeather, "Umweltbewusst", "und nachhaltig"],
        ].map(([icon, line1, line2]) => (
          <div className="feature" key={line1}>
            <Icon icon={icon} />
            <strong>
              {line1}
              <br />
              {line2}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
