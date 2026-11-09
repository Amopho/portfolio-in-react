import { FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { Branch, contactHref } from "./LandingUI";
export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <Branch className="footer-branch" />
      <div className="container">
        <div className="footer-top">
          <a className="footer-logo" href="#home">
            elowen<span>.</span>
          </a>
          <nav aria-label="Footernavigation">
            <a href="#consultation">Angebot</a>
            <a href="#expertise">Wissen</a>
            <a href="#about">Über mich</a>
            <a href="#contact">Kontakt</a>
          </nav>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/dr-alina-majewska-pinda-9714a5152/"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a href={contactHref} aria-label="E-Mail">
              <FiMail />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Elowen. Alle Rechte vorbehalten.</p>
          <div>
            <a href="mailto:alina.majewska.pinda@gmail.com?subject=Datenschutz">
              Datenschutz
            </a>
            <a href="mailto:alina.majewska.pinda@gmail.com?subject=Impressum">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
