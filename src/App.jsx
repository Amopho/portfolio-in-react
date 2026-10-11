import Menu from "./components/Menu";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
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
        <section id="blog" aria-label="Blog">
          <Blog />
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
