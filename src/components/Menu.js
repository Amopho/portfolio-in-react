import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <header>
      <nav>
        <Link class="logo" to="/">
          <li>.my-portfolio</li>
        </Link>
        <div class="menu">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/projects">
            <li>Projects</li>
          </Link>
          <Link to="/blog">
            <li>Blog</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Menu;
