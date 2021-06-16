import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <Link to="/">
        <li>.my-portfolio</li>
      </Link>
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
    </nav>
  );
};

export default Menu;
