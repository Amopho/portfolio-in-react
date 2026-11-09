import { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Arrow } from "./LandingUI";
const links = [
  ["Start", "home"],
  ["Projekte", "projects"],
  ["Meine Werte", "values"],
  ["Beratung", "consultation"],
  ["Über mich", "about"],
];
export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <header className="portfolio-header">
      <div className="header-inner container">
        <a className="logo" href="#home" aria-label="HOWOOO – Start">
          <FaPaw aria-hidden="true" />
          <span>
            HOWOOO<small>TIERERNÄHRUNG · FORSCHUNG · DIGITALE TOOLS</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Hauptnavigation"
          className={open ? "is-open" : ""}
        >
          <ul className="menu-list">
            {links.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={id === "home" ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="header-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Kontakt <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
