import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Img from "../public/img/pink-glasses.jpg";

const Home = () => {
  console.log(process.env);
  return (
    <Router>
      <h1>Hi, I am Alina!</h1>
      <img
        src={process.env.PUBLIC_URL + "/img/pink-glasses.jpg"}
        alt="pink glasses"
      />
      ;
    </Router>
  );
};

export default Home;
