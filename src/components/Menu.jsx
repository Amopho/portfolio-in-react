const Menu = () => {
  return (
    <header className="portfolio-header">
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
              <a href="#values">My Values</a>
            </li>
            <li>
              <a href="#consultation">Consultation</a>
            </li>
            <li>
              <a href="#about">About Me</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="contact-btn">
        <div className="black-link">
          <a href="#about">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Menu;
