import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
    // <Router>
    //
    //   <Menu class="header" />
    //   <Home />
    //   <Projects />
    //   <Footer />
    // </Router>
    <Router>
      <Menu />
      <Switch>
        {
          // <Route path={process.env.PUBLIC_URL + "/"} exact component={Home} />
        }
        <Route path="/" exact component={Home} />
        <Route
          path="/projects"
          exact
          component={() => <Projects data={Portfolio} />}
        />
        <Route
          path="/projects/:id"
          component={({ match }) => {
            console.log(match);
            return <ProjectsInfo data={Portfolio} id={match.params.id} />;
          }}
        />
        <Route path="/blog" exact component={Blog} />
        <Route path="/contact" exact component={Contact} />
        <Route path={() => "/main" || "/admin" || "/any-other-word"}>
          <Soon />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
