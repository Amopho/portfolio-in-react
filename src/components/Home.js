import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Hero from "../../public/img/pink-glasses.jpg";

const Home = () => {
  return (
    <Router>
      <h1>Hi, I am Alina!</h1>
      {/* <img src={Hero} alt="pink glasses" />; */}
    </Router>
  );
};

export default Home;
