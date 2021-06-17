import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Home = () => {
  console.log(process.env);
  return (
    <Router>
      <h1>Hi, I am Alina!</h1>;
    </Router>
  );
};

export default Home;
