import { FiArrowRight, FiCalendar, FiCheck, FiInfo } from "react-icons/fi";
export const contactHref =
  "mailto:alina.majewska.pinda@gmail.com?subject=Ern%C3%A4hrungsberatung%20f%C3%BCr%20meinen%20Hund";
export const Arrow = () => <FiArrowRight aria-hidden="true" />;
export const Branch = ({ className = "" }) => (
  <svg
    className={`branch ${className}`}
    viewBox="0 0 180 240"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M95 230C65 169 92 90 135 23"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      d="M91 151C25 150 12 113 8 85c65-3 80 25 83 66ZM100 116C80 56 119 22 151 7c17 58-2 94-51 109ZM84 199C113 145 147 149 176 155c-15 47-45 65-92 44Z"
      fill="currentColor"
    />
  </svg>
);
export const Icon = ({ icon: Component, className = "" }) => (
  <span className={`icon ${className}`}>
    <Component aria-hidden="true" />
  </span>
);
export const Button = ({
  children = "Beratung anfragen",
  href = "#contact",
  primary = false,
  calendar = false,
  className = "",
}) => (
  <a
    href={href}
    className={`button ${primary ? "button-primary" : "button-outline"} ${className}`}
  >
    {calendar && <FiCalendar aria-hidden="true" />}
    <span>{children}</span>
    <Arrow />
  </a>
);
export const Heading = ({ children, className = "" }) => (
  <h2 className={`section-heading ${className}`}>{children}</h2>
);
export const Check = () => <FiCheck className="check" aria-hidden="true" />;
export const Note = () => (
  <p className="notice">
    <FiInfo aria-hidden="true" />
    <strong>Wichtig zu wissen:</strong>
    <span>
      Ich begleite dich mit fundiertem Wissen, Analysen und individuellen
      Empfehlungen. Eine bestimmte Wirkung oder ein Heilerfolg kann nicht
      garantiert werden.
    </span>
  </p>
);
export const Art = ({ name, alt, className = "" }) => (
  <img
    className={`reference-art ${className}`}
    src={`${import.meta.env.BASE_URL}img/landing/${name}.jpg`}
    alt={alt}
    loading="lazy"
  />
);
