import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header>
      <Link className="logo" to="/">
        .my-portfolio
      </Link>
      <nav>
        <div className="menu">
          <ul className="menu-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="contact-btn">
        <div className="black-link">
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Menu;
