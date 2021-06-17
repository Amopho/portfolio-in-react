import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FiArrowDownCircle } from "react-icons/fi";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <Router>
    <div class="footer">
      <div class="social-links">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div class="social-links">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div class="social-links">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <div class="social-links">
        <a href="#scroll" class="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
    </div>

      <div class="social-links">
        <ul>
          <li>
            <div class="social">
              <a href="#"
                ><span><i class="fab fa-linkedin"></i></span
              ></a>
            </div>
          </li>
          <li>
            <div class="social">
              <a href="#"
                ><span><i class="fab fa-github-square"></i></span
              ></a>
            </div>
          </li>
          <li>
            <div class="social">
              <a href="#"
                ><span><i class="fab fa-researchgate"></i></span
              ></a>
            </div>
          </li>
          <li>
            <div class="social">
              <a href="#"
                ><span><i class="fab fa-twitter-square"></i></i></span></a>
            </div>
          </li>
        </ul>

      <div>
        <h4>Copyrights ®{year} </h4>
      </div>
    </Router>
  );
};

export default Footer;
