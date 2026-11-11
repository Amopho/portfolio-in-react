import Menu from "./components/Menu";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Values from "./components/Values";
import Consultation from "./components/Consultation";
import Story from "./components/Story";
import About from "./components/About";
import { Benefits } from "./components/Benefits";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="App">
      <a className="skip-link" href="#main">
        Zum Inhalt
      </a>
      <Menu />
      <main id="main" className="portfolio-content">
        <section id="home" aria-label="Start">
          <Home />
        </section>
        <section
          id="projects"
          aria-label="Kennst du das?"
          className="section-space wave-section"
        >
          <Projects />
        </section>
        <section id="values" aria-label="Meine Werte" className="section-space">
          <Values />
        </section>
        <section
          id="benefits"
          aria-label="Dein Mehrwert"
          className="section-space wave-section"
        >
          <Benefits />
        </section>
        <section id="about" aria-label="Über mich" className="section-space">
          <About />
        </section>
        <Story />
        <section
          id="consultation"
          aria-label="Beratungsoptionen"
          className="section-space"
        >
          <Consultation />
        </section>
        <section
          id="contact"
          aria-label="Beratung anfragen"
          className="contact-section"
        >
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
