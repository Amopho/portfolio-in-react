import React from "react";
import { Routes, Route } from "react-router-dom";

import Portfolio from "../src/projects.json";
import Data from "./data.json";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ProjectsInfo from "./components/ProjectsInfo";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Soon from "./components/Soon";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={() => <Projects data={Portfolio} />} />
        <Route
          path="/projects/:id"
          component={({ match }) => {
            console.log(match);
            return <ProjectsInfo data={Portfolio} id={match.params.id} />;
          }}
        />
        <Route path="/blog" exact component={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path={() => "/main" || "/admin" || "/any-other-word"}>
          <Route path="/" element={<Soon />} />
        </Route>
        <Route path="/" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
