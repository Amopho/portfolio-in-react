import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header>
      <Link class="logo" to="/">
        <li>.my-portfolio</li>
      </Link>
      <nav>
        <div class="menu">
          <ul class="menu-list">
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
      <div class="contact-btn">
        <div class="black-link">
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Menu;
