const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
      <div className="sections-container">
        <div className="section-container">
          <div className="hi-img">
            <img
              src={`${import.meta.env.BASE_URL}img/pink-glasses.jpg`}
              alt="Pink glasses"
            />
          </div>
          <div className="section-text">
            <div className="text">
              <p>Dr. Alina Majewska-Pinda</p>
              <br />
              <p>A Ph.D in Animal Science and Husbandry</p>
              <p><a href="mailto:alina.majewska.pinda@gmail.com">alina.majewska.pinda@gmail.com</a></p>
              <br />
              <h1>I would like to hear from you.</h1>
            </div>
            <div className="section-button">
              <a href="mailto:alina.majewska.pinda@gmail.com?subject=Dog%20nutrition%20consultation">Send an inquiry</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
