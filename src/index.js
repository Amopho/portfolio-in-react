import React from "react";
import ReactDOM from "react-dom";
// import "./components/icons/lib";
import "./scss/main.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
