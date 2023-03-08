import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header>
      <Link className="logo" to="/">
        <li>.my-portfolio</li>
      </Link>
      <nav>
        <div className="menu">
          <ul className="menu-list">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/projects">
              <li>Projects</li>
            </Link>
            <Link to="/blog">
              <li>Blog</li>
            </Link>
          </ul>
        </div>
      </nav>
      <div className="contact-btn">
        <div className="black-link">
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Menu;
