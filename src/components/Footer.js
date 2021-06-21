import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaResearchgate } from "react-icons/fa";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <Router>
      <div href="#footer" class="footer">
        <div class="social-links">
          <ul>
            <li>
              <div class="social">
                <a href="https://twitter.com/AdeMoPho">
                  <span>
                    <AiFillTwitterCircle />
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="social">
                <a href="https://github.com/Amopho">
                  <span>
                    <AiFillGithub />
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="social">
                <a href="https://www.linkedin.com/in/alina-majewska-pinda-ph-d-9714a5152/">
                  <span>
                    <AiFillLinkedin />
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="social">
                <a href="https://www.researchgate.net/profile/Alina-Majewska-Pinda">
                  <span>
                    <FaResearchgate />
                  </span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h4>Copyrights ®{year} </h4>
        </div>
      </div>
    </Router>
  );
};

export default Footer;
