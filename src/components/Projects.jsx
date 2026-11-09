import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiShoppingBag,
  FiWind,
  FiShield,
  FiHeart,
  FiRefreshCw,
} from "react-icons/fi";
import { GiDogBowl } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { Heading } from "./LandingUI";
const situations = [
  {
    icon: FiWind,
    title: "Du fühlst dich überfordert",
    text: "von den vielen Ernährungstipps.",
  },
  {
    icon: FiShield,
    title: "Du möchtest sicher sein,",
    text: "dass dein Hund alles bekommt, was er braucht.",
  },
  {
    icon: FiHeart,
    title: "Du willst die Gesundheit deines Hundes",
    text: "aktiv unterstützen.",
  },
  {
    icon: FiRefreshCw,
    title: "Du planst eine Futterumstellung",
    text: "(z. B. auf selbstgekocht).",
  },
  {
    icon: FiShoppingBag,
    title: "Dein Hund hat Übergewicht",
    text: "und du suchst einen gesunden Weg zum Wohlfühlgewicht.",
  },
  {
    icon: GiDogBowl,
    title: "Dein Hund frisst schlecht oder ist sehr wählerisch",
    text: "und du suchst passende Lösungen.",
  },
  {
    icon: FaDog,
    title: "Ein neuer Hund zieht ein",
    text: "– und du möchtest von Anfang an die Ernährung richtig gestalten.",
  },
];
export function SituationsCarousel({ items = situations }) {
  const [selected, setSelected] = useState(1);
  const move = (direction) =>
    setSelected(
      (current) => (current + direction + items.length) % items.length,
    );
  const visibleIndices = [-1, 0, 1].map(
    (offset) => (selected + offset + items.length) % items.length,
  );
  return (
    <div
      className="situation-carousel"
      role="group"
      aria-roledescription="Karussell"
      aria-label="Typische Situationen"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
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
          {visibleIndices.map((index, slot) => {
            const { icon: Symbol, title, text } = items[index];
            return (
              <article
                className={`situation-card ${selected === index ? "selected" : ""}`}
                key={title}
                data-slot={slot}
                aria-current={selected === index ? "true" : undefined}
              >
                <Symbol className="card-icon" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
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
        {items.map(({ title }, index) => (
          <button
            type="button"
            key={title}
            aria-label={`Situation ${index + 1}`}
            title={title}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
      <p
        className="carousel-announcement"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Situation {selected + 1} von {items.length}: {items[selected].title}
      </p>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="container">
      <div className="section-intro-row">
        <Heading>
          <span className="underline">Kennst du das?</span>
        </Heading>
        <p>
          Situationen, in denen viele engagierte Hundehalter:innen Unterstützung
          suchen:
        </p>
      </div>
      <SituationsCarousel />
    </div>
  );
}
