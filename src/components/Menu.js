const Menu = () => {
  return (
    <header>
      <a className="logo" href="#home">
        .my-portfolio
      </a>
      <nav>
        <div className="menu">
          <ul className="menu-list">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="contact-btn">
        <div className="black-link">
          <a href="#contact">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Menu;
