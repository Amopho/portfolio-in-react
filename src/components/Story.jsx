import Stories from "../story.json";

const Story = () => {
  return (
    <section className="story-container" id="scroll" aria-label="Story, Project and Mission">
      {Stories.map((story) => {
        const button = (
          <a href={story.link.href} className="btn btn-primary">
            {story.link.label}
          </a>
        );

        return (
          <div className="card" key={story.id}>
            <img
              className="card-img-top img-fluid"
              src={`${import.meta.env.BASE_URL}${story.img}`}
              alt={story.title}
            />
            <div className="card-body">
              <div className="text card-title h5">
                <h3>{story.heading}</h3>
              </div>
              <div className="card-text">
                <p className="lead">{story.description}</p>
              </div>
              <div className="story-button">{button}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Story;
