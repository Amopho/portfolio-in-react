import { Routes, Route, useParams } from "react-router-dom";

import Portfolio from "../src/projects.json";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ProjectsInfo from "./components/ProjectsInfo";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Soon from "./components/Soon";

function ProjectDetails() {
  const { id } = useParams();
  return <ProjectsInfo data={Portfolio} id={id} />;
}

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects data={Portfolio} />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/soon" element={<Soon />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
