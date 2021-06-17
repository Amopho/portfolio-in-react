import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FiArrowDownCircle } from "react-icons/fi";

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
                    <FiArrowDownCircle />
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
