const Values = () => (
  <div className="values-layout">
    <div className="values-copy">
      <h1>My Values</h1>
      <p>
        Animal wellbeing, scientific curiosity, and care for our planet guide my
        work. I believe better nutrition starts with evidence—and grows through
        sharing knowledge and connecting with people who care.
      </p>
      <button className="values-link" type="button" disabled title="More about my values is coming soon">
        Read More <span aria-hidden="true">→</span>
      </button>
    </div>
    <div className="values-image">
      <img
        src={`${import.meta.env.BASE_URL}img/negative-space-dalmation-dog-woman-blonde-summer-happy-daria-shevtsova-thumb-1.jpg`}
        alt="Woman embracing a Dalmatian against a terracotta wall"
        loading="lazy"
        width="1062"
        height="708"
      />
    </div>
  </div>
);

export default Values;
