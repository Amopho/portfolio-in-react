const Values = () => (
  <div className="values-layout">
    <div className="values-copy">
      <h1>My Values</h1>
      <p>
        Animal wellbeing, scientific curiosity, and care for our planet guide my
        work. I believe better nutrition starts with evidence—and grows through
        sharing knowledge and connecting with people who care.
      </p>
      <a className="values-link" href="#blog">Read More <span aria-hidden="true">→</span></a>
    </div>
    <div className="values-image">
      <img
        src={`${import.meta.env.BASE_URL}img/soil.jpg`}
        alt="Hands gently holding a handful of soil"
        width="3456"
        height="5184"
      />
    </div>
  </div>
);

export default Values;
