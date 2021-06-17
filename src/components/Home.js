import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Data from "../data.json";

const Home = () => {
  const [data, setData] = useState(Data);
  console.log(process.env);
  return (
    <Router>
      <img src={`${process.env.PUBLIC_URL}/${data[0].img}`} alt="Sushi" />
      <h1>Hi, I am Alina!</h1>;
    </Router>
  );
};

export default Home;
