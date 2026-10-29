const Consultation = () => (
  <div className="consultation-banner">
    <img
      className="consultation-photo"
      src={`${import.meta.env.BASE_URL}img/evi-kalemi-dog-nose-macro-unsplash.jpg`}
      alt=""
      loading="lazy"
      width="1920"
      height="1283"
    />
    <div className="consultation-copy">
      <h1 className="section-heading">Consultation</h1>
      <p className="section-intro">
        Nutrition support for dog owners who want to make informed feeding
        choices. Let’s explore your dog’s feeding routine, food options, and
        your nutrition questions together. Get in touch to discuss how I can help.
      </p>
      <a className="section-action section-action--light" href="#contact">
        Request a Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
);

export default Consultation;
