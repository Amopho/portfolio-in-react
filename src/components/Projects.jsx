import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import { GiDogBowl } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { Heading } from "./LandingUI";
const situations = [
  {
    icon: FiShoppingBag,
    title: "Dein Hund hat Übergewicht,",
    text: "und du suchst einen gesunden Weg zum Wohlfühlgewicht.",
  },
  {
    icon: GiDogBowl,
    title: "Dein Hund frisst schlecht,",
    text: "und du fragst dich, wie du die Ernährung wieder attraktiver und ausgewogen gestaltest.",
  },
  {
    icon: FaDog,
    title: "Ein neuer Hund zieht ein,",
    text: "und du möchtest von Anfang an die Ernährung richtig gestalten.",
  },
];
export default function Projects() {
  const [selected, setSelected] = useState(1);
  const move = (direction) =>
    setSelected(
      (current) =>
        (current + direction + situations.length) % situations.length,
    );
  return (
    <div className="container">
      <div className="section-intro-row">
        <Heading>
          <span className="underline">Kennst du das?</span>
        </Heading>
        <p>
          Typische Situationen, in denen Hundehalter:innen Unterstützung suchen:
        </p>
      </div>
      <div className="situations">
        <button
          type="button"
          className="carousel-arrow previous"
          aria-label="Vorherige Situation"
          onClick={() => move(-1)}
        >
          <FiChevronLeft aria-hidden="true" />
        </button>
        <div className="situation-grid">
          {situations.map(({ icon: Symbol, title, text }, index) => (
            <article
              className={`situation-card ${selected === index ? "selected" : ""}`}
              key={title}
              aria-current={selected === index ? "true" : undefined}
            >
              <Symbol className="card-icon" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow next"
          aria-label="Nächste Situation"
          onClick={() => move(1)}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className="carousel-dots" aria-label="Situation auswählen">
        {situations.map(({ title }, index) => (
          <button
            type="button"
            key={title}
            aria-label={`Situation ${index + 1}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}
