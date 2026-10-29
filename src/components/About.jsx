const About = () => (
  <div className="about-section">
    <h1 className="section-heading about-heading">About Me</h1>
    <div className="about-layout">
      <img
        className="about-photo"
        src={`${import.meta.env.BASE_URL}img/computer-glasses-unsplash.jpg`}
        alt="Glasses resting on a laptop at a desk"
        loading="lazy"
        width="2400"
        height="1600"
      />
      <div className="about-copy">
        <p className="section-intro">
          I’m Alina, an animal scientist with a Ph.D. in Animal Science and
          Husbandry. My background in animal nutrition and feed quality shapes
          the way I approach problems: with curiosity, evidence, and care.
          I also build software, bringing research and technology together to
          make knowledge easier to use.
        </p>
        <a className="section-action" href="mailto:alina.majewska.pinda@gmail.com?subject=Dog%20nutrition%20consultation">Get in Touch <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
);

export default About;
