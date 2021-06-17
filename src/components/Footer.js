import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
// import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <Router>
      <div href="#footer" class="footer">
        <div class="social-links">
          <ul>
            <li>
              <div class="social">
                <a href="#">
                  <span>
                    <AiFillTwitterCircle />
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div class="social">
                <a href="#">
                  <span>
                    <AiFillGithub />
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
