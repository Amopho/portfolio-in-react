import Menu from "./components/Menu";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Values from "./components/Values";
import Consultation from "./components/Consultation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Menu />
      <main className="portfolio-content">
        <section id="home" aria-label="Home">
          <Home />
        </section>
        <section id="projects" aria-label="Projects">
          <Projects />
        </section>
        <section id="values" aria-label="My Values">
          <Values />
        </section>
        <section id="consultation" aria-label="Consultation">
          <Consultation />
        </section>
        <section id="contact" aria-label="Contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
