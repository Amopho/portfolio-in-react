import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Menu class="header" />
      <Home />
      <Projects />
      <Footer />
    </Router>
  );
}

export default App;
