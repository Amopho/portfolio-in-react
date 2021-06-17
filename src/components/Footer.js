import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FiArrowDownCircle } from "react-icons/fi";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <Router>
      <div class="go-down">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div class="go-down">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div class="go-down">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div class="go-down">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div>
        <h4>Copyrights ®{year} </h4>
      </div>
    </Router>
  );
};

export default Footer;
