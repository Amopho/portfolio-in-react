import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <Link to="/">
        <li>.my-portfolio</li>
      </Link>
      <Link to="">
        <li>Projects</li>
      </Link>
    </nav>
  );
};

export default Menu;
